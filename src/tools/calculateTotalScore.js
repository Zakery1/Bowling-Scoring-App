const calculateTotalScore = (frames) => {
  let total = 0;
  for (let i = 0; i < frames.length; i++) {
    if (frames[i].bottomScore > total) {
      total = frames[i].bottomScore;
    }
  }
  return total;
};

export default calculateTotalScore;
