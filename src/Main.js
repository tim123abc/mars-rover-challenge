import {executeMission} from "./MissionCommand.js"
import * as readline from "readline"

const Run = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    let gridSizeInput = ``
    let roverInput = ``

    rl.question("Please enter grid co-ordinates in format - m,n: ", (gridSize) => {
        gridSizeInput += `${gridSize}`
        /*
        If I had more time I would have split readline function out for re-usability
        */
        const recursivelyReadLine = () => {
            rl.question('Please enter the Rovers starting position and commands in format - (x, y, orientation) MoveCommandCharacters \n(enter q to finish entering rovers and run commands): ', (roverStartingPosAndMoveCommands) => {
                if (roverStartingPosAndMoveCommands === "q") {
                    return rl.close()
                } else {
                    roverInput += `${roverStartingPosAndMoveCommands}\n`
                }
                recursivelyReadLine()
            })
        }
        recursivelyReadLine()
    })

    rl.on("close", () => {
        /*
        If I had more time I would split out the error validation into it's own function
        I would have added more error conditions such as mis-formatted rover input
        I would also have included mocked user input testing using jest.spyOn in a test file
        I would have split the error messages into their own Enum file
        */
        if (gridSizeInput.length < 3) {
            throw new Error("Please retry and specify grid boundaries in the format m,n where m and n are integers.")
        }
        if (gridSizeInput.split(",").some(item => isNaN(parseFloat(item)))) {
            throw new Error("Please retry, one of n,m were not is the number format.")
        }
        if (roverInput.split("\n").length === 1) {
            throw new Error("Please retry and specify 1 or more Rovers.")
        }
        executeMission(`${gridSizeInput}\n${roverInput}`
            .trim())
            .forEach(roverOutput => console.log(roverOutput))
        process.exit(0)
    })
}
Run()
