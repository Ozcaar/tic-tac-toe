"use strict";

import "./style.css";
import $ from "jquery";
import { emptyBoard } from "./consts";
import { GAME_CONTAINER, TABLE_HEADER } from "./consts"; // DOM elements constants

var currentBoard;
var saveID = 1;
var savedGames = {}

// Wait for jquery loads
$(function() {

    
});

export function saveGame(playerTurn, currentBoard) {
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

export function resetBoard(currentBoard) {
    GAME_CONTAINER.html("");
        for (var i = 0; i < 9; i++) {
            GAME_CONTAINER.append(`<div class="element-game-box" position="${i}"></div>`);
    }
}

export function checkWinner(board, playerTurn) {
    // Check the rows and columns
    for (var i = 0; i < 3; i++) {
        if ((board[i][0] === playerTurn && board[i][1] === playerTurn && board[i][2] === playerTurn) ||
            (board[0][i] === playerTurn && board[1][i] === playerTurn && board[2][i] === playerTurn)) {
            Swal.fire({ // Alert from SweetAlert2
                imageUrl: "./public/imgs/emoji-party.png",
                title: `Player ${playerTurn} wins!`,
                width: "600"
            }).then(function () {
                saveGame(playerTurn);
                resetBoard();
            });
            break;  // It's not necessary keep verifying, already founded a winner.
        }
    }
    // Check the diagonals
    if ((board[0][0] === playerTurn && board[1][1] === playerTurn && board[2][2] === playerTurn) ||
        (board[0][2] === playerTurn && board[1][1] === playerTurn && board[2][0] === playerTurn)) {
        Swal.fire({ // Alert from SweetAlert2
            imageUrl: "./public/imgs/emoji-party.png",
            title: `Player ${playerTurn} wins!`
        }).then(function () {
            saveGame(playerTurn);
            resetBoard();
        });
    }

    // Check if the board is full
    if (!board[0].includes(0) && !board[1].includes(0) && !board[2].includes(0)) {
        Swal.fire({ // Alert from SweetAlert2
            imageUrl: "./public/imgs/dizzy-face-emoji.png",
            title: `Nobody wins`,
            width: "600"
        }).then(function () {
            // saveGame(playerTurn); This line should not be, because we will not save what player wins if the board is full
            resetBoard();
        });
    }
}