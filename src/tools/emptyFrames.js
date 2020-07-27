const emptyFrames = () => {
  let frameArray = [];
  for (let i = 1; i <= 10; i++) {
    let myObject = {
      id: i,
      topLeftScore: null,
      topRightScore: null,
      bottomScore: null,
      extraPoints: 0,
      owedTurns: 0,
    };
    frameArray.push(myObject);
  }
  return frameArray;
};

export default emptyFrames;
