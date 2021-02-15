export const WathanRPMFormula = (weight, reps) => { 
    return ((100*parseInt(weight))/(48.8+53.8*(Math.pow(2.71828, (-0.075*parseInt(reps)))))).toFixed(2);
}