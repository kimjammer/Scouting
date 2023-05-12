import assert from "assert";
//Helper functions
//"mode" means the mode in terms of math and statistics!!!!! The most common bla bla bla...

//Takes a list of objects and a property name and averages the specified property.
const averageProperty = (objects, property) => {
    let sum = 0;
    let skipped = 0;

    for (let i=0; i < objects.length; i++){ 
        //If an invalid value is found, skip it and fix the average.
        if (typeof objects[i][`${property}`] != 'number') {
            skipped ++;
            continue;
        }
        sum += objects[i][`${property}`]
    }

    return sum / (objects.length - 0);
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
    let totalScore = (teamMatch.data.high ?? 0) + (teamMatch.data.middle ?? 0) + (teamMatch.data.low ?? 0);
   if (totalScore == 0 ) {
    statistics.cycleTime = "None"; //150 seconds in a match. This results in seconds per object
   }
   else {
    statistics.cycleTime = round(150 / totalScore)
   }
    //Final Charging Station State
    statistics.finalState = teamMatch.data.finalChargeState;

    //Comments
    statistics.comment = teamMatch.data.comment;

    statistics.coneCount = teamMatch.data.coneCount;
    statistics.cubeCount = teamMatch.data.cubeCount;

    statistics.cubeHigh = teamMatch.data.cubeHigh; 
    statistics.cubeMid = teamMatch.data.cubeMid;
    statistics.cubeLow = teamMatch.data.cubeLow;
    statistics.coneHigh = teamMatch.data.coneHigh; 
    statistics.coneMid = teamMatch.data.coneMid;
    statistics.coneLow = teamMatch.data.coneLow;
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
    // statistics.avgCycleTime = round(averageProperty(individualStats, "cycleTime"));
    statistics.avgCycleTime = round(150 / (statistics.avgHighScore + statistics.avgLowScore + statistics.avgMiddleScore));
    
    statistics.modeFinalState = modeProperty(individualStats, "finalState");

    //Compiles all comments into one string.
    statistics.comment = "";
    for (let matchIndex in individualStats) {
        statistics.comment += `${individualStats[matchIndex].comment}\n`;
    }
    statistics.avgConeCount = round(averageProperty(individualStats, "coneCount")) ;
    statistics.avgCubeCount = round(averageProperty(individualStats, "cubeCount")) ;
    statistics.avgConeHigh = round(averageProperty(individualStats , "coneHigh"));
    statistics.avgConeMid = round(averageProperty(individualStats , "coneMid"));
    statistics.avgConeLow = round(averageProperty(individualStats , "coneLow"));
    statistics.avgCubeHigh = round(averageProperty(individualStats , "cubeHigh"));
    statistics.avgCubeMid = round(averageProperty(individualStats , "cubeMid"));
    statistics.avgCubeLow = round(averageProperty(individualStats , "cubeLow"));
    return statistics;
}