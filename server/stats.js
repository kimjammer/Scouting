import assert from "assert";
//Helper functions
//"mode" means the mode in terms of math and statistics!!!!! The most common bla bla bla...

//Takes a list of objects and a property name and averages the specified property.
const averageProperty = (objects, property) => {
    let sum = 0;

    for (let i=0; i < objects.length; i++){
        assert(typeof objects[i][`${property}`] == 'number');
        sum += objects[i][`${property}`]
    }

    return sum / objects.length;
}

//Gets the key(s) of the object with the greatest value
const getMax = object => {
    return Object.keys(object).filter(x => {
         return object[x] == Math.max.apply(null, 
         Object.values(object));
   });
};

//Takes a list of objects and a property name and finds the most common value(s).
const modeProperty = (objects, property) => {
    let modeCount = {};

    for (let i=0; i < objects.length; i++) {
        let value = objects[i][`${property}`];
        
        //Check if we've seen this value before
        if (!modeCount[`${value}`]) {
            modeCount[`${value}`] = 1;
        }else {
            modeCount[`${value}`] += 1;
        }
    }

    let maxValue = getMax(modeCount);
    return maxValue;
}

//Rounds to two decimal points
const round = (num) => {
    return Number(num.toFixed(2));
}

//This function takes a teamMatch object and returns an object with the stats for that match.
export const oneMatchStats = (teamMatch) => {
    let statistics = {}

    //Scored objects
    statistics.highScore = teamMatch.data.high;
    statistics.middleScore = teamMatch.data.middle;
    statistics.lowScore = teamMatch.data.low;

    //Points
    statistics.totalPoints = teamMatch.data.totalScore;
    statistics.autonPoints = teamMatch.data.autonScore;

    //Calculate Cycle Time
    let totalScore = teamMatch.data.high + teamMatch.data.middle + teamMatch.data.low;
    statistics.cycleTime = round(150 / totalScore); //150 seconds in a match. This results in seconds per object

    //Final Charging Station State
    statistics.finalState = teamMatch.data.finalChargeState;

    //Comments
    statistics.comment = teamMatch.data.comment;

    return statistics;
}

//This function takes all the matches for a specific team and returns an object with the stats for that team.
export const averageTeamStats = (matchList) => {
    const individualStats = [];
    for (let match in matchList) {
        individualStats.push(oneMatchStats(matchList[match]));
    }

    let statistics = {};
    statistics.avgTotalPoints = round(averageProperty(individualStats, "totalPoints"));
    statistics.avgAutonPoints = round(averageProperty(individualStats, "autonPoints"));
    statistics.avgHighScore = round(averageProperty(individualStats, "highScore"));
    statistics.avgMiddleScore = round(averageProperty(individualStats, "middleScore"));
    statistics.avgLowScore = round(averageProperty(individualStats, "lowScore"));
    statistics.avgCycleTime = round(averageProperty(individualStats, "cycleTime"));
    
    statistics.modeFinalState = modeProperty(individualStats, "finalState");

    return statistics;
}