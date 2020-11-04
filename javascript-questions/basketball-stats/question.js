/**
 * Requirements
 * 1. There are 4 functions to fill in.
 * 2. Some functions will use other functions to complete their answers.
 * 3. Avoid using for, forEach, for...in or for...of.
 * 4. Do not mutate objects that are being passed to functions.
 * 6. Run the file using `node question.js` in your terminal and you will see the output.
 */

/**
 * Returns all the points a team had in the game.
 *
 * @param pointsPerQuarter {Array<number>} - An array of numbers that represent all the points a team had in the game.
 * @returns {number} - Sum of all points that a team had in the game.
 */
const totalScore = (pointsPerQuarter) => {
  return pointsPerQuarter.reduce((total, points) => total + points );
};

const raptorsScore = totalScore([26, 21, 25, 21]);
console.log('Total Score', raptorsScore);

/**
 * Calculates and returns the average points of all players' points.
 *
 * @param players {Object<string, Object<points, number>>}
 * @returns {number} - Average points per starting player
 */
const getAveragePoints = (players) => {
  const pointsPerPlayer = Object.values(players).map(pointsScored => {
    return pointsScored.points;
  });

  return totalScore(pointsPerPlayer)/pointsPerPlayer.length;
};

const startingPlayers = {
  ibaka: {
    points: 12,
  },
  miles: {
    points: 13,
  },
  anunoby: {
    points: 2,
  },
  lowry: {
    points: 5,
  },
  derozen: {
    points: 13,
  },
};

const averageScore = getAveragePoints(startingPlayers);
console.log('Scoring Average', averageScore);

/**
 * Returns a new players object that excludes starting players who scored less than the the average.
 * - Return value of the function should be in the same format as the `players` parameter of the function.
 * - Make use of `startingPlayers` and `averageScore` that were created in the question #2.
 *
 * @param players {Object<string, Object<points, number>>}
 * @param average {number}
 * @returns {Object<string, Object<points, number>>}
 */
const getHighestScorers = (players, average) => {
  const newPlayers = {};

  Object.entries(players).forEach( player => {
    const[name, pointsObject] = player;
    if (pointsObject.points > average-1) {
      newPlayers[name] = pointsObject;
    }
  } );

  return newPlayers;
};

const highestScoringPlayers = getHighestScorers(startingPlayers, averageScore);
console.log('Highest Scoring Players', highestScoringPlayers);

/**
 * Returns a new players object where each player object has a new field `perQuarter` whose value represents each player's time played in each quarter.
 * - `time` field in each player's object represent the total time they played in the game.
 * - assuming every player played all quarters, add a `perQuarter` field to each player's object.
 *
 * @param timePlayedArr {Array<{ name: string, time: number }>}
 * @returns {Array<{ name: string, time: number, perQuarter: number }>}
 */
const addTimePlayedPerQuarter = (timePlayedArr) => {
  return timePlayedArr.map( timePlayed => {
    timePlayed.perQuarter = timePlayed.time/4;
    return timePlayed;
  });
};

const timePlayed = [
  {
    name: 'ibaka',
    time: 18,
  },
  {
    name: 'miles',
    time: 23,
  },
  {
    name: 'anunoby',
    time: 20,
  },
  {
    name: 'lowry',
    time: 30,
  },
  {
    name: 'derozen',
    time: 30,
  },
];

const timePerQuarter = addTimePlayedPerQuarter(timePlayed);
console.log('Players with time per quarter', timePerQuarter);
