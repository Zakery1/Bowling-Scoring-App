const handleStrikesAndSpares = (pinsDown, frameNumber, frames) => {
  let framesToUpdate = frames.slice();

  for (let i = 0; i < 10; i++) {
    if (framesToUpdate[i].owedTurns > 0) {
      framesToUpdate[i].extraPoints += pinsDown;
      framesToUpdate[i].owedTurns--;
      if (framesToUpdate[i].owedTurns === 0) {
        let prevFrame = { ...framesToUpdate[i - 1] };
        let prevFrameBottomScore = prevFrame.bottomScore;

        let extraPoints = framesToUpdate[i].extraPoints;
        let newBottomScore;
        if (prevFrameBottomScore) {
          newBottomScore = extraPoints + prevFrameBottomScore;
        } else {
          newBottomScore = extraPoints;
        }
        framesToUpdate[i].bottomScore = newBottomScore;
      }
    }
  }
//   console.log("framestoupdate in tool", framesToUpdate)

  return framesToUpdate;
};

export default handleStrikesAndSpares;
