"use strict";

import $ from "jquery"
import { GAME_CONTAINER, TABLE_BODY, TURN_TITLE } from "./consts"; // DOM elements constants
import { emptyBoard, TURN } from "./consts";
import { checkWinner, showSavedPlay } from "./main"; // Import functions
import { savedPlays } from "./main"; // Import objects


// Wait for DOM loads
$(function () {
    var playerTurn = 1; // Sets the current turn to player 1
    var currentBoard = new emptyBoard(); // Sets the currentBoard value to an empty board structure

    // Event when the user click´s an element_game_box
    $(GAME_CONTAINER).on("click", ".element-game-box", function () {

        // Operations to calculate the position of the element_game_box
        var attrPosition = $(this).attr("position");
        var posX = attrPosition % 3;
        var posY = Math.floor(attrPosition / 3);

        // Verfy if the clicked box is not selected, and if it is not selected
        // put the mark of the player on turn in the clicked position and check if wins
        if (currentBoard[posY][posX] === 0) {
            $(this).addClass(TURN[playerTurn].className);
            $(this).html(TURN[playerTurn].mark);
            currentBoard[posY][posX] = playerTurn;
            if(checkWinner(playerTurn, currentBoard)) 
                { currentBoard = new emptyBoard(); console.log(playerTurn); } // If some player wins delete and create again the board in blank
            playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
            TURN_TITLE.text(`Player ${playerTurn}'s Turn`);
        }
    });

    $(TABLE_BODY).on("click", ".view-button", function (e) {
        showSavedPlay(e.target.id);
    })
});