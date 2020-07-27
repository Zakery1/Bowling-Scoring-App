import React, { Component } from "react";

//styles
import "./App.scss";

//helpers
import frames from "./tools/frames";
import calculateTotalScore from "./tools/calculateTotalScore";
import handleStrikesAndSpares from "./tools/handleStrikesAndSpares";
import updatePreviousTotal from "./tools/updatePreviousTotal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      frames: frames(),
      turnInFrame: 1,
      pinsDown: null,
      frameNumber: 1,
      previousFrameTotal: 0,
      finalFramePoints: 0,
      gameOver: false,
    };
  }

  endGame = () => {
    this.setState({
      gameOver: true
    })
  }

  startNextFrame = () => {
    let newFrameNumber = this.state.frameNumber;
    newFrameNumber++;
    this.setState({ frameNumber: newFrameNumber });
  };

  bowl = (pins) => {
    let pinsDown = +pins;
    // this.setState({pinsDown: null})
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
          newFrame.owedTurns = 2;
          newFrame.extraPoints = 10;
        } else {
          newFrame.topRightScore = "X";
          newFrame.owedTurns = 2;
          newFrame.extraPoints = 10;
          this.startNextFrame();
        }
      } else {
        // add pins down from first turn of frame
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
          //bonus bowl

          newFrame.topRightScore = pinsDown;
          this.setState({
            finalFramePoints: pinsDown,
            turnInFrame: 3,
          });
        }
      }
      let firstTurnPins = newFrame.topLeftScore;
      let frameResult = +pinsDown + +firstTurnPins;
      //check for spare
      if (frameResult === 10) {
        newFrame.topRightScore = "/";
        newFrame.extraPoints = 10;
        newFrame.owedTurns = 1;

        this.setState({
          turnInFrame: 3,
        });
      } else {
        newFrame.topRightScore = pinsDown;

        let newBottomScore = 0;
        if (newFrame.id !== 1) {
          newBottomScore = frameResult + previousFrameTotal;
        } else {
          newBottomScore = frameResult;
        }

        this.setState({
          previousFrameTotal: newBottomScore,
        });

        newFrame.bottomScore = +newBottomScore;
      }

      //close out frame
      if (this.state.frameNumber === 10) {
        this.setState({ turnInFrame: 3 });
      } else {
        this.setState({ turnInFrame: 1 });
        this.startNextFrame();
      }
    } else {
      if (pinsDown === 10) {
        newFrame.finalScore = "X";
      } else {
        newFrame.finalScore = pinsDown;
      }
    }
    if(frameNumber === 10 && newFrame.bottomScore) {
      this.setState({gameOver: true})
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
          <ol>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(0)}>0</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(1)}>1</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(2)}>2</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(3)}>3</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(4)}>4</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(5)}>5</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(6)}>6</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(7)}>7</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(8)}>8</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(9)}>9</button>
            <button disabled={this.state.gameOver} onClick={() => this.bowl(10)}>10</button>
          </ol>
        </div>
        <div className="zg-player-card">
          {frames}
          <div className="zg-total-score">
            total score: <br /> {totalScore}
          </div>
        </div>
        <button disabled={this.state.gameOver} onClick={() => this.endGame()}>END GAME</button>
       {this.state.gameOver?<div>finalScore: {totalScore}</div>: ""} 
      </div>
    );
  }
}

export default App;
