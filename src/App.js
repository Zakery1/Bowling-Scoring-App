import React, { Component } from "react";
import "./App.scss";
import frames from "./tools/emptyFrames";
import calculateTotalScore from './tools/calculateTotalScore';

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerCard: {
        playerName: "",
        playerCreated: false,
      },
      frames: frames,
      turnInFrame: 1,
      pinsDown: null,
      frameNumber: 1,
    };
  }

  startNextFrame = () => {
    console.log(this.state.frameNumber++);
    this.setState({ frameNumber: this.state.frameNumber++ });
  };

  bowl = () => {

    let pinsDown = this.state.pinsDown;
    let frameNumber = this.state.frameNumber;

    

    let currentFrames = this.state.frames.slice();
    let frameToUpdate = currentFrames.filter(
      (frame) => frame.id === this.state.frameNumber
    );
    let newFrame = frameToUpdate[0];
    //first turn
    if (this.state.turnInFrame === 1) {
      //check for strike
      if (pinsDown == 10) {
        newFrame.topRightScore = "X";
        this.startNextFrame();
      } else {
        //or add pins down from first turn of frame
        newFrame.topLeftScore = +pinsDown;
        this.setState({ turnInFrame: 2 });
      }
    } else {
      //second turn
      let firstTurnPins = newFrame.topLeftScore;
      let frameResult = +pinsDown + +firstTurnPins;
      //check for spare
      if (frameResult === 10) {
        newFrame.topRightScore = "/";
        newFrame.extraPoints = 10;
        newFrame.spare = true;
      } else {
        newFrame.topRightScore = pinsDown;
        newFrame.bottomScore = frameResult;
      }

      //close out frame
      this.startNextFrame();
      console.log("frame number", this.state.frameNumber);
      this.setState({ turnInFrame: 1 });
    }
    currentFrames.splice(newFrame.id - 1, 1, newFrame);
    this.setState({
      frames: currentFrames,
    });
  };

  render() {

    const totalScore = calculateTotalScore(this.state.frames);

    const frames = this.state.frames.map((frame) => {
      return (
        <div
          key={frame.id}
          className={
            frame.id === this.state.frameNumber
              ? "zg-frame zg-active"
              : "zg-frame"
          }
        >
          <div className="zg-top-scores">
            <div className="zg-top-left-score">{frame.topLeftScore}</div>
            <div className="zg-top-right-score">{frame.topRightScore}</div>
          </div>
          <div className="zg-bottom-score">{frame.bottomScore}</div>
        </div>
      );
    });

    return (
      <div className="zg-app">
        <div>bowling game</div>
        <div>
          <input
            type="number"
            onChange={(e) => this.setState({ pinsDown: e.target.value })}
          />
        </div>
        <button onClick={() => this.bowl()}>Bowl!</button>
        <div className="zg-player-card">
          <div className="zg-player-name">name</div>
          {frames}
          <div className="zg-total-score">total score: <br/> {totalScore}</div>
        </div>
      </div>
    );
  }
}

export default App;
