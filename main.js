"use strict";

import "./style.css";
import $ from "jquery";
import { TURN } from "./consts";
import { GAME_CONTAINER, TABLE_BODY } from "./consts"; // DOM elements constants

var saveID = 1;
export var savedPlays = {}

// Wait for jquery loads
$(function() {

    
});

function saveGame(playerTurn, currentBoard) {
    // Save the current board the table
    savedPlays[saveID] = { id: saveID ,winner: playerTurn, board: currentBoard }; // Save the current board in an object (this is used to load board status)

    // Create a new row for the table
    let newRow = `
        <tr>
            <td>${saveID}</td>
            <td>Player ${playerTurn}</td>
            <td><button id="${saveID}" class="view-button">View</button></td>
        </tr>`;

    // Appends the new row to the table
    TABLE_BODY.append(newRow);

    saveID++; // Prepares the next saveID
}

function resetBoard() {
    // Reset the html of the board, then appends the new element-game-boxes to the board
    GAME_CONTAINER.html("");
    for (var i = 0; i < 9; i++) {
        GAME_CONTAINER.append(`<div class="element-game-box" position="${i}"></div>`);
    }
}

export function checkWinner(playerTurn, currentBoard) {
    // Check the rows and columns
    for (var i = 0; i < 3; i++) {
        if ((currentBoard[i][0] === playerTurn && currentBoard[i][1] === playerTurn && currentBoard[i][2] === playerTurn) ||
            (currentBoard[0][i] === playerTurn && currentBoard[1][i] === playerTurn && currentBoard[2][i] === playerTurn)) {
            Swal.fire({ // Alert from SweetAlert2
                imageUrl: "./public/imgs/emoji-party.png",
                title: `Player ${playerTurn} wins!`,
                width: "600"
            }).then(function () {
                saveGame(playerTurn, currentBoard);
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
            saveGame(playerTurn, currentBoard);
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

function generatePlayHTML(playID) {

    let html = '';

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            // console.log(playID.winner);
            // console.log(savedPlays);
            html = html.concat(`<div class="element-game-box ${TURN[savedPlays[playID].board[i][j]].className}">${TURN[savedPlays[playID].board[i][j]].mark}</div>`);
        }
    }
    return html;
}

export function showSavedPlay(playID) {

    Swal.fire({ // Alert from SweetAlert2
        title: `{{ Placeholder }}`,
        html: `<div class="game-container grid">${generatePlayHTML(playID)}</div>`,
        width: "600",
        showDenyButton: true,
        denyButtonText: 'Close',
        showConfirmButton: false
    }).then(function () {
    });
}