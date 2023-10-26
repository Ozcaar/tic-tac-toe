"use strict";

import "./style.css";
import $ from "jquery";
import { GAME_CONTAINER, TABLE_HEADER } from "./consts"; // DOM elements constants

var saveID = 1;
var savedGames = {}

// Wait for jquery loads
$(function() {

    
});

function saveGame(playerTurn, currentBoard) {
    // Save the current board the table
    savedGames[saveID] = { winner: playerTurn, board: currentBoard }; // Save the current board in an object (this is used to load board status)

    let newRow = `
        <tr>
            <td>${saveID}</td>
            <td>Player ${playerTurn}</td>
            <td><button>View</button></td>
        </tr>`;

    TABLE_HEADER.append(newRow);

    saveID++;
}

function resetBoard() {
    GAME_CONTAINER.html("");
        for (var i = 0; i < 9; i++) {
            GAME_CONTAINER.append(`<div class="element-game-box" position="${i}"></div>`);
    }
}

export function checkWinner(currentBoard, playerTurn) {
    // Check the rows and columns
    for (var i = 0; i < 3; i++) {
        if ((currentBoard[i][0] === playerTurn && currentBoard[i][1] === playerTurn && currentBoard[i][2] === playerTurn) ||
            (currentBoard[0][i] === playerTurn && currentBoard[1][i] === playerTurn && currentBoard[2][i] === playerTurn)) {
            Swal.fire({ // Alert from SweetAlert2
                imageUrl: "./public/imgs/emoji-party.png",
                title: `Player ${playerTurn} wins!`,
                width: "600"
            }).then(function () {
                saveGame(playerTurn);
                resetBoard();
                
            });
            return true;
        }
    }
    // Check the diagonals
    if ((currentBoard[0][0] === playerTurn && currentBoard[1][1] === playerTurn && currentBoard[2][2] === playerTurn) ||
        (currentBoard[0][2] === playerTurn && currentBoard[1][1] === playerTurn && currentBoard[2][0] === playerTurn)) {
        Swal.fire({ // Alert from SweetAlert2
            imageUrl: "./public/imgs/emoji-party.png",
            title: `Player ${playerTurn} wins!`
        }).then(function () {
            saveGame(playerTurn);
            resetBoard();
        });
        return true;
    }

    // Check if the board is full
    if (!currentBoard[0].includes(0) && !currentBoard[1].includes(0) && !currentBoard[2].includes(0)) {
        Swal.fire({ // Alert from SweetAlert2
            imageUrl: "./public/imgs/dizzy-face-emoji.png",
            title: `Nobody wins`,
            width: "600"
        }).then(function () {
            // saveGame(playerTurn); This line should not be, because we will not save what player wins if the board is full
            resetBoard();
        });
        return true;
    }

    return false; // If no found a winner, return false
}