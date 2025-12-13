function roundNumbers(population) {
    const roundMillions = Math.round(population / 1000000);

    return roundMillions;
}

export default roundNumbers;