import $ from "jquery";
import { GAME_CONTAINER } from "./consts"; // DOM elements constants
import { NEW_BOARD } from "./consts";

var currentBoard = NEW_BOARD;

console.log(currentBoard);
// Wait for jquery loads
$(function() {

    // Event when the user click´s an element_game_box
    $(GAME_CONTAINER).on("click", ".element-game-box" , function() {

        // Operations to calculate the position of the element_game_box
        var attrPosition = $(this).attr("position");
        var posX = attrPosition % 3;
        var posY = Math.floor(attrPosition / 3);
        
        if(true) {
            $(this).addClass("player-1-selected");
            currentBoard[posY][posX] = 1;
            $(this).html("x");
        }

    });

});