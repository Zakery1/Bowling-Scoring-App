import React, { Component } from "react";
import "./App.scss";
import frames from "./tools/emptyFrames";
import calculateTotalScore from "./tools/calculateTotalScore";
import handleStrikesAndSpares from "./tools/handleStrikesAndSpares";
import updatePreviousTotal from "./tools/updatePreviousTotal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerCard: {
        playerName: "",
        playerCreated: false,
      },
      frames: frames(),
      turnInFrame: 1,
      pinsDown: null,
      frameNumber: 1,
      previousFrameTotal: 0,
      finalFramePoints: 0,
    };
  }

  startNextFrame = () => {
    let newFrameNumber = this.state.frameNumber;
    newFrameNumber++;
    this.setState({ frameNumber: newFrameNumber });
  };

  bowl = () => {
    let pinsDown = +this.state.pinsDown;
    let frameNumber = this.state.frameNumber;
    let previousFrameTotal = this.state.previousFrameTotal;
    let currentFrames = this.state.frames.slice();

    handleStrikesAndSpares(pinsDown, frameNumber, currentFrames);

    previousFrameTotal = updatePreviousTotal(currentFrames, frameNumber);

    let frameToUpdate = currentFrames.filter(
      (frame) => frame.id === this.state.frameNumber
    );

    let newFrame = frameToUpdate[0];
    //first turn
    if (this.state.turnInFrame === 1) {
      //check for strike
      if (pinsDown === 10) {
        if (newFrame.id === 10) {
          newFrame.topLeftScore = "X";
          this.setState({
            finalFramePoints: 10,
            turnInFrame: 2,
          });
          // console.log("hello");
          // this.startNextFrame();
          newFrame.owedTurns = 2;
          newFrame.extraPoints = 10;
        } else {
          newFrame.topRightScore = "X";
          newFrame.owedTurns = 2;
          newFrame.extraPoints = 10;
          this.startNextFrame();
        }
      } else {
        //or add pins down from first turn of frame
        newFrame.topLeftScore = +pinsDown;
        this.setState({ turnInFrame: 2 });
      }
    } else if (this.state.turnInFrame === 2) {
      //second turn
      if (newFrame.id === 10) {
        if (pinsDown === 10) {
          newFrame.topRightScore = "X";
          this.setState({
            finalFramePoints: 10,
            turnInFrame: 3,
          });
          return;
        } else {
          newFrame.topRightScore = pinsDown;
        }
      }
      let firstTurnPins = newFrame.topLeftScore;
      let frameResult = +pinsDown + +firstTurnPins;
      //check for spare
      if (frameResult === 10) {
        newFrame.topRightScore = "/";
        newFrame.extraPoints = 10;
        newFrame.owedTurns = 1;
        this.startNextFrame();
      } else {
        newFrame.topRightScore = pinsDown;

        let newBottomScore = 0;
        if (newFrame.id !== 1) {
          newBottomScore = frameResult + previousFrameTotal;
        } else {
          newBottomScore = frameResult;
        }

        // console.log("previous frame total", previousFrameTotal);
        this.setState({
          previousFrameTotal: newBottomScore,
        });

        newFrame.bottomScore = +newBottomScore;
      }

      //close out frame
      this.startNextFrame();
      this.setState({ turnInFrame: 1 });
    } else {
      if (pinsDown === 10) {
        newFrame.finalScore = "X";
      }
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
            {frame.id !== 10 ? (
              <div className="zg-top-right-score">{frame.topRightScore}</div>
            ) : (
              <div className="zg-frame-last">
                <div className="zg-last-top-right-score">
                  {frame.topRightScore}
                </div>
                <div className="zg-final-score">{frame.finalScore}</div>
              </div>
            )}
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
          <div className="zg-total-score">
            total score: <br /> {totalScore}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
