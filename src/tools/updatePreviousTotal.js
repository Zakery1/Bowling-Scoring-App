const updatePreviousTotal = (frames, frameNumber) => {
  let newPreviousTotalObject = { ...frames[frameNumber - 2] };
  let newPreviousTotal = newPreviousTotalObject.bottomScore;
  return newPreviousTotal;
};

export default updatePreviousTotal;
