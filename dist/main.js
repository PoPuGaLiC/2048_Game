/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BackgroundLayer.js":
/*!********************************!*\
  !*** ./src/BackgroundLayer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BackgroundLayer: () => (/* binding */ BackgroundLayer)\n/* harmony export */ });\n/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets */ \"./src/assets.js\");\n\r\n\r\nclass BackgroundLayer extends cc.Layer {\r\n    constructor() {\r\n        super();\r\n        var size = cc.director.getWinSize();\r\n        var field = cc.Sprite.create(_assets__WEBPACK_IMPORTED_MODULE_0__.ASSETS[0]);\r\n        field.setPosition(size.width / 2, 365 / 2 + 9);              \r\n        this.addChild(field, 0);\r\n        var countField = cc.Sprite.create(_assets__WEBPACK_IMPORTED_MODULE_0__.ASSETS[12]);\r\n        countField.setPosition(size.width / 2, size.height - (68 / 2 + 18));              \r\n        this.addChild(countField, 0);\r\n    };\r\n};\n\n//# sourceURL=webpack:///./src/BackgroundLayer.js?");

/***/ }),

/***/ "./src/CountLabel.js":
/*!***************************!*\
  !*** ./src/CountLabel.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CountLabel: () => (/* binding */ CountLabel)\n/* harmony export */ });\nclass CountLabel extends cc.LabelTTF {\r\n    constructor(label, fontName, fontSize, size) {\r\n        super(label, fontName, fontSize);\r\n        this.x = size.width / 2 - 25;\r\n        this.y = size.height - (68 / 2 + 22 + 11);\r\n        this.setFontFillColor(0, 0, 0);\r\n    };\r\n};\n\n//# sourceURL=webpack:///./src/CountLabel.js?");

/***/ }),

/***/ "./src/GameScene.js":
/*!**************************!*\
  !*** ./src/GameScene.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameScene: () => (/* binding */ GameScene)\n/* harmony export */ });\n/* harmony import */ var _BackgroundLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroundLayer */ \"./src/BackgroundLayer.js\");\n/* harmony import */ var _TileLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TileLayer */ \"./src/TileLayer.js\");\n\r\n\r\n\r\nclass GameScene extends cc.Scene {\r\n    onEnter(){\r\n        super.onEnter();\r\n        const size = cc.director.getWinSize();\r\n        this.backgroundLayer = new _BackgroundLayer__WEBPACK_IMPORTED_MODULE_0__.BackgroundLayer();\r\n        this.addChild(this.backgroundLayer, 1);\r\n        \r\n        this.tileLayer = new _TileLayer__WEBPACK_IMPORTED_MODULE_1__.TileLayer(size);\r\n        this.tileLayer.setPosition(25, 11);\r\n        this.addChild(this.tileLayer, 1);\r\n    };\r\n};\n\n//# sourceURL=webpack:///./src/GameScene.js?");

/***/ }),

/***/ "./src/Tile.js":
/*!*********************!*\
  !*** ./src/Tile.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tile: () => (/* binding */ Tile)\n/* harmony export */ });\n/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets */ \"./src/assets.js\");\n/* harmony import */ var _normalizedXY__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalizedXY */ \"./src/normalizedXY.js\");\n\r\n\r\n\r\nclass Tile extends cc.Sprite {\r\n    constructor(number, x, y) {\r\n        super(_assets__WEBPACK_IMPORTED_MODULE_0__.ASSETS[number]);\r\n        this.nextX = null;\r\n        this.nextY = null;\r\n        this.number = number;\r\n        this.setPosition((0,_normalizedXY__WEBPACK_IMPORTED_MODULE_1__.normXY)(x, y));\r\n        this.restart = 0;\r\n    };\r\n\r\n    animationCreation() {\r\n        this.setScale(0.1, 0.1);\r\n        return new Promise(resolve => this.runAction(cc.sequence([\r\n            cc.scaleTo(0.3, 1, 1),\r\n            cc.callFunc(resolve),\r\n        ])));\r\n    };\r\n\r\n    animationFusion() {\r\n        this.setScale(1.1, 1.1);\r\n        return new Promise(resolve => this.runAction(cc.sequence([\r\n            cc.scaleTo(0.3, 1, 1),\r\n            cc.callFunc(resolve),\r\n        ])));\r\n    };\r\n};\n\n//# sourceURL=webpack:///./src/Tile.js?");

/***/ }),

/***/ "./src/TileLayer.js":
/*!**************************!*\
  !*** ./src/TileLayer.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TileLayer: () => (/* binding */ TileLayer)\n/* harmony export */ });\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.js\");\n/* harmony import */ var _CountLabel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountLabel */ \"./src/CountLabel.js\");\n/* harmony import */ var _GameScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameScene */ \"./src/GameScene.js\");\n/* harmony import */ var _normalizedXY__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./normalizedXY */ \"./src/normalizedXY.js\");\n\r\n\r\n\r\n\r\n\r\nclass TileLayer extends cc.Layer {\r\n    constructor(size) {\r\n        super();\r\n        this.prevX = null;\r\n        this.prevY = null;\r\n        this.direction = null;\r\n        this.tileField = Array(4).fill(-1).map(x => Array(4).fill(-1));\r\n        this.prevTileArray = this.tileField.flat();\r\n\r\n        this.count = 0;\r\n        this.countLabel = new _CountLabel__WEBPACK_IMPORTED_MODULE_1__.CountLabel(\"СЧЁТ: \" + this.count, \"Arial\", 32, size);\r\n        this.addChild(this.countLabel, 2);\r\n\r\n        this.addTile(1);\r\n        this.addTile(1);\r\n        \r\n        if ( cc.sys.capabilities.hasOwnProperty('mouse') ) {\r\n            cc.eventManager.addListener({\r\n                event: cc.EventListener.MOUSE,\r\n                onMouseDown: (touch) => {\r\n                    this.prevX = touch.getLocationX();\r\n                    this.prevY = touch.getLocationY();\r\n                },\r\n                onMouseUp: (touch) => {\r\n                    this.checkMovement(touch.getLocationX(), touch.getLocationY())\r\n                },\r\n            }, this);\r\n        };\r\n        \r\n        if ( cc.sys.capabilities.hasOwnProperty('touches') ) {\r\n            cc.eventManager.addListener({\r\n                event: cc.EventListener.TOUCH_ONE_BY_ONE,\r\n                onTouchBegan: (touch) => {\r\n                    this.prevX = touch.getLocationX();\r\n                    this.prevY = touch.getLocationY();\r\n                    return true;\r\n                },\r\n                onTouchEnded: (touch) => {\r\n                    this.checkMovement(touch.getLocationX(), touch.getLocationY())\r\n                },\r\n            }, this);\r\n        };\r\n    };\r\n\r\n    async checkMovement(nextX, nextY) {\r\n        if ((this.prevX != null) && (this.prevY != null)) {\r\n            cc.eventManager.pauseTarget(this, true);\r\n            \r\n            let diffX = Math.abs(nextX) - Math.abs(this.prevX);\r\n            let diffY = Math.abs(nextY) - Math.abs(this.prevY);\r\n            this.prevX = null;\r\n            this.prevY = null;\r\n\r\n            if ((Math.abs(diffX) > 50) || (Math.abs(diffY) > 50)) {\r\n                await this.movement(diffX, diffY);\r\n            };\r\n            cc.eventManager.resumeTarget(this, true);\r\n        };\r\n    };\r\n\r\n    searchFreePlace() {\r\n        let flatTileArr = this.tileField.flat();\r\n        while (true) {\r\n            let freePlace = Math.floor(Math.random() * 16);\r\n            if (flatTileArr[freePlace] === -1) {\r\n                return [Math.floor(freePlace / 4), freePlace % 4];\r\n            }; \r\n        };\r\n    };\r\n    \r\n    async addTile(start = 0) {\r\n        let [i, j] = this.searchFreePlace();\r\n        let chance = (start === 1) ? 1 : 0.9;\r\n        let numberTile = (chance > Math.random()) ? 1 : 2;\r\n\r\n        this.tileField[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile (numberTile, j, i); \r\n        this.addChild(this.tileField[i][j], 2);\r\n        await this.tileField[i][j].animationCreation();\r\n    };\r\n\r\n    async movement(diffX, diffY) {\r\n        this.prevTileArray = this.tileField.flat();\r\n        this.direction = Math.abs(diffX) > Math.abs(diffY) ? \r\n            diffX > 0 ? 'right' : 'left' : \r\n            diffY > 0 ? 'up' : 'down';\r\n            \r\n        this.movementTiles();\r\n        this.mergeTiles();\r\n        await this.movementAnimation();\r\n        await this.mergeAnimation();\r\n\r\n        if ((this.tileField.flat().some(x => x === -1)) &&\r\n            (this.tileField.flat().some((x, j) => x != this.prevTileArray[j]))\r\n        ) {\r\n            await this.addTile();\r\n        };\r\n        \r\n        if (this.checkWin()) {\r\n            alert(\"Уровень пройден\");\r\n            this.restart();\r\n        };\r\n        \r\n        if (this.checkGameOver()) {\r\n            alert(\"Нельзя сделать ход\");\r\n            this.restart();\r\n        };\r\n        \r\n    };\r\n\r\n    pushInTileQueue(tileQueue, i, j) {\r\n        tileQueue.push(this.tileField[i][j]);\r\n        this.tileField[i][j] = -1;\r\n        return tileQueue;\r\n    };\r\n\r\n    updateTileXY(i, j, x) {\r\n        this.tileField[i][j] = x;\r\n        this.tileField[i][j].nextX = j;\r\n        this.tileField[i][j].nextY = i;\r\n    };\r\n\r\n    movementTiles() {\r\n        for (let i = 0; i < 4; i++){\r\n            let tileQueue = [];\r\n            for(let j = 0; j < 4; j++) {\r\n                switch (this.direction) {\r\n                    case ('left'):\r\n                    case ('right'):\r\n                        if (this.tileField[i][j] != -1) {\r\n                            tileQueue = this.pushInTileQueue(tileQueue, i,j);\r\n                        };\r\n                        break;\r\n                    case ('up'):\r\n                    case ('down'):\r\n                        if (this.tileField[j][i] != -1) {\r\n                            tileQueue = this.pushInTileQueue(tileQueue, j, i);\r\n                        };\r\n                        break;\r\n                };\r\n            };\r\n\r\n            tileQueue.forEach((x, j) => {\r\n                switch (this.direction){\r\n                    case 'left':\r\n                        this.updateTileXY(i, j, x);\r\n                        break;\r\n                    case 'right':\r\n                        this.updateTileXY(i, 4 - tileQueue.length + j, x);\r\n                        break;\r\n                    case 'up':\r\n                        this.updateTileXY(j, i, x);\r\n                        break;\r\n                    case 'down':\r\n                        this.updateTileXY(4 - tileQueue.length + j, i, x);\r\n                        break;\r\n                };\r\n            });\r\n        };\r\n    };\r\n\r\n    changeCount(number) {\r\n        this.count = this.count + (2 ** number) * 2;\r\n        this.countLabel.setString('СЧЁТ: ' + this.count);\r\n    };\r\n\r\n    createSequence(i) {\r\n        let sequence = [];\r\n        switch (this.direction) {\r\n            case 'left':\r\n                sequence = this.tileField[i];\r\n                break;\r\n            case 'right':\r\n                sequence = this.tileField[i].slice(0).reverse();\r\n                break;\r\n            case 'up':\r\n                this.tileField[i].forEach((x, j) => sequence[j] = this.tileField[j][i]);\r\n                break;\r\n            case 'down':\r\n                this.tileField[i].forEach((x, j) => sequence[j] = this.tileField[j][i]);\r\n                sequence.reverse();\r\n                break;\r\n        }\r\n        return sequence;\r\n    };\r\n\r\n    updateTileField(i, sequence) {\r\n        switch (this.direction) {\r\n            case 'left':\r\n                this.tileField[i] = sequence;\r\n                break;\r\n            case 'right':\r\n                this.tileField[i] = sequence.slice(0).reverse();\r\n                break;\r\n            case 'up':\r\n                sequence.forEach((x, j) => this.tileField[j][i] = sequence[j]);\r\n                break;\r\n            case 'down':\r\n                sequence.reverse();\r\n                sequence.forEach((x, j) => this.tileField[j][i] = sequence[j]);\r\n                break;\r\n        };\r\n    };\r\n\r\n    mergeTiles() {\r\n        for (let i = 0; i < 4; i++) {\r\n            let sequence = this.createSequence(i);\r\n            let flag = null;\r\n            for (let j = 0; j < 3; j++) {\r\n                if ((sequence[j] != -1) && (sequence[j].number === sequence[j+1].number)) {\r\n                    if (flag != sequence[j].number){\r\n                        let temp1 = [sequence[j].nextX, sequence[j].nextY];\r\n                        flag = sequence[j].number;\r\n                        for (let k = j; k < 3; k++) {\r\n                            if (sequence[k + 1] != -1) {\r\n                                let temp2 = [sequence[k+1].nextX, sequence[k+1].nextY]\r\n                                sequence[k+1].nextX = temp1[0]\r\n                                sequence[k+1].nextY = temp1[1]\r\n                                temp1 = temp2;\r\n                            };\r\n                        };\r\n                    } else {\r\n                        flag = null;\r\n                    };\r\n                };\r\n            };\r\n            this.updateTileField(i, sequence);\r\n        };\r\n    };\r\n\r\n    movementAnimation(){\r\n        let promiseArr = Array(this.tileField.flat().length);\r\n        for (let i = 0; i < 4; i++) {\r\n            for (let j = 0; j < 4; j++) {\r\n                if (this.tileField[i][j] != -1) {\r\n                    promiseArr[4 * i + j] = new Promise(resolve => this.tileField[i][j].runAction(cc.sequence([\r\n                        cc.moveTo(0.2, cc.p( (0,_normalizedXY__WEBPACK_IMPORTED_MODULE_3__.normXY)(this.tileField[i][j].nextX, this.tileField[i][j].nextY)) ),\r\n                        cc.callFunc(resolve),\r\n                    ])));\r\n                };\r\n            };\r\n        };\r\n        return Promise.all(promiseArr);\r\n    };\r\n\r\n    mergeAnimation() {\r\n        for (let i = 0; i < 4; i++) {\r\n            let sequence = this.createSequence(i);\r\n            for (let j = 0; j < 3; j++) {\r\n                if ((sequence[j] != -1) && (sequence[j].number === sequence[j + 1].number)) {\r\n                    const newTileNumber = sequence[j].number + 1;\r\n                    this.changeCount(sequence[j].number);\r\n                    this.removeChild(sequence[j]);\r\n                    this.removeChild(sequence[j + 1]);\r\n                    switch (this.direction) {\r\n                        case 'left':\r\n                            sequence.splice(j, 2, new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile(newTileNumber, j, i));\r\n                            break;\r\n                        case 'right':\r\n                            sequence.splice(j, 2, new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile(newTileNumber, 3 - j, i));\r\n                            break;\r\n                        case 'up':\r\n                            sequence.splice(j, 2, new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile(newTileNumber, i, j));\r\n                            break;\r\n                        case 'down':\r\n                            sequence.splice(j, 2, new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile(newTileNumber, i, 3 - j));\r\n                            break;\r\n                    };\r\n                    sequence.push(-1);\r\n                    this.addChild(sequence[j], 2);\r\n                    sequence[j].animationFusion();\r\n                };\r\n            };\r\n            this.updateTileField(i, sequence);\r\n        };\r\n    };\r\n\r\n    checkWin() {\r\n        return this.tileField.flat().some(x => x.number === 11);\r\n    };\r\n\r\n    checkGameOver() {\r\n        if (this.tileField.flat().every(x => x != -1)) {\r\n            for (let i = 0; i < 4; i++) {\r\n                for (let j = 0; j < 4; j++) {\r\n                    switch (this.tileField[i][j]?.number) {\r\n                        case ((i > 1) ? this.tileField[i - 1][j]?.number : null):\r\n                        case ((i < 3) ? this.tileField[i + 1][j]?.number : null):\r\n                        case ((j > 1) ? this.tileField[i][j - 1]?.number : null):  \r\n                        case ((j < 3) ? this.tileField[i][j + 1]?.number : null):\r\n                            return false;\r\n                    };\r\n                };\r\n            };\r\n            return true;\r\n        } else {\r\n            return false;\r\n        };\r\n    };\r\n\r\n    restart() {\r\n        cc.director.runScene(new _GameScene__WEBPACK_IMPORTED_MODULE_2__.GameScene());\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack:///./src/TileLayer.js?");

/***/ }),

/***/ "./src/assets.js":
/*!***********************!*\
  !*** ./src/assets.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ASSETS: () => (/* binding */ ASSETS)\n/* harmony export */ });\nconst ASSETS = [\"../assets/images/Field.png\", \r\n\"../assets/images/Sprite_2.png\",\r\n\"../assets/images/Sprite_4.png\",\r\n\"../assets/images/Sprite_8.png\",\r\n\"../assets/images/Sprite_16.png\",\r\n\"../assets/images/Sprite_32.png\",\r\n\"../assets/images/Sprite_64.png\",\r\n\"../assets/images/Sprite_128.png\",\r\n\"../assets/images/Sprite_256.png\",\r\n\"../assets/images/Sprite_512.png\",\r\n\"../assets/images/Sprite_1024.png\",\r\n\"../assets/images/Sprite_2048.png\",\r\n\"../assets/images/CountField.png\"\r\n]\r\n\n\n//# sourceURL=webpack:///./src/assets.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameScene */ \"./src/GameScene.js\");\n/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets */ \"./src/assets.js\");\nvar canvas = document.getElementById(\"canvas\");\r\nvar ctx = canvas.getContext(\"2d\");\r\n\r\n\r\n\r\nconst COCOS_CONFIG = {\r\n    \"debugMode\"     : 1,\r\n    \"showFPS\"       : false,\r\n    \"frameRate\"     : 60,\r\n    \"id\"            : \"canvas\",\r\n    \"jsList\"        : [],\r\n    \"renderMode\"    : 2,\r\n    \"platform\"      : 'mobile'\r\n};\r\n\r\nwindow.addEventListener(\"load\", function() {\r\n    cc.game.onStart = function() {\r\n        cc.LoaderScene.preload(_assets__WEBPACK_IMPORTED_MODULE_1__.ASSETS, function() {\r\n            cc.director.runScene( new _GameScene__WEBPACK_IMPORTED_MODULE_0__.GameScene() );\r\n        });\r\n    };\r\n    cc.game.run(COCOS_CONFIG);\r\n}) \r\n    \r\n    \r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/normalizedXY.js":
/*!*****************************!*\
  !*** ./src/normalizedXY.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   normXY: () => (/* binding */ normXY)\n/* harmony export */ });\nconst distBTWCentTilesX = 9 + 75;\r\nconst distBTWCentTilesY = 12 + 75;\r\n\r\nfunction normXY(x, y) {\r\n    return {\r\n        x: (x + 1) * distBTWCentTilesX - 75 / 2, \r\n        y: (3 - y + 1) * distBTWCentTilesY - 75 / 2\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack:///./src/normalizedXY.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;