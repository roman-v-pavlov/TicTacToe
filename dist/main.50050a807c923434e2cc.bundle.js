/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/generateField.js":
/*!******************************!*\
  !*** ./src/generateField.js ***!
  \******************************/
/*! exports provided: ROWS_COUNT, COLS_COUNT, generateRows */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROWS_COUNT", function() { return ROWS_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLS_COUNT", function() { return COLS_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRows", function() { return generateRows; });
var ROWS_COUNT = 3;
var COLS_COUNT = 3;
var field = document.querySelector('.field');

function generateCols(row, colsCount, rowId) {
  for (var i = 0; i < colsCount; i++) {
    var id = rowId * colsCount + i;
    var col = document.createElement('div');
    col.id = "c-".concat(id);
    col.dataset.id = id;
    col.className = 'cell';
    row.appendChild(col);
  }
}

function generateRows(rowsCount, colsCount) {
  for (var i = 0; i < rowsCount; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    generateCols(row, colsCount, i);
    field.appendChild(row);
  }
} //generateRows(ROWS_COUNT, COLS_COUNT);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generateField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateField */ "./src/generateField.js");

Object(_generateField__WEBPACK_IMPORTED_MODULE_0__["generateRows"])(_generateField__WEBPACK_IMPORTED_MODULE_0__["ROWS_COUNT"], _generateField__WEBPACK_IMPORTED_MODULE_0__["COLS_COUNT"]);
var fieldObject = [];
var fieldNode = document.querySelector(".field");
fieldNode.querySelectorAll(".row").forEach(function (e) {
  var cells = e.querySelectorAll(".cell");
  var row = [];
  cells.forEach(function (c) {
    row.push(c);
    c.addEventListener("click", CellClickHandler);
  });
  fieldObject.push(row);
}); //Varibles

var players = [{
  name: "cross",
  className: "ch",
  plural: "X"
}, {
  name: "round",
  className: "r",
  plural: "O"
}];
var winClassesNames = ["horizontal", "vertical", "diagonal-right", "diagonal-left"];
var turns = [];
var cancelledTurns = [];
var fieldSize = fieldObject.length; //Button & Logic

var wonTitleElement = document.querySelector(".won-title");
var wonMessageElement = document.querySelector(".won-message");
var undoButton = document.querySelector(".undo-btn");
var redoButton = document.querySelector(".redo-btn");
var restartButton = document.querySelector(".restart-btn");
undoButton.addEventListener("click", Undo);
redoButton.addEventListener("click", Redo);
restartButton.addEventListener("click", ResetGame);
var saved = JSON.parse(localStorage.getItem("Moves"));

if (saved && saved.length > 0) {
  var _savedTurns = saved[0];
  var savedCancelledTurns = saved[1];

  _savedTurns.forEach(function (e) {
    return Move(FromCellID(e.target), e.player);
  });

  if (savedCancelledTurns && savedCancelledTurns.length > 0) cancelledTurns = savedCancelledTurns;
}

window.addEventListener("storage", function (event) {
  if (event.key === "Moves" && event.oldValue !== event.newValue) {
    var _saved = event.newValue;
    resetGame(true);
    var _savedCancelledTurns = JSON.parse(_saved)[1];
    savedMoves = JSON.parse(_saved)[0];
    if (savedTurns) savedTurns.forEach(function (e) {
      return Move(FromCellID(e.target), e.player, true);
    });
    if (_savedCancelledTurns && _savedCancelledTurns.length > 0) cancelledTurns = _savedCancelledTurns;
    ManageButtons();
  }
});

function UpdateLocalStorage() {
  localStorage.setItem("Moves", JSON.stringify([turns, cancelledTurns]));
} //Cell Logic && Move


function CellClickHandler(e) {
  if (wonTitleElement.classList.contains("hidden")) {
    var player = players[turns.length % players.length];
    Move(e.target, player);
  }
}

function Move(target, player) {
  var copied = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  cancelledTurns = [];
  target.classList.add(player.className);
  turns.push({
    target: target.id,
    player: player
  });
  ManageButtons();
  CheckForWin(target, fieldObject, player);
  if (!copied) localStorage.setItem("Moves", JSON.stringify([turns, cancelledTurns]));
}

function FromCellID(id) {
  return document.querySelector("#" + id);
}

function CheckForWin(target, field, player) {
  // Horizontaly
  var horizontal = field.filter(function (e) {
    return e.includes(target);
  })[0];

  if (horizontal.every(function (e) {
    return e.classList.contains(player.className);
  })) {
    return EndGame(player, [horizontal, "horizontal"]);
  } // Vertically


  var vertical = Array.from(document.querySelectorAll(".cell:nth-child(3n+" + (+target.id.slice(2) % 3 + 1).toString() + ")"));

  if (vertical.every(function (e) {
    return e.classList.contains(player.className);
  })) {
    return EndGame(player, [vertical, "vertical"]);
  } // Major diagonal


  if (+target.id.slice(2) % (fieldSize + 1) === 0) {
    var diagonalMajor = Array.from(document.querySelectorAll(".cell")).filter(function (e) {
      return +e.id.slice(2) % (fieldSize + 1) === 0;
    });

    if (diagonalMajor.every(function (e) {
      return e.classList.contains(player.className);
    })) {
      return EndGame(player, [diagonalMajor, "diagonal-right"]);
    }
  } // Minor diagonal


  if (+target.id.slice(2) % (fieldSize - 1) === 0) {
    var diagonalMinor = Array.from(document.querySelectorAll(".cell")).filter(function (e) {
      return +e.id.slice(2) % (fieldSize - 1) === 0 && +e.id.slice(2) !== 0 && +e.id.slice(2) !== fieldSize * fieldSize - 1;
    });

    if (diagonalMinor.every(function (e) {
      return e.classList.contains(player.className);
    })) {
      return EndGame(player, [diagonalMinor, "diagonal-left"]);
    }
  } // Draw


  if (document.querySelectorAll(".cell:not(.ch):not(.r) ").length === 0) {
    return EndGame(false);
  }

  return false;
} //Reset and End Game


function EndGame() {
  var player = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var cells = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  wonTitleElement.classList.remove("hidden");

  if (player) {
    wonMessageElement.textContent = player.plural + " wins!";
    cells[0].forEach(function (e) {
      e.classList.add(cells[1]);
      e.classList.add("win");
    });
  } else {
    wonMessageElement.textContent = "Draw!";
  }

  redoButton.disabled = true;
  undoButton.disabled = true;
  return true;
}

function ResetGame() {
  var copied = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  fieldNode.querySelectorAll(".cell").forEach(function (e) {
    players.forEach(function (p) {
      return e.classList.remove(p.className);
    });
    winClassesNames.forEach(function (p) {
      return e.classList.remove(p);
    });
    e.classList.remove("win");
  });
  undoButton.disabled = true;
  redoButton.disabled = true;
  wonTitleElement.classList.add("hidden");
  turns = [];
  cancelledTurns = [];
  if (copied !== true) localStorage.setItem("Moves", JSON.stringify([]));
} //UI Logic


function ManageButtons() {
  redoButton.disabled = cancelledTurns.length === 0;
  undoButton.disabled = turns.length === 0;

  if (!wonTitleElement.classList.contains("hidden")) {
    redoButton.disabled = undoButton.disabled = true;
  }
}

function Undo() {
  var turn = turns.pop();
  cancelledTurns.push(turn);
  players.forEach(function (e) {
    FromCellID(turn.target).classList.remove(e.className);
  });
  ManageButtons();
  UpdateLocalStorage();
}

function Redo() {
  var turn = cancelledTurns.pop();
  turns.push(turn);
  FromCellID(turn.target).classList.add(turn.player.className);
  ManageButtons();
  UpdateLocalStorage();
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlbmVyYXRlRmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJPV1NfQ09VTlQiLCJDT0xTX0NPVU5UIiwiZmllbGQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZW5lcmF0ZUNvbHMiLCJyb3ciLCJjb2xzQ291bnQiLCJyb3dJZCIsImkiLCJpZCIsImNvbCIsImNyZWF0ZUVsZW1lbnQiLCJkYXRhc2V0IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJnZW5lcmF0ZVJvd3MiLCJyb3dzQ291bnQiLCJmaWVsZE9iamVjdCIsImZpZWxkTm9kZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZSIsImNlbGxzIiwiYyIsInB1c2giLCJhZGRFdmVudExpc3RlbmVyIiwiQ2VsbENsaWNrSGFuZGxlciIsInBsYXllcnMiLCJuYW1lIiwicGx1cmFsIiwid2luQ2xhc3Nlc05hbWVzIiwidHVybnMiLCJjYW5jZWxsZWRUdXJucyIsImZpZWxkU2l6ZSIsImxlbmd0aCIsIndvblRpdGxlRWxlbWVudCIsIndvbk1lc3NhZ2VFbGVtZW50IiwidW5kb0J1dHRvbiIsInJlZG9CdXR0b24iLCJyZXN0YXJ0QnV0dG9uIiwiVW5kbyIsIlJlZG8iLCJSZXNldEdhbWUiLCJzYXZlZCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzYXZlZFR1cm5zIiwic2F2ZWRDYW5jZWxsZWRUdXJucyIsIk1vdmUiLCJGcm9tQ2VsbElEIiwidGFyZ2V0IiwicGxheWVyIiwid2luZG93IiwiZXZlbnQiLCJrZXkiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwicmVzZXRHYW1lIiwic2F2ZWRNb3ZlcyIsIk1hbmFnZUJ1dHRvbnMiLCJVcGRhdGVMb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjb3BpZWQiLCJhZGQiLCJDaGVja0ZvcldpbiIsImhvcml6b250YWwiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImV2ZXJ5IiwiRW5kR2FtZSIsInZlcnRpY2FsIiwiQXJyYXkiLCJmcm9tIiwic2xpY2UiLCJ0b1N0cmluZyIsImRpYWdvbmFsTWFqb3IiLCJkaWFnb25hbE1pbm9yIiwicmVtb3ZlIiwidGV4dENvbnRlbnQiLCJkaXNhYmxlZCIsInAiLCJ0dXJuIiwicG9wIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQU8sSUFBTUEsVUFBVSxHQUFHLENBQW5CO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLENBQW5CO0FBQ1AsSUFBTUMsS0FBSyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZDs7QUFFQSxTQUFTQyxZQUFULENBQXNCQyxHQUF0QixFQUEyQkMsU0FBM0IsRUFBc0ND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RUQsU0FBU3JCLElBQVQsR0FBZ0I7QUFDWixNQUFJNkMsSUFBSSxHQUFHdEQsY0FBYyxDQUFDdUQsR0FBZixFQUFYO0FBQ0F4RCxPQUFLLENBQUNQLElBQU4sQ0FBVzhELElBQVg7QUFDQW5DLFlBQVUsQ0FBQ21DLElBQUksQ0FBQ2xDLE1BQU4sQ0FBVixDQUF3QmEsU0FBeEIsQ0FBa0NHLEdBQWxDLENBQXNDa0IsSUFBSSxDQUFDakMsTUFBTCxDQUFZeEMsU0FBbEQ7QUFDQWdELGVBQWE7QUFDYkMsb0JBQWtCO0FBQ3JCLEMiLCJmaWxlIjoibWFpbi41MDA1MGE4MDdjOTIzNDM0ZTJjYy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjb25zdCBST1dTX0NPVU5UID0gMztcclxuZXhwb3J0IGNvbnN0IENPTFNfQ09VTlQgPSAzO1xyXG5jb25zdCBmaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZCcpO1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVDb2xzKHJvdywgY29sc0NvdW50LCByb3dJZCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sc0NvdW50OyBpKyspIHtcclxuICAgIGNvbnN0IGlkID0gcm93SWQgKiBjb2xzQ291bnQgKyBpO1xyXG4gICAgY29uc3QgY29sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb2wuaWQgPSBgYy0ke2lkfWA7XHJcbiAgICBjb2wuZGF0YXNldC5pZCA9IGlkO1xyXG4gICAgY29sLmNsYXNzTmFtZSA9ICdjZWxsJztcclxuICAgIHJvdy5hcHBlbmRDaGlsZChjb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUm93cyhyb3dzQ291bnQsIGNvbHNDb3VudCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93c0NvdW50OyBpKyspIHtcclxuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcm93LmNsYXNzTmFtZSA9ICdyb3cnO1xyXG4gICAgZ2VuZXJhdGVDb2xzKHJvdywgY29sc0NvdW50LCBpKTtcclxuICAgIGZpZWxkLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgfVxyXG59XHJcblxyXG4vL2dlbmVyYXRlUm93cyhST1dTX0NPVU5ULCBDT0xTX0NPVU5UKTsiLCJpbXBvcnQgeyBDT0xTX0NPVU5ULCBST1dTX0NPVU5ULCBnZW5lcmF0ZVJvd3MgfSBmcm9tICcuL2dlbmVyYXRlRmllbGQnO1xyXG5cclxuZ2VuZXJhdGVSb3dzKFJPV1NfQ09VTlQsIENPTFNfQ09VTlQpO1xyXG5cclxuXHJcbmxldCBmaWVsZE9iamVjdCA9IFtdO1xyXG5sZXQgZmllbGROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWVsZFwiKTtcclxuZmllbGROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucm93XCIpLmZvckVhY2goZSA9PiB7XHJcbiAgICBsZXQgY2VsbHMgPSBlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbFwiKTtcclxuICAgIGxldCByb3cgPSBbXTtcclxuICAgIGNlbGxzLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgcm93LnB1c2goYyk7XHJcbiAgICAgICAgYy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgQ2VsbENsaWNrSGFuZGxlcik7XHJcbiAgICB9KTtcclxuICAgIGZpZWxkT2JqZWN0LnB1c2gocm93KTtcclxufSk7XHJcblxyXG4vL1ZhcmlibGVzXHJcbmxldCBwbGF5ZXJzID0gW1xyXG4gICAgeyBuYW1lOiBcImNyb3NzXCIsIGNsYXNzTmFtZTogXCJjaFwiLCBwbHVyYWw6IFwiWFwiIH0sXHJcbiAgICB7IG5hbWU6IFwicm91bmRcIiwgY2xhc3NOYW1lOiBcInJcIiwgcGx1cmFsOiBcIk9cIiB9XHJcbl07XHJcbmxldCB3aW5DbGFzc2VzTmFtZXMgPSBbXCJob3Jpem9udGFsXCIsIFwidmVydGljYWxcIiwgXCJkaWFnb25hbC1yaWdodFwiLCBcImRpYWdvbmFsLWxlZnRcIl07XHJcbmxldCB0dXJucyA9IFtdO1xyXG5sZXQgY2FuY2VsbGVkVHVybnMgPSBbXTtcclxubGV0IGZpZWxkU2l6ZSA9IGZpZWxkT2JqZWN0Lmxlbmd0aDtcclxuXHJcbi8vQnV0dG9uICYgTG9naWNcclxubGV0IHdvblRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud29uLXRpdGxlXCIpO1xyXG5sZXQgd29uTWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndvbi1tZXNzYWdlXCIpO1xyXG5sZXQgdW5kb0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudW5kby1idG5cIik7XHJcbmxldCByZWRvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWRvLWJ0blwiKTtcclxubGV0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnQtYnRuXCIpO1xyXG51bmRvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBVbmRvKTtcclxucmVkb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgUmVkbyk7XHJcbnJlc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIFJlc2V0R2FtZSk7XHJcblxyXG5sZXQgc2F2ZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTW92ZXNcIikpO1xyXG5pZiAoc2F2ZWQgJiYgc2F2ZWQubGVuZ3RoID4gMCkge1xyXG4gICAgbGV0IHNhdmVkVHVybnMgPSBzYXZlZFswXTtcclxuICAgIGxldCBzYXZlZENhbmNlbGxlZFR1cm5zID0gc2F2ZWRbMV07XHJcbiAgICBzYXZlZFR1cm5zLmZvckVhY2goZSA9PiBNb3ZlKEZyb21DZWxsSUQoZS50YXJnZXQpLCBlLnBsYXllcikpO1xyXG4gICAgaWYgKHNhdmVkQ2FuY2VsbGVkVHVybnMgJiYgc2F2ZWRDYW5jZWxsZWRUdXJucy5sZW5ndGggPiAwKSBjYW5jZWxsZWRUdXJucyA9IHNhdmVkQ2FuY2VsbGVkVHVybnM7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJNb3Zlc1wiICYmIGV2ZW50Lm9sZFZhbHVlICE9PSBldmVudC5uZXdWYWx1ZSkge1xyXG4gICAgICAgIGxldCBzYXZlZCA9IGV2ZW50Lm5ld1ZhbHVlO1xyXG4gICAgICAgIHJlc2V0R2FtZSh0cnVlKTtcclxuICAgICAgICBsZXQgc2F2ZWRDYW5jZWxsZWRUdXJucyA9IEpTT04ucGFyc2Uoc2F2ZWQpWzFdO1xyXG4gICAgICAgIHNhdmVkTW92ZXMgPSBKU09OLnBhcnNlKHNhdmVkKVswXTtcclxuICAgICAgICBpZiAoc2F2ZWRUdXJucykgc2F2ZWRUdXJucy5mb3JFYWNoKGUgPT4gTW92ZShGcm9tQ2VsbElEKGUudGFyZ2V0KSwgZS5wbGF5ZXIsIHRydWUpKTtcclxuICAgICAgICBpZiAoc2F2ZWRDYW5jZWxsZWRUdXJucyAmJiBzYXZlZENhbmNlbGxlZFR1cm5zLmxlbmd0aCA+IDApIGNhbmNlbGxlZFR1cm5zID0gc2F2ZWRDYW5jZWxsZWRUdXJucztcclxuICAgICAgICBNYW5hZ2VCdXR0b25zKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIFVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTW92ZXNcIiwgSlNPTi5zdHJpbmdpZnkoW3R1cm5zLCBjYW5jZWxsZWRUdXJuc10pKTtcclxufVxyXG5cclxuLy9DZWxsIExvZ2ljICYmIE1vdmVcclxuZnVuY3Rpb24gQ2VsbENsaWNrSGFuZGxlcihlKSB7XHJcbiAgICBpZiAod29uVGl0bGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBwbGF5ZXJzW3R1cm5zLmxlbmd0aCAlIHBsYXllcnMubGVuZ3RoXTtcclxuICAgICAgICBNb3ZlKGUudGFyZ2V0LCBwbGF5ZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBNb3ZlKHRhcmdldCwgcGxheWVyLCBjb3BpZWQgPSBmYWxzZSkge1xyXG4gICAgY2FuY2VsbGVkVHVybnMgPSBbXTtcclxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHBsYXllci5jbGFzc05hbWUpO1xyXG4gICAgdHVybnMucHVzaCh7IHRhcmdldDogdGFyZ2V0LmlkLCBwbGF5ZXI6IHBsYXllciB9KTtcclxuICAgIE1hbmFnZUJ1dHRvbnMoKTtcclxuICAgIENoZWNrRm9yV2luKHRhcmdldCwgZmllbGRPYmplY3QsIHBsYXllcik7XHJcbiAgICBpZiAoIWNvcGllZCkgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJNb3Zlc1wiLCBKU09OLnN0cmluZ2lmeShbdHVybnMsIGNhbmNlbGxlZFR1cm5zXSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBGcm9tQ2VsbElEKGlkKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGlkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ2hlY2tGb3JXaW4odGFyZ2V0LCBmaWVsZCwgcGxheWVyKSB7XHJcbiAgICAvLyBIb3Jpem9udGFseVxyXG4gICAgbGV0IGhvcml6b250YWwgPSBmaWVsZC5maWx0ZXIoZSA9PiBlLmluY2x1ZGVzKHRhcmdldCkpWzBdO1xyXG4gICAgaWYgKGhvcml6b250YWwuZXZlcnkoZSA9PiBlLmNsYXNzTGlzdC5jb250YWlucyhwbGF5ZXIuY2xhc3NOYW1lKSkpIHtcclxuICAgICAgICByZXR1cm4gRW5kR2FtZShwbGF5ZXIsIFtob3Jpem9udGFsLCBcImhvcml6b250YWxcIl0pO1xyXG4gICAgfVxyXG4gICAgLy8gVmVydGljYWxseVxyXG4gICAgbGV0IHZlcnRpY2FsID0gQXJyYXkuZnJvbShcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGw6bnRoLWNoaWxkKDNuK1wiICsgKCgrdGFyZ2V0LmlkLnNsaWNlKDIpICUgMykgKyAxKS50b1N0cmluZygpICsgXCIpXCIpXHJcbiAgICApO1xyXG4gICAgaWYgKHZlcnRpY2FsLmV2ZXJ5KGUgPT4gZS5jbGFzc0xpc3QuY29udGFpbnMocGxheWVyLmNsYXNzTmFtZSkpKSB7XHJcbiAgICAgICAgcmV0dXJuIEVuZEdhbWUocGxheWVyLCBbdmVydGljYWwsIFwidmVydGljYWxcIl0pO1xyXG4gICAgfVxyXG4gICAgLy8gTWFqb3IgZGlhZ29uYWxcclxuICAgIGlmICgrdGFyZ2V0LmlkLnNsaWNlKDIpICUgKGZpZWxkU2l6ZSArIDEpID09PSAwKSB7XHJcbiAgICAgICAgbGV0IGRpYWdvbmFsTWFqb3IgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbFwiKSkuZmlsdGVyKFxyXG4gICAgICAgICAgICBlID0+ICtlLmlkLnNsaWNlKDIpICUgKGZpZWxkU2l6ZSArIDEpID09PSAwXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoZGlhZ29uYWxNYWpvci5ldmVyeShlID0+IGUuY2xhc3NMaXN0LmNvbnRhaW5zKHBsYXllci5jbGFzc05hbWUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gRW5kR2FtZShwbGF5ZXIsIFtkaWFnb25hbE1ham9yLCBcImRpYWdvbmFsLXJpZ2h0XCJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBNaW5vciBkaWFnb25hbFxyXG4gICAgaWYgKCt0YXJnZXQuaWQuc2xpY2UoMikgJSAoZmllbGRTaXplIC0gMSkgPT09IDApIHtcclxuICAgICAgICBsZXQgZGlhZ29uYWxNaW5vciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpKS5maWx0ZXIoXHJcbiAgICAgICAgICAgIGUgPT5cclxuICAgICAgICAgICAgICAgICtlLmlkLnNsaWNlKDIpICUgKGZpZWxkU2l6ZSAtIDEpID09PSAwICYmICtlLmlkLnNsaWNlKDIpICE9PSAwICYmICtlLmlkLnNsaWNlKDIpICE9PSBmaWVsZFNpemUgKiBmaWVsZFNpemUgLSAxXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoZGlhZ29uYWxNaW5vci5ldmVyeShlID0+IGUuY2xhc3NMaXN0LmNvbnRhaW5zKHBsYXllci5jbGFzc05hbWUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gRW5kR2FtZShwbGF5ZXIsIFtkaWFnb25hbE1pbm9yLCBcImRpYWdvbmFsLWxlZnRcIl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERyYXdcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGw6bm90KC5jaCk6bm90KC5yKSBcIikubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIEVuZEdhbWUoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLy9SZXNldCBhbmQgRW5kIEdhbWVcclxuZnVuY3Rpb24gRW5kR2FtZShwbGF5ZXIgPSBmYWxzZSwgY2VsbHMgPSBudWxsKSB7XHJcbiAgICB3b25UaXRsZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIGlmIChwbGF5ZXIpIHtcclxuICAgICAgICB3b25NZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IHBsYXllci5wbHVyYWwgKyBcIiB3aW5zIVwiO1xyXG4gICAgICAgIGNlbGxzWzBdLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZChjZWxsc1sxXSk7XHJcbiAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZChcIndpblwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd29uTWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIkRyYXchXCI7XHJcbiAgICB9XHJcbiAgICByZWRvQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIHVuZG9CdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBSZXNldEdhbWUoY29waWVkID0gZmFsc2UpIHtcclxuICAgIGZpZWxkTm9kZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIikuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBwbGF5ZXJzLmZvckVhY2gocCA9PiBlLmNsYXNzTGlzdC5yZW1vdmUocC5jbGFzc05hbWUpKTtcclxuICAgICAgICB3aW5DbGFzc2VzTmFtZXMuZm9yRWFjaChwID0+IGUuY2xhc3NMaXN0LnJlbW92ZShwKSk7XHJcbiAgICAgICAgZS5jbGFzc0xpc3QucmVtb3ZlKFwid2luXCIpO1xyXG4gICAgfSk7XHJcbiAgICB1bmRvQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIHJlZG9CdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgd29uVGl0bGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICB0dXJucyA9IFtdO1xyXG4gICAgY2FuY2VsbGVkVHVybnMgPSBbXTtcclxuICAgIGlmIChjb3BpZWQgIT09IHRydWUpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiTW92ZXNcIiwgSlNPTi5zdHJpbmdpZnkoW10pKTtcclxufVxyXG5cclxuLy9VSSBMb2dpY1xyXG5mdW5jdGlvbiBNYW5hZ2VCdXR0b25zKCkge1xyXG4gICAgcmVkb0J1dHRvbi5kaXNhYmxlZCA9IGNhbmNlbGxlZFR1cm5zLmxlbmd0aCA9PT0gMDtcclxuICAgIHVuZG9CdXR0b24uZGlzYWJsZWQgPSB0dXJucy5sZW5ndGggPT09IDA7XHJcbiAgICBpZiAoIXdvblRpdGxlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcclxuICAgICAgICByZWRvQnV0dG9uLmRpc2FibGVkID0gdW5kb0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFVuZG8oKSB7XHJcbiAgICBsZXQgdHVybiA9IHR1cm5zLnBvcCgpO1xyXG4gICAgY2FuY2VsbGVkVHVybnMucHVzaCh0dXJuKTtcclxuICAgIHBsYXllcnMuZm9yRWFjaChlID0+IHtGcm9tQ2VsbElEKHR1cm4udGFyZ2V0KS5jbGFzc0xpc3QucmVtb3ZlKGUuY2xhc3NOYW1lKTt9KTtcclxuICAgIE1hbmFnZUJ1dHRvbnMoKTtcclxuICAgIFVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBSZWRvKCkge1xyXG4gICAgbGV0IHR1cm4gPSBjYW5jZWxsZWRUdXJucy5wb3AoKTtcclxuICAgIHR1cm5zLnB1c2godHVybik7XHJcbiAgICBGcm9tQ2VsbElEKHR1cm4udGFyZ2V0KS5jbGFzc0xpc3QuYWRkKHR1cm4ucGxheWVyLmNsYXNzTmFtZSk7XHJcbiAgICBNYW5hZ2VCdXR0b25zKCk7XHJcbiAgICBVcGRhdGVMb2NhbFN0b3JhZ2UoKTtcclxufSJdLCJzb3VyY2VSb290IjoiIn0=