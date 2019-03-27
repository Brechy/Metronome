import click1 from './click1.wav';
import click2 from './click2.wav';
import React, {Component} from 'react';
import './Metronome.css';

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        };
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    startStop = () => {
        if(this.state.playing) {
            //stop the timer
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            //start timer with the current bpm
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState({
                count: 0,
                playing: true
            }, this.playClick);
        }
    }

    playClick = () => {
        const {count, beatsPerMeasure} = this.state;

        //this first beat sound is different from the others
        if(count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    };

    handleBpmChange = event => {
        const bpm = event.target.value;
        this.setState({bpm});
    }

    render() {
        const {playing, bpm} = this.state;

        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input 
                    type="range" 
                    min="60" 
                    max="240" 
                    value={bpm}
                    onChange={this.handleBpmChange} />
                </div>
                <button onClick={this.startStop}>
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        )
    }
}

export default Metronome;