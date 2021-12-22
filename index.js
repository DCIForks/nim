/**
 * YOU SHOULD NOT NEED TO MODIFY THE CODE IN THIS SCRIPT.
 *
 * YOU SHOULD WRITE THE CODE FOR THE player FUNCTION IN
 * THE SCRIPT Challenger/player.js.
 *
 * The game of Nim starts with a given array of tokens:
 * 
 *   stateOfPlay = [1, 3, 5, 7]
 * 
 * Players take turns to reduce one of the entries in the
 * stateOfPlay array by one or more, up to the current
 * value of that entry. The player who takes the last
 * token, and so reduces stateOfPlay to [0, 0, 0, 0], is
 * the _loser_.
 * 
 * Your function in Challenger/player.js should return
 * an object with the format...
 * 
 *   { take: X, fromRow: Y }
 * 
 * ... where Y is a number between 0 and 3, which
 * defines the index of the entry in stateOfPlay that
 * you want to change, and X is a value between 1 and
 * the current value of stateOfPlay[Y].
 * 
 * Failure to return an object with valid keys and
 * values will end the game.
 * 
 * TUTORIALS *******************************************
 * You can play an interactive version of the game here:
 * https://withkoji.com/~blackslate/nim
 * 
 * Open the hamburger menu and select the checkboxes in
 * the Use Hints Against The AI section to learn the
 * winning strategy, by playing against the AI.
 * 
 * You can also follow a tutorial on how to build a
 * simple version of this game as a web app:
 * https://blackslate.github.io/nim-tutorial/
 * *****************************************************
 */



// Import player functions from subfolders of this folder
const players = require('./Utilities/get_players')



// You can decide how many games to play
const GAMES_TO_PLAY = 2

// Each game will consist of two rounds, with each player
// starting half of the time;
const ROUNDS_TO_PLAY = GAMES_TO_PLAY * 2

// Customize how much output appears in the Terminal window
const LOG_EACH_RESULT = GAMES_TO_PLAY < 21
const LOG_EACH_GAME = GAMES_TO_PLAY < 12
const LOG_EACH_TURN = GAMES_TO_PLAY < 5


// Set winnerTakesLast to false to play the classic
// "misere" version of Nim. Change this to true for
// the Bonus Challenge.
const winnerTakesLast = false


// DO NOT ALTER THE FOLLOWING LINE:
const INITIAL_SETUP = [ 1, 3, 5, 7 ]



if (players.length > 1) {
  startMatch()
} else {
  console.log("There are not enough players:", players)
}



/**
 * Start the match with the first two players, alphabetically.
 * Unless you add more players, this will be "Challenge" versus
 * "Dr Nim".
 * The match will halt if either player makes an illegal move.
 */
function startMatch() {
  let roundsRemaining = ROUNDS_TO_PLAY
  const wins = {
    [players[0].name]: 0,
    [players[1].name]: 0
  }

  const times = {
    [players[0].name]: 0,
    [players[1].name]: 0
  }

  while(roundsRemaining--) {
    // Alternate starting player
    const currentPlayer = roundsRemaining % 2
    const round = ROUNDS_TO_PLAY - roundsRemaining
    playRound(round, currentPlayer, wins, times)
  }

  console.log("\nWins:              ", wins)
  console.log("Milliseconds taken:", times)
}



/**
 * playRound plays a single round in the match, starting with
 * the player defined as currentPlayer. If an illegal move is
 * played, the app will exit. If not, this function will return
 * the name of the winner of the round.
 * 
 * @param {integer}  round
 *                   Used to console.log the winner of the round
 * @param {integer}  currentPlayer
 *                   0 or 1. Defines which player will start.
 *                   Alternates on every new round.
 * @returns {string} The name of the winner of this game
 */
function playRound(round, currentPlayer, wins, times) {
  // Reset game variables
  const stateOfPlay = [...INITIAL_SETUP]
  const name = players[currentPlayer].name

  if (LOG_EACH_GAME) {
    console.log(`
*******************************
Round ${round} of ${ROUNDS_TO_PLAY}${winnerTakesLast ? `
Rules: Winner takes last` : ""}
Player "${name}" to start.
*******************************
    `)
  }

  while (true) {
    // The `return` statement below will break the loop when
    // stateOfPlay becomes [0, 0, 0, 0], and gameOver is true

    const { name, player } = players[currentPlayer]
    const gameOver = takeTurn(name, player)
    //                 ^^^ updates stateOfPlay in situ

    // Alternate players.
    if (!gameOver || !winnerTakesLast) {
      currentPlayer = 0 + !currentPlayer
    }

    // Check if there is already a winner
    if (gameOver) { // 0 || undefined
      const name = players[currentPlayer].name

      if (LOG_EACH_RESULT) {
        const winner = name === "You"
                              ? "You win"
                              : ( name === "Me" )
                                ? "I win"
                                : `${name} wins`
        console.log(`${winner} round ${round}!`)
      }

      wins[name] += 1
      return // break out of `while` loop and `playRound` function
    }
  }


  function takeTurn(name, player) {
    const ms = + new Date()
    //////////// YOUR player CALLED HERE ////////////
    const move = player(stateOfPlay, winnerTakesLast)
    /////////////////////////////////////////////////
    times[name] += + new Date() - ms

    // If your function returned a value which is...
    // * Not an object
    // * Contains an invalid fromRow value
    // * Contains an invalid take value
    // ... then your infraction will be reported and the game
    // will stop
    const foulPlay = checkForFoulPlay(name, move)

    if (foulPlay) {
      disqualifyPlayer(foulPlay)

    }

    // The game can continue
    const { take, fromRow } = move
    stateOfPlay[fromRow] -= take

    const gameOver = !Math.max(...stateOfPlay) // max is 0
    logGameState(name, move, gameOver)
    
    return gameOver
  }


  function checkForFoulPlay(name, move) {
    if ( typeof move !== "object") {
      return [
        `${name} failed to play a valid move.`
      ]
    }

    const { take, fromRow } = move

    if ( isNaN(take) ) {
      return `${name} did not provide a number of tokens.`
    }
    if ( isNaN(fromRow) ) {
      return `${name} did not provide a row number to take from.`
    }
    if ( fromRow < 0 || fromRow > 3 ) {
      return `${name} provided an invalid row number ${fromRow}.`
    }
    if ( take < 0 ||take > stateOfPlay[fromRow] ) {
      return  `${name} requested an invalid number of tokens from row ${fromRow} (${take}).`
    }

    return false
  }


  function disqualifyPlayer(foul) {
    // Switch players to declare the winner
    currentPlayer = 0 + !currentPlayer
    const winner = players[currentPlayer].name

    // Announce the result
    console.log(`${foul} ${winner} wins by forfeit.\nFIX YOUR CODE.`)

    // Exit the node app here.
    // https://nodejs.org/api/process.html#processexitcode
    process.exit()
  }


  function logGameState(name, { take, fromRow }, gameOver) {
    if (LOG_EACH_TURN) {
      const player = name === "Me"
                   ? "I"
                   : name
      const tokens = take === 1
                   ? gameOver ? "the last token"  : "1 token"
                   : gameOver ? "the last tokens" : `${take} tokens`
      console.log(`\n${player} took ${tokens} from row ${fromRow}:`)

      const layout = stateOfPlay.map(( tokens, row ) => {
        const taken = "· ".repeat(INITIAL_SETUP[row] - tokens)
        return "  ".repeat(3 - row) + "🪙 ".repeat(tokens) + taken
      }).join("\n")
      
      console.log(layout)
    }
  }
}