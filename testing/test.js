const player = require('../Challenger/player')


const USE_MISERE_RULES = true


// <<<< Stop the test if the player function is invalid
if (typeof player !== "function") {
  process.exit("Your script does not provide a function.")
}

const testResult = player([0, 0, 0, 1])
if (typeof testResult !== "object") {
  process.exit("Your function does not return an object.")
}

if (isNaN(testResult.take) || isNaN(testResult.fromRow)) {
  process.exit("Your function does not return an object with the expected format: { take: <integer>, fromRow: <integer> }")
}
// >>>>


function isLegalMove(currentState, move) {
  const { take, fromRow } = move
  if ( isNaN(take) ) { return false }
  if ( isNaN(fromRow) ) { return false }
  if ( fromRow > currentState.length ) { return false }
  if ( fromRow < 0 ) { return false }
  if ( take < 1 ) { return false }
  if ( take > currentState[fromRow] ) { return false }

  return true
}


describe("test positions with unique move", () => {
  test.each`
    input  | expected
    ${[0, 0, 0, 1]} | ${{ take: 1, fromRow: 3 }} // forced

    ${[0, 0, 2, 3]} | ${{ take: 1, fromRow: 3 }}
    ${[0, 0, 2, 4]} | ${{ take: 2, fromRow: 3 }}
    ${[0, 0, 2, 5]} | ${{ take: 3, fromRow: 3 }}
    ${[0, 0, 2, 6]} | ${{ take: 4, fromRow: 3 }}
    ${[0, 0, 2, 7]} | ${{ take: 5, fromRow: 3 }}

    ${[0, 0, 3, 4]} | ${{ take: 1, fromRow: 3 }}
    ${[0, 0, 3, 5]} | ${{ take: 2, fromRow: 3 }}
    ${[0, 0, 3, 6]} | ${{ take: 3, fromRow: 3 }}
    ${[0, 0, 3, 7]} | ${{ take: 4, fromRow: 3 }}

    ${[0, 0, 4, 5]} | ${{ take: 1, fromRow: 3 }}
    ${[0, 0, 4, 6]} | ${{ take: 2, fromRow: 3 }}
    ${[0, 0, 4, 7]} | ${{ take: 3, fromRow: 3 }}

    ${[0, 0, 5, 6]} | ${{ take: 1, fromRow: 3 }}
    ${[0, 0, 5, 7]} | ${{ take: 2, fromRow: 3 }}

    ${[0, 1, 2, 2]} | ${{ take: 1, fromRow: 1 }}
    ${[0, 1, 2, 4]} | ${{ take: 1, fromRow: 3 }}
    ${[0, 1, 2, 5]} | ${{ take: 2, fromRow: 3 }}
    ${[0, 1, 2, 6]} | ${{ take: 3, fromRow: 3 }}
    ${[0, 1, 2, 7]} | ${{ take: 4, fromRow: 3 }}

    ${[0, 1, 3, 3]} | ${{ take: 1, fromRow: 1 }}
    ${[0, 1, 3, 4]} | ${{ take: 2, fromRow: 3 }}
    ${[0, 1, 3, 5]} | ${{ take: 3, fromRow: 3 }}
    ${[0, 1, 3, 6]} | ${{ take: 4, fromRow: 3 }}
    ${[0, 1, 3, 7]} | ${{ take: 5, fromRow: 3 }}

    ${[0, 1, 4, 4]} | ${{ take: 1, fromRow: 1 }}
    ${[0, 1, 4, 6]} | ${{ take: 1, fromRow: 3 }}
    ${[0, 1, 4, 7]} | ${{ take: 2, fromRow: 3 }}

    ${[0, 1, 5, 5]} | ${{ take: 1, fromRow: 1 }}
    ${[0, 1, 5, 6]} | ${{ take: 2, fromRow: 3 }}
    ${[0, 1, 5, 7]} | ${{ take: 3, fromRow: 3 }}

    ${[0, 2, 2, 2]} | ${{ take: 2, fromRow: 1 }}
    ${[0, 2, 2, 4]} | ${{ take: 4, fromRow: 3 }}
    ${[0, 2, 2, 5]} | ${{ take: 5, fromRow: 3 }}
    ${[0, 2, 2, 6]} | ${{ take: 6, fromRow: 3 }}
    ${[0, 2, 2, 7]} | ${{ take: 7, fromRow: 3 }}

    ${[0, 2, 3, 4]} | ${{ take: 3, fromRow: 3 }}
    ${[0, 2, 3, 5]} | ${{ take: 4, fromRow: 3 }}
    ${[0, 2, 3, 6]} | ${{ take: 5, fromRow: 3 }}
    ${[0, 2, 3, 7]} | ${{ take: 6, fromRow: 3 }}

    ${[0, 2, 4, 4]} | ${{ take: 2, fromRow: 1 }}
    ${[0, 2, 4, 5]} | ${{ take: 1, fromRow: 1 }}
    ${[0, 2, 4, 7]} | ${{ take: 1, fromRow: 3 }}

    ${[0, 2, 5, 5]} | ${{ take: 2, fromRow: 1 }}
    ${[0, 2, 5, 6]} | ${{ take: 1, fromRow: 2 }}

    ${[0, 3, 3, 3]} | ${{ take: 3, fromRow: 1 }}
    ${[0, 3, 3, 4]} | ${{ take: 4, fromRow: 3 }}
    ${[0, 3, 3, 5]} | ${{ take: 5, fromRow: 3 }}
    ${[0, 3, 3, 6]} | ${{ take: 6, fromRow: 3 }}
    ${[0, 3, 3, 7]} | ${{ take: 7, fromRow: 3 }}

    ${[0, 3, 4, 4]} | ${{ take: 3, fromRow: 1 }}
    ${[0, 3, 4, 5]} | ${{ take: 2, fromRow: 1 }}
    ${[0, 3, 4, 6]} | ${{ take: 1, fromRow: 1 }}

    ${[0, 3, 5, 5]} | ${{ take: 3, fromRow: 1 }}

    ${[1, 1, 2, 3]} | ${{ take: 1, fromRow: 0 }}
    ${[1, 1, 2, 4]} | ${{ take: 2, fromRow: 3 }}
    ${[1, 1, 2, 5]} | ${{ take: 3, fromRow: 3 }}
    ${[1, 1, 2, 6]} | ${{ take: 4, fromRow: 3 }}
    ${[1, 1, 2, 7]} | ${{ take: 5, fromRow: 3 }}

    ${[1, 1, 3, 4]} | ${{ take: 1, fromRow: 3 }}
    ${[1, 1, 3, 5]} | ${{ take: 2, fromRow: 3 }}
    ${[1, 1, 3, 6]} | ${{ take: 3, fromRow: 3 }}
    ${[1, 1, 3, 7]} | ${{ take: 4, fromRow: 3 }}

    ${[1, 1, 4, 6]} | ${{ take: 2, fromRow: 3 }}
    ${[1, 1, 4, 7]} | ${{ take: 3, fromRow: 3 }}

    ${[1, 1, 5, 6]} | ${{ take: 1, fromRow: 3 }}
    ${[1, 1, 5, 7]} | ${{ take: 2, fromRow: 3 }}

    ${[1, 2, 2, 2]} | ${{ take: 1, fromRow: 1 }}
    ${[1, 2, 2, 4]} | ${{ take: 3, fromRow: 3 }}
    ${[1, 2, 2, 5]} | ${{ take: 4, fromRow: 3 }}
    ${[1, 2, 2, 6]} | ${{ take: 5, fromRow: 3 }}
    ${[1, 2, 2, 7]} | ${{ take: 6, fromRow: 3 }}

    ${[1, 2, 3, 4]} | ${{ take: 4, fromRow: 3 }}
    ${[1, 2, 3, 5]} | ${{ take: 5, fromRow: 3 }}
    ${[1, 2, 3, 6]} | ${{ take: 6, fromRow: 3 }}
    ${[1, 2, 3, 7]} | ${{ take: 7, fromRow: 3 }}

    ${[1, 2, 4, 4]} | ${{ take: 1, fromRow: 1 }}
    ${[1, 2, 4, 5]} | ${{ take: 2, fromRow: 1 }}
    ${[1, 2, 4, 6]} | ${{ take: 1, fromRow: 0 }}
    ${[1, 2, 5, 5]} | ${{ take: 1, fromRow: 1 }}

    ${[1, 3, 3, 3]} | ${{ take: 2, fromRow: 1 }}
    ${[1, 3, 3, 4]} | ${{ take: 3, fromRow: 3 }}
    ${[1, 3, 3, 5]} | ${{ take: 4, fromRow: 3 }}
    ${[1, 3, 3, 6]} | ${{ take: 5, fromRow: 3 }}
    ${[1, 3, 3, 7]} | ${{ take: 6, fromRow: 3 }}

    ${[1, 3, 4, 4]} | ${{ take: 2, fromRow: 1 }}
    ${[1, 3, 4, 5]} | ${{ take: 3, fromRow: 1 }}

    ${[1, 3, 5, 5]} | ${{ take: 2, fromRow: 1 }}
  `("accepts $input and returns $expected", ({ input, expected }) => {
    expect(player(input)).toStrictEqual(expected)
  })
})


if (USE_MISERE_RULES) {

  describe("test end positions for misere", () => {
    test.each`
      input  | expected
      ${[0, 0, 0, 2]} | ${{ take: 1, fromRow: 3 }}
      ${[0, 0, 0, 3]} | ${{ take: 2, fromRow: 3 }}
      ${[0, 0, 0, 4]} | ${{ take: 3, fromRow: 3 }}
      ${[0, 0, 0, 5]} | ${{ take: 4, fromRow: 3 }}
      ${[0, 0, 0, 6]} | ${{ take: 5, fromRow: 3 }}
      ${[0, 0, 0, 7]} | ${{ take: 6, fromRow: 3 }}

      ${[0, 0, 1, 2]} | ${{ take: 2, fromRow: 3 }}
      ${[0, 0, 1, 3]} | ${{ take: 3, fromRow: 3 }}
      ${[0, 0, 1, 4]} | ${{ take: 4, fromRow: 3 }}
      ${[0, 0, 1, 5]} | ${{ take: 5, fromRow: 3 }}
      ${[0, 0, 1, 6]} | ${{ take: 6, fromRow: 3 }}
      ${[0, 0, 1, 7]} | ${{ take: 7, fromRow: 3 }}

      ${[0, 1, 1, 2]} | ${{ take: 1, fromRow: 3 }}
      ${[0, 1, 1, 3]} | ${{ take: 2, fromRow: 3 }}
      ${[0, 1, 1, 4]} | ${{ take: 3, fromRow: 3 }}
      ${[0, 1, 1, 5]} | ${{ take: 4, fromRow: 3 }}
      ${[0, 1, 1, 6]} | ${{ take: 5, fromRow: 3 }}
      ${[0, 1, 1, 7]} | ${{ take: 6, fromRow: 3 }}

      ${[1, 1, 1, 2]} | ${{ take: 2, fromRow: 3 }}
      ${[1, 1, 1, 3]} | ${{ take: 3, fromRow: 3 }}
      ${[1, 1, 1, 4]} | ${{ take: 4, fromRow: 3 }}
      ${[1, 1, 1, 5]} | ${{ take: 5, fromRow: 3 }}
      ${[1, 1, 1, 6]} | ${{ take: 6, fromRow: 3 }}
      ${[1, 1, 1, 7]} | ${{ take: 7, fromRow: 3 }}
    `("accepts $input and returns $expected", ({ input, expected }) => {
      expect(player(input)).toStrictEqual(expected)
    })
  })

} else {

  describe("test end positions for winner-takes last", () => {
    test.each`
      input  | expected
      ${[0, 0, 0, 2]} | ${{ take: 2, fromRow: 3 }}
      ${[0, 0, 0, 3]} | ${{ take: 3, fromRow: 3 }}
      ${[0, 0, 0, 4]} | ${{ take: 4, fromRow: 3 }}
      ${[0, 0, 0, 5]} | ${{ take: 5, fromRow: 3 }}
      ${[0, 0, 0, 6]} | ${{ take: 6, fromRow: 3 }}
      ${[0, 0, 0, 7]} | ${{ take: 7, fromRow: 3 }}

      ${[0, 0, 1, 2]} | ${{ take: 1, fromRow: 3 }}
      ${[0, 0, 1, 3]} | ${{ take: 2, fromRow: 3 }}
      ${[0, 0, 1, 4]} | ${{ take: 3, fromRow: 3 }}
      ${[0, 0, 1, 5]} | ${{ take: 4, fromRow: 3 }}
      ${[0, 0, 1, 6]} | ${{ take: 5, fromRow: 3 }}
      ${[0, 0, 1, 7]} | ${{ take: 6, fromRow: 3 }}

      ${[0, 1, 1, 2]} | ${{ take: 2, fromRow: 3 }}
      ${[0, 1, 1, 3]} | ${{ take: 3, fromRow: 3 }}
      ${[0, 1, 1, 4]} | ${{ take: 4, fromRow: 3 }}
      ${[0, 1, 1, 5]} | ${{ take: 5, fromRow: 3 }}
      ${[0, 1, 1, 6]} | ${{ take: 6, fromRow: 3 }}
      ${[0, 1, 1, 7]} | ${{ take: 7, fromRow: 3 }}

      ${[1, 1, 1, 2]} | ${{ take: 1, fromRow: 3 }}
      ${[1, 1, 1, 3]} | ${{ take: 2, fromRow: 3 }}
      ${[1, 1, 1, 4]} | ${{ take: 3, fromRow: 3 }}
      ${[1, 1, 1, 5]} | ${{ take: 4, fromRow: 3 }}
      ${[1, 1, 1, 6]} | ${{ take: 5, fromRow: 3 }}
      ${[1, 1, 1, 7]} | ${{ take: 6, fromRow: 3 }}
    `("accepts $input and returns $expected", ({ input, expected }) => {
      expect(player(input, true)).toStrictEqual(expected)
    })
  })

}



describe("test losing positions: any legal move is correct", () => {
  test.each`
    input  | expected 
    ${[0, 0, 2, 2]} | ${0}
    ${[0, 0, 3, 3]} | ${0}
    ${[0, 0, 4, 4]} | ${0}
    ${[0, 0, 5, 5]} | ${0}
    ${[0, 1, 2, 3]} | ${0}
    ${[0, 1, 4, 5]} | ${0}
    ${[0, 2, 4, 6]} | ${0}
    ${[0, 2, 5, 7]} | ${0}
    ${[0, 3, 4, 7]} | ${0}
    ${[0, 3, 5, 6]} | ${0}
    ${[1, 1, 2, 2]} | ${0}
    ${[1, 1, 3, 3]} | ${0}
    ${[1, 1, 4, 4]} | ${0}
    ${[1, 1, 5, 5]} | ${0}
    ${[1, 2, 4, 7]} | ${0}
    ${[1, 2, 5, 6]} | ${0}
    ${[1, 3, 4, 6]} | ${0}
    ${[1, 3, 5, 7]} | ${0}
  `("accepts $input and returns $expected", ({ input, expected }) => {
    const move = player(input)
    expect(isLegalMove(input, move)).toBe(true)
  })
})



describe("test positions with multiple solutions", () => {
  test.each`
    input  | expected 
    ${[0, 0, 1, 1]} | ${[{ take: 1, fromRow: 2 },
                         { take: 1, fromRow: 3 }]}
    ${[0, 1, 1, 1]} | ${[{ take: 1, fromRow: 1 },
                         { take: 1, fromRow: 2 },
                         { take: 1, fromRow: 3 }]}
    ${[0, 2, 2, 3]} | ${[{ take: 1, fromRow: 1 },
                         { take: 3, fromRow: 3 }]}
    ${[0, 2, 3, 3]} | ${[{ take: 2, fromRow: 1 },
                         { take: 2, fromRow: 2 },
                         { take: 2, fromRow: 3 }]}
    ${[0, 3, 5, 7]} | ${[{ take: 1, fromRow: 1 },
                         { take: 1, fromRow: 2 },
                         { take: 1, fromRow: 3 }]}
    ${[1, 1, 1, 1]} | ${[{ take: 1, fromRow: 0 },
                         { take: 1, fromRow: 1 },
                         { take: 1, fromRow: 2 },
                         { take: 1, fromRow: 3 }]}
    ${[1, 1, 4, 5]} | ${[{ take: 1, fromRow: 0 },
                         { take: 1, fromRow: 1 },
                         { take: 1, fromRow: 3 }]}
    ${[1, 2, 2, 3]} | ${[{ take: 2, fromRow: 1 },
                         { take: 2, fromRow: 2 }]}
    ${[1, 2, 5, 7]} | ${[{ take: 1, fromRow: 0 },
                         { take: 1, fromRow: 2 },
                         { take: 1, fromRow: 3 }]}
    ${[1, 3, 4, 7]} | ${[{ take: 1, fromRow: 0 },
                         { take: 1, fromRow: 1 },
                         { take: 1, fromRow: 3 }]}
    ${[1, 3, 5, 6]} | ${[{ take: 1, fromRow: 0 },
                         { take: 1, fromRow: 1 },
                         { take: 1, fromRow: 2 }]}
  `("accepts $input and returns one of the expected solutions", ({ input, expected }) => {
    const output = player(input)

    if (input[0] === 1 && input[1] === 2 && input[2] === 4 && input[3] === 7 ) {
      console.log("input:", input, "output:", output, "expected:", expected)
    }

    expect(expected).toContainEqual(output)
  })
})