import $ from "jquery";
import { GAME_CONTAINER, TURN_TITLE } from "./consts"; // DOM elements constants
import { emptyBoard, TURN } from "./consts";

var currentBoard;

function resetBoard() {
    // Delete and create again the board in blank
    currentBoard = new emptyBoard();
    GAME_CONTAINER.html("");
        for (var i = 0; i < 9; i++) {
            GAME_CONTAINER.append(`<div class="element-game-box" position="${i}"></div>`);
    }
}

function checkWinner(board, playerTurn) {
    // Check the rows and columns
    for (var i = 0; i < 3; i++) {
        if ((board[i][0] === playerTurn && board[i][1] === playerTurn && board[i][2] === playerTurn) ||
            (board[0][i] === playerTurn && board[1][i] === playerTurn && board[2][i] === playerTurn)) {
            Swal.fire({ // Alert from SweetAlert2
                imageUrl: "./public/imgs/emoji-party.png",
                title: `Player ${playerTurn} wins!`,
                width: "600"
            }).then(function () {
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
            resetBoard();
        });
    }
}

// Wait for DOM loads
$(function () {
    var playerTurn = 1; // Sets the current turn to player 1
    currentBoard = new emptyBoard();
    // Event when the user click´s an element_game_box
    $(GAME_CONTAINER).on("click", ".element-game-box", function () {
        // Operations to calculate the position of the element_game_box
        var attrPosition = $(this).attr("position");
        var posX = attrPosition % 3;
        var posY = Math.floor(attrPosition / 3);

        // Verfy if the clicked box is not selected, and if it is not selected
        // put the mark of the player in turn and check if wins
        if (currentBoard[posY][posX] === 0) {
            $(this).addClass(TURN[playerTurn].className);
            $(this).html(TURN[playerTurn].mark);

            currentBoard[posY][posX] = playerTurn;
            checkWinner(currentBoard, playerTurn);

            playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
            TURN_TITLE.text(`Player ${playerTurn}'s Turn`);
        }
    });
});