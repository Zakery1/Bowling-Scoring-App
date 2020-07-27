const calculateTotalScore = (frames) => {
    let total = 0;
    for(let i = 0; i < frames.length; i++) {
        total += frames[i].bottomScore;
    }
    return total;
}

export default calculateTotalScore;