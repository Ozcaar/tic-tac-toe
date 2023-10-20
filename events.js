import $ from "jquery";
import { GAME_CONTAINER } from "./consts"; // DOM elements constants
import { BOARD, TURN } from "./consts";

function resetBoard() {
    // Delete and create again the board in blank
    currentBoard = new BOARD;
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
        });
        resetBoard();
    }
}

// Wait for DOM loads
$(function () {
    var playerTurn = 1; // Sets the current turn to player 1
    // Event when the user click´s an element_game_box
    $(GAME_CONTAINER).on("click", ".element-game-box", function () {
        // Operations to calculate the position of the element_game_box
        var attrPosition = $(this).attr("position");
        var posX = attrPosition % 3;
        var posY = Math.floor(attrPosition / 3);

        if (currentBoard[posY][posX] === 0) {
            $(this).addClass(TURN[playerTurn].className);
            $(this).html(TURN[playerTurn].mark);

            currentBoard[posY][posX] = playerTurn;
            checkWinner(currentBoard, playerTurn);

            playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
        }
    });
});