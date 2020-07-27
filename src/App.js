import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      playerCard: {
        playerName: "",
        playerCreated: false,
      },
      frames: Array(10).fill({ topRightScore: null, topLeftScore: null, bottomScore: null }),
    };
  }

  // handleClick(i) {
  //   const history = this.state.history.slice(0, this.state.stepNumber+1)
  //   const current = history[history.length - 1];
  //   const squares = current.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     history: history.concat([{
  //       squares: squares
  //     }]),
  //     xIsNext: !this.state.xIsNext,
  //     stepNumber: history.length,
  //   });
  // }

  addToState = () => {
    const currentFrames = this.state.frames.slice();
    this.setState({
      frames: currentFrames.concat([
        {
          topRightScore: 2,
          topLeftScore: 3,
          bottomScore: 1
        },
      ]),
    });
  };

  render() {
    const frames = this.state.frames.map((x) => {
      return <div>{x.topRightScore}</div>;
    });

    return (
      <div className="zg-app">
        <div>bowling game</div>
        <button onClick={this.addToState}>add</button>

        <div>frames: {frames}</div>

        <div className="zg-player-card">
          <div className="zg-player-name">name</div>

          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-frame">
            <div className="zg-top-scores">
              <div className="zg-top-left-score"></div>
              <div className="zg-top-right-score"></div>
            </div>
            <div className="zg-bottom-score"></div>
          </div>
          <div className="zg-total-score">total score</div>
        </div>
      </div>
    );
  }
}

export default App;
