//This function takes a teamMatch object and returns an object with the stats for that match.
export const oneMatchStats = (teamMatch) => {
    let statistics = {}

    statistics.highScore = teamMatch.data.high;
    statistics.middleScore = teamMatch.data.middle;
    statistics.lowScore = teamMatch.data.low;

    //Calculate Cycle Time
    let totalScore = teamMatch.data.high + teamMatch.data.middle + teamMatch.data.low;
    statistics.cycleTime = totalScore / 150; //150 seconds in a match

    //Final Charging Station State
    let allChargingEvents = [...teamMatch.data.nothing, ...teamMatch.data.docked, ...teamMatch.data.engaged];
    let lastEvent = "";
    let lastTime = 150;
    for (let num in allChargingEvents) {
        if (allChargingEvents[num].time < lastTime) {
            lastTime = allChargingEvents[num].time;
            lastEvent = allChargingEvents[num].eventName;
        }
    }
    statistics.finalState = lastEvent;

    //Comments
    statistics.comment = teamMatch.data.comment;

    return statistics;
}

//This function takes all the matches for a specific team and returns an object with the stats for that team.
export const averageTeamStats = (matchList) => {

}