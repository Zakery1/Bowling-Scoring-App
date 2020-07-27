import React, { Component } from "react";

//libraries
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

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
      gameOver: true,
    });
  };

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
    if (frameNumber === 10 && newFrame.bottomScore) {
      this.setState({ gameOver: true });
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
        <Card
          key={frame.id}
          className={
            frame.id === this.state.frameNumber
              ? "zg-frame zg-active"
              : "zg-frame"
          }
        >
          <div className="zg-top-scores">
            <div className="zg-top-left-score">
              <br />
              {frame.topLeftScore}
            </div>
            {frame.id !== 10 ? (
              <div className="zg-top-right-score">
                <br />
                {frame.topRightScore}
              </div>
            ) : (
              <Card className="zg-frame-last">
                <div className="zg-last-top-right-score">
                  {frame.topRightScore}
                </div>
                <div className="zg-final-score">
                  <br />
                  <div>{frame.finalScore}</div>
                  
                </div>
              </Card>
            )}
          </div>
          <div className="zg-bottom-score">
            <br />
            {frame.bottomScore}
          </div>
        </Card>
      );
    });

    return (
      <div className="zg-app">
        <Card style={{height: "50px", margin: "20px", paddingBottom: "20px", fontSize: "50px", color: "rgb(40, 40, 113)"}}>Let's Bowl!</Card>
        <div>
          <ol>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(0)}
            >
              0
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(1)}
            >
              1
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(2)}
            >
              2
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(3)}
            >
              3
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(4)}
            >
              4
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(5)}
            >
              5
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(6)}
            >
              6
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(7)}
            >
              7
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(8)}
            >
              8
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(9)}
            >
              9
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={this.state.gameOver}
              onClick={() => this.bowl(10)}
            >
              10
            </Button>
          </ol>
        </div>
        <div className="zg-player-card">
          {frames}
          <Card className="zg-total-score">
            Total Score: <br /> <br />
            {totalScore}
          </Card>
        </div>
        <br />
        <Button
          variant="outlined"
          color="primary"
          disabled={this.state.gameOver}
          onClick={() => this.endGame()}
        >
          END GAME
        </Button>
        <br />
        {this.state.gameOver ? (
          <Card style={{fontSize: "30px", color: "rgb(40, 40, 113)"}}>
            <br />
            Final Score:
            <br /> 
            {totalScore}
          </Card>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
