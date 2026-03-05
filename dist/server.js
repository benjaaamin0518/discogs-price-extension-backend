/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/backend/NeonApi.ts":
/*!********************************!*\
  !*** ./src/backend/NeonApi.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NeonApi: () => (/* binding */ NeonApi)
/* harmony export */ });
/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ "@google/genai");
/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_google_genai__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

(__webpack_require__(/*! dotenv */ "dotenv").config)();
var NeonApi = /** @class */ (function () {
    function NeonApi() {
        this.genAI = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({
            apiKey: process.env.REACT_APP_GEMINI_API_KEY || "",
        });
        this.stealth = __webpack_require__(/*! puppeteer-extra-plugin-stealth */ "puppeteer-extra-plugin-stealth")();
    }
    NeonApi.prototype.gemini = function (title, description) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt, response, model, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prompt = "# Vinyl Record Metadata Extraction for Discogs Search\n\nYou are a vinyl record metadata extraction system used for Discogs search.\n\nExtract record information from marketplace listing data.\n\nYour output will be parsed by a JSON parser. Therefore the output **MUST be valid JSON**.\n\n## Output Restrictions\n\nDO NOT output:\n\n- Markdown\n- Code blocks\n- Any text before or after JSON\n\nReturn **ONLY a raw JSON object**.\n\n---\n\n# Input Fields\n\n## title\nListing title of the marketplace post.\n\n## description\nSeller description text.\n\n---\n\n# Important Concept\n\ncatalog_number is the **most important field**.\n\nA catalog number is usually a short code printed on the record label or sleeve.  \nIt is commonly used to identify releases on Discogs.\n\nExamples of catalog numbers:\n\nRKID004T  \nCRELP 076  \nFACT 75  \nL31450  \nRIPLP12  \nWIGLP123  \nXL1234  \nKRS123  \n\nCatalog numbers often:\n\n- contain capital letters and numbers\n- appear in the title of marketplace listings\n- appear after words like **\u578B\u756A**, **cat**, **cat no**, **catalog**\n\n---\n\n# Fields Definition\n\n## catalog_number\nThe label catalog number printed on the release.\n\nExtract it **EXACTLY as written**.\n\n---\n\n## matrix_number\n\nThe runout / matrix number etched in the vinyl.\n\n---\n\n## artist\n\nThe main artist name of the release.\n\n---\n\n## title\n\nThe title of the release.\n\n---\n\n## format\n\nReturn **Discogs-style format information as a comma-separated string**.\n\n### IMPORTANT\n\nDiscogs format values contain many variations.  \nTo ensure compatibility with Discogs search, the format values must follow **actual Discogs conventions**.\n\nWhen determining format:\n\n- Prefer values that commonly appear in **Discogs release data**\n- Avoid inventing new format strings\n- Only use **widely used Discogs format descriptors**\n\n---\n\n## Common Discogs Format Descriptors\n\n### Material\n\nVinyl\n\n### Size\n\n7\"  \n10\"  \n12\"\n\n### Speed\n\n33 \u2153 RPM  \n45 RPM\n\n### Release Type\n\nAlbum  \nSingle  \nEP  \nMaxi-Single\n\n### Audio Type\n\nStereo  \nMono\n\n---\n\n## Example Valid Discogs Format Strings\n\nVinyl, 12\", 33 \u2153 RPM, Album, Stereo  \nVinyl, 7\", 45 RPM, Single  \nVinyl, 12\", EP  \nVinyl, 12\", Maxi-Single  \nVinyl\n\n---\n\n## Normalization Guidelines\n\nIf the listing mentions:\n\nLP / 12\" / 7\" / EP / Record / \u30EC\u30B3\u30FC\u30C9  \n\u2192 include **\"Vinyl\"**\n\n### Size mapping\n\nLP \u2192 include **12\"**  \n12\" \u2192 include **12\"**  \n7\" \u2192 include **7\"**  \n10\" \u2192 include **10\"**\n\n### Speed mapping\n\n33rpm / 33 RPM \u2192 **33 \u2153 RPM**  \n45rpm / 45 RPM \u2192 **45 RPM**\n\n### Release type mapping\n\nsingle \u2192 **Single**  \nep \u2192 **EP**  \nalbum \u2192 **Album**\n\n### Audio type mapping\n\nstereo \u2192 **Stereo**  \nmono \u2192 **Mono**\n\n---\n\n## Format Order\n\nReturn values in this approximate order:\n\nMaterial \u2192 Size \u2192 Speed \u2192 Type \u2192 Audio\n\nExample:\n\nVinyl, 12\", 33 \u2153 RPM, Album, Stereo\n\n---\n\n## country\n\nCountry of release if explicitly mentioned.\n\n---\n\n## year\n\nRelease year if explicitly written.\n\n---\n\n## confidence\n\nA value between **0 and 1** representing how confident the extraction is.\n\n---\n\n# Extraction Priority (VERY IMPORTANT)\n\n1. catalog_number  \n2. artist  \n3. title  \n4. format  \n\n---\n\n# Rules\n\n- Analyze **BOTH title and description**\n- Always attempt to find a **catalog_number first**\n- If a pattern like RKID004T, CRELP076, FACT75 etc appears, treat it as **catalog_number**\n- Prefer values appearing in the **listing title**\n- When generating **format**, reference **typical Discogs format conventions**\n- Do **NOT guess values**\n- If a value is not found, return **null**\n- Ensure the result is **valid JSON before returning**\n\n---\n\n# Schema\n\n{\n  \"catalog_number\": string|null,\n  \"matrix_number\": string|null,\n  \"artist\": string|null,\n  \"title\": string|null,\n  \"format\": string|null,\n  \"country\": string|null,\n  \"year\": number|null,\n  \"confidence\": number\n}\n\n---\n\n# Input\n\ntitle:\n".concat(title, "\n\ndescription:\n").concat(description);
                        response = {
                            catalog_number: null,
                            matrix_number: null,
                            artist: null,
                            title: null,
                            format: null,
                            country: null,
                            year: null,
                            confidence: 0,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        model = "gemini-3-flash-preview";
                        // model = "gemini-2.0-flash";
                        console.log("Gemini実行");
                        return [4 /*yield*/, this.genAI.models.generateContent({
                                model: model,
                                contents: prompt,
                                config: {
                                    temperature: 1.0,
                                    thinkingConfig: {
                                        thinkingLevel: _google_genai__WEBPACK_IMPORTED_MODULE_0__.ThinkingLevel.LOW,
                                    },
                                },
                            })];
                    case 2:
                        result = _a.sent();
                        console.log(result.text);
                        response = JSON.parse(result.text || "{}");
                        return [2 /*return*/, response];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Gemini API error:", error_1);
                        return [2 /*return*/, response];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NeonApi.prototype.getDiscogsData = function (resourceIds) {
        return __awaiter(this, void 0, void 0, function () {
            var response, chromium, init;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = resourceIds.map(function (id) { return ({
                            resourceId: id,
                            lowest: null,
                            median: null,
                            highest: null,
                        }); });
                        chromium = (__webpack_require__(/*! playwright-extra */ "playwright-extra").chromium);
                        chromium.use(this.stealth);
                        init = function (resourceId) { return __awaiter(_this, void 0, void 0, function () {
                            var browser, page, blockImages, text;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, chromium.launch({ headless: true })];
                                    case 1:
                                        browser = _a.sent();
                                        return [4 /*yield*/, browser.newPage()];
                                    case 2:
                                        page = _a.sent();
                                        blockImages = function (route) {
                                            var type = route.request().resourceType();
                                            if (type === "image" ||
                                                type === "stylesheet" ||
                                                type === "font" ||
                                                type === "media") {
                                                route.abort();
                                            }
                                            else {
                                                route.continue();
                                            }
                                        };
                                        return [4 /*yield*/, page.route("**/*", blockImages)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, page.goto("https://www.discogs.com/sell/release/".concat(resourceId))];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, page.waitForSelector("#statistics")];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, page.$eval("#statistics ul.last", function (el) {
                                                var lis = el.querySelectorAll("li");
                                                var text = { lowest: "", median: "", highest: "" };
                                                lis.forEach(function (li, i) {
                                                    if (i >= 1 && i <= 3) {
                                                        var span = li.querySelector("span");
                                                        span.remove();
                                                        if (i === 1)
                                                            text.lowest = li.textContent.trim();
                                                        if (i === 2)
                                                            text.median = li.textContent.trim();
                                                        if (i === 3)
                                                            text.highest = li.textContent.trim();
                                                    }
                                                });
                                                return text;
                                            })];
                                    case 6:
                                        text = _a.sent();
                                        response[response.findIndex(function (r) { return r.resourceId === resourceId; })] = {
                                            resourceId: resourceId,
                                            lowest: text.lowest
                                                ? parseFloat(text.lowest.replace(/[^0-9.]/g, ""))
                                                : null,
                                            median: text.median
                                                ? parseFloat(text.median.replace(/[^0-9.]/g, ""))
                                                : null,
                                            highest: text.highest
                                                ? parseFloat(text.highest.replace(/[^0-9.]/g, ""))
                                                : null,
                                        };
                                        return [4 /*yield*/, browser.close()];
                                    case 7:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, Promise.all(resourceIds.map(function (id) { return init(id); }))];
                    case 1:
                        _a.sent();
                        console.log("Discogs data response:", response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return NeonApi;
}());



/***/ }),

/***/ "@google/genai":
/*!********************************!*\
  !*** external "@google/genai" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@google/genai");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "playwright-extra":
/*!***********************************!*\
  !*** external "playwright-extra" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("playwright-extra");

/***/ }),

/***/ "puppeteer-extra-plugin-stealth":
/*!*************************************************!*\
  !*** external "puppeteer-extra-plugin-stealth" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("puppeteer-extra-plugin-stealth");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/backend/server.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NeonApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NeonApi */ "./src/backend/NeonApi.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



(__webpack_require__(/*! dotenv */ "dotenv").config)();
var app = express__WEBPACK_IMPORTED_MODULE_0___default()();
var neonApi = new _NeonApi__WEBPACK_IMPORTED_MODULE_2__.NeonApi();
// CORSの設定
var corsOptions = {
    origin: process.env.REACT_APP_FRONTEND_URL, // フロントエンドのURLを環境変数から取得
    method: [],
};
// CORS設定とJSONパーサーをミドルウェアとして適用
app.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());
app.options("*", cors__WEBPACK_IMPORTED_MODULE_1___default()());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default().json({ limit: "10mb" }));
// ログイン認証を行う(成功時アクセストークンを返却する)
app.post("/api/v1/gemini", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Received request:", req.body);
                if (req.body.accessToken !== process.env.VITE_ACCESS_TOKEN) {
                    res.status(401).json({
                        error: "Invalid access token",
                        status: 401,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, neonApi.gemini(req.body.title, req.body.description)];
            case 1:
                result = _a.sent();
                // ユーザー情報とトークンをクライアントに返す
                res.status(200).json({
                    status: 200, // ステータスコード
                    result: result,
                });
                return [2 /*return*/];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({
                    error: error_1.message,
                    status: 500, // ステータスコード
                });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/api/v1/discogsData", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Received request for discogs data:", req.body);
                if (req.body.accessToken !== process.env.VITE_ACCESS_TOKEN) {
                    res.status(401).json({
                        error: "Invalid access token",
                        status: 401,
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, neonApi.getDiscogsData(req.body.resourceIds)];
            case 1:
                result = _a.sent();
                // ユーザー情報とトークンをクライアントに返す
                res.status(200).json({
                    status: 200, // ステータスコード
                    result: result,
                });
                return [2 /*return*/];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({
                    error: error_2.message,
                    status: 500, // ステータスコード
                });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(4200, function () {
    console.log("port ".concat(4200, " \u3067\u30B5\u30FC\u30D0\u30FC\u8D77\u52D5\u4E2D"));
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDJDQUFJO0FBQ3JCLFFBQVEsbURBQVksR0FBRyxlQUFlO0FBQ3RDO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsSUFBSTtBQUNMLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLElBQUk7QUFDTDtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RlYnQtZGFzaGJvYXJkLy4vc3JjL2JhY2tlbmQvTmVvbkFwaS50cyIsIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC9leHRlcm5hbCBjb21tb25qcyBcIkBnb29nbGUvZ2VuYWlcIiIsIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC9leHRlcm5hbCBjb21tb25qcyBcImNvcnNcIiIsIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2RlYnQtZGFzaGJvYXJkL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL2RlYnQtZGFzaGJvYXJkL2V4dGVybmFsIGNvbW1vbmpzIFwicGxheXdyaWdodC1leHRyYVwiIiwid2VicGFjazovL2RlYnQtZGFzaGJvYXJkL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1zdGVhbHRoXCIiLCJ3ZWJwYWNrOi8vZGVidC1kYXNoYm9hcmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGVidC1kYXNoYm9hcmQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZGVidC1kYXNoYm9hcmQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RlYnQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZGVidC1kYXNoYm9hcmQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC8uL3NyYy9iYWNrZW5kL3NlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgR29vZ2xlR2VuQUksIFRoaW5raW5nTGV2ZWwgfSBmcm9tIFwiQGdvb2dsZS9nZW5haVwiO1xucmVxdWlyZShcImRvdGVudlwiKS5jb25maWcoKTtcbnZhciBOZW9uQXBpID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5lb25BcGkoKSB7XG4gICAgICAgIHRoaXMuZ2VuQUkgPSBuZXcgR29vZ2xlR2VuQUkoe1xuICAgICAgICAgICAgYXBpS2V5OiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfR0VNSU5JX0FQSV9LRVkgfHwgXCJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RlYWx0aCA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGhcIikoKTtcbiAgICB9XG4gICAgTmVvbkFwaS5wcm90b3R5cGUuZ2VtaW5pID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJvbXB0LCByZXNwb25zZSwgbW9kZWwsIHJlc3VsdCwgZXJyb3JfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdCA9IFwiIyBWaW55bCBSZWNvcmQgTWV0YWRhdGEgRXh0cmFjdGlvbiBmb3IgRGlzY29ncyBTZWFyY2hcXG5cXG5Zb3UgYXJlIGEgdmlueWwgcmVjb3JkIG1ldGFkYXRhIGV4dHJhY3Rpb24gc3lzdGVtIHVzZWQgZm9yIERpc2NvZ3Mgc2VhcmNoLlxcblxcbkV4dHJhY3QgcmVjb3JkIGluZm9ybWF0aW9uIGZyb20gbWFya2V0cGxhY2UgbGlzdGluZyBkYXRhLlxcblxcbllvdXIgb3V0cHV0IHdpbGwgYmUgcGFyc2VkIGJ5IGEgSlNPTiBwYXJzZXIuIFRoZXJlZm9yZSB0aGUgb3V0cHV0ICoqTVVTVCBiZSB2YWxpZCBKU09OKiouXFxuXFxuIyMgT3V0cHV0IFJlc3RyaWN0aW9uc1xcblxcbkRPIE5PVCBvdXRwdXQ6XFxuXFxuLSBNYXJrZG93blxcbi0gQ29kZSBibG9ja3NcXG4tIEFueSB0ZXh0IGJlZm9yZSBvciBhZnRlciBKU09OXFxuXFxuUmV0dXJuICoqT05MWSBhIHJhdyBKU09OIG9iamVjdCoqLlxcblxcbi0tLVxcblxcbiMgSW5wdXQgRmllbGRzXFxuXFxuIyMgdGl0bGVcXG5MaXN0aW5nIHRpdGxlIG9mIHRoZSBtYXJrZXRwbGFjZSBwb3N0LlxcblxcbiMjIGRlc2NyaXB0aW9uXFxuU2VsbGVyIGRlc2NyaXB0aW9uIHRleHQuXFxuXFxuLS0tXFxuXFxuIyBJbXBvcnRhbnQgQ29uY2VwdFxcblxcbmNhdGFsb2dfbnVtYmVyIGlzIHRoZSAqKm1vc3QgaW1wb3J0YW50IGZpZWxkKiouXFxuXFxuQSBjYXRhbG9nIG51bWJlciBpcyB1c3VhbGx5IGEgc2hvcnQgY29kZSBwcmludGVkIG9uIHRoZSByZWNvcmQgbGFiZWwgb3Igc2xlZXZlLiAgXFxuSXQgaXMgY29tbW9ubHkgdXNlZCB0byBpZGVudGlmeSByZWxlYXNlcyBvbiBEaXNjb2dzLlxcblxcbkV4YW1wbGVzIG9mIGNhdGFsb2cgbnVtYmVyczpcXG5cXG5SS0lEMDA0VCAgXFxuQ1JFTFAgMDc2ICBcXG5GQUNUIDc1ICBcXG5MMzE0NTAgIFxcblJJUExQMTIgIFxcbldJR0xQMTIzICBcXG5YTDEyMzQgIFxcbktSUzEyMyAgXFxuXFxuQ2F0YWxvZyBudW1iZXJzIG9mdGVuOlxcblxcbi0gY29udGFpbiBjYXBpdGFsIGxldHRlcnMgYW5kIG51bWJlcnNcXG4tIGFwcGVhciBpbiB0aGUgdGl0bGUgb2YgbWFya2V0cGxhY2UgbGlzdGluZ3NcXG4tIGFwcGVhciBhZnRlciB3b3JkcyBsaWtlICoqXFx1NTc4QlxcdTc1NkEqKiwgKipjYXQqKiwgKipjYXQgbm8qKiwgKipjYXRhbG9nKipcXG5cXG4tLS1cXG5cXG4jIEZpZWxkcyBEZWZpbml0aW9uXFxuXFxuIyMgY2F0YWxvZ19udW1iZXJcXG5UaGUgbGFiZWwgY2F0YWxvZyBudW1iZXIgcHJpbnRlZCBvbiB0aGUgcmVsZWFzZS5cXG5cXG5FeHRyYWN0IGl0ICoqRVhBQ1RMWSBhcyB3cml0dGVuKiouXFxuXFxuLS0tXFxuXFxuIyMgbWF0cml4X251bWJlclxcblxcblRoZSBydW5vdXQgLyBtYXRyaXggbnVtYmVyIGV0Y2hlZCBpbiB0aGUgdmlueWwuXFxuXFxuLS0tXFxuXFxuIyMgYXJ0aXN0XFxuXFxuVGhlIG1haW4gYXJ0aXN0IG5hbWUgb2YgdGhlIHJlbGVhc2UuXFxuXFxuLS0tXFxuXFxuIyMgdGl0bGVcXG5cXG5UaGUgdGl0bGUgb2YgdGhlIHJlbGVhc2UuXFxuXFxuLS0tXFxuXFxuIyMgZm9ybWF0XFxuXFxuUmV0dXJuICoqRGlzY29ncy1zdHlsZSBmb3JtYXQgaW5mb3JtYXRpb24gYXMgYSBjb21tYS1zZXBhcmF0ZWQgc3RyaW5nKiouXFxuXFxuIyMjIElNUE9SVEFOVFxcblxcbkRpc2NvZ3MgZm9ybWF0IHZhbHVlcyBjb250YWluIG1hbnkgdmFyaWF0aW9ucy4gIFxcblRvIGVuc3VyZSBjb21wYXRpYmlsaXR5IHdpdGggRGlzY29ncyBzZWFyY2gsIHRoZSBmb3JtYXQgdmFsdWVzIG11c3QgZm9sbG93ICoqYWN0dWFsIERpc2NvZ3MgY29udmVudGlvbnMqKi5cXG5cXG5XaGVuIGRldGVybWluaW5nIGZvcm1hdDpcXG5cXG4tIFByZWZlciB2YWx1ZXMgdGhhdCBjb21tb25seSBhcHBlYXIgaW4gKipEaXNjb2dzIHJlbGVhc2UgZGF0YSoqXFxuLSBBdm9pZCBpbnZlbnRpbmcgbmV3IGZvcm1hdCBzdHJpbmdzXFxuLSBPbmx5IHVzZSAqKndpZGVseSB1c2VkIERpc2NvZ3MgZm9ybWF0IGRlc2NyaXB0b3JzKipcXG5cXG4tLS1cXG5cXG4jIyBDb21tb24gRGlzY29ncyBGb3JtYXQgRGVzY3JpcHRvcnNcXG5cXG4jIyMgTWF0ZXJpYWxcXG5cXG5WaW55bFxcblxcbiMjIyBTaXplXFxuXFxuN1xcXCIgIFxcbjEwXFxcIiAgXFxuMTJcXFwiXFxuXFxuIyMjIFNwZWVkXFxuXFxuMzMgXFx1MjE1MyBSUE0gIFxcbjQ1IFJQTVxcblxcbiMjIyBSZWxlYXNlIFR5cGVcXG5cXG5BbGJ1bSAgXFxuU2luZ2xlICBcXG5FUCAgXFxuTWF4aS1TaW5nbGVcXG5cXG4jIyMgQXVkaW8gVHlwZVxcblxcblN0ZXJlbyAgXFxuTW9ub1xcblxcbi0tLVxcblxcbiMjIEV4YW1wbGUgVmFsaWQgRGlzY29ncyBGb3JtYXQgU3RyaW5nc1xcblxcblZpbnlsLCAxMlxcXCIsIDMzIFxcdTIxNTMgUlBNLCBBbGJ1bSwgU3RlcmVvICBcXG5WaW55bCwgN1xcXCIsIDQ1IFJQTSwgU2luZ2xlICBcXG5WaW55bCwgMTJcXFwiLCBFUCAgXFxuVmlueWwsIDEyXFxcIiwgTWF4aS1TaW5nbGUgIFxcblZpbnlsXFxuXFxuLS0tXFxuXFxuIyMgTm9ybWFsaXphdGlvbiBHdWlkZWxpbmVzXFxuXFxuSWYgdGhlIGxpc3RpbmcgbWVudGlvbnM6XFxuXFxuTFAgLyAxMlxcXCIgLyA3XFxcIiAvIEVQIC8gUmVjb3JkIC8gXFx1MzBFQ1xcdTMwQjNcXHUzMEZDXFx1MzBDOSAgXFxuXFx1MjE5MiBpbmNsdWRlICoqXFxcIlZpbnlsXFxcIioqXFxuXFxuIyMjIFNpemUgbWFwcGluZ1xcblxcbkxQIFxcdTIxOTIgaW5jbHVkZSAqKjEyXFxcIioqICBcXG4xMlxcXCIgXFx1MjE5MiBpbmNsdWRlICoqMTJcXFwiKiogIFxcbjdcXFwiIFxcdTIxOTIgaW5jbHVkZSAqKjdcXFwiKiogIFxcbjEwXFxcIiBcXHUyMTkyIGluY2x1ZGUgKioxMFxcXCIqKlxcblxcbiMjIyBTcGVlZCBtYXBwaW5nXFxuXFxuMzNycG0gLyAzMyBSUE0gXFx1MjE5MiAqKjMzIFxcdTIxNTMgUlBNKiogIFxcbjQ1cnBtIC8gNDUgUlBNIFxcdTIxOTIgKio0NSBSUE0qKlxcblxcbiMjIyBSZWxlYXNlIHR5cGUgbWFwcGluZ1xcblxcbnNpbmdsZSBcXHUyMTkyICoqU2luZ2xlKiogIFxcbmVwIFxcdTIxOTIgKipFUCoqICBcXG5hbGJ1bSBcXHUyMTkyICoqQWxidW0qKlxcblxcbiMjIyBBdWRpbyB0eXBlIG1hcHBpbmdcXG5cXG5zdGVyZW8gXFx1MjE5MiAqKlN0ZXJlbyoqICBcXG5tb25vIFxcdTIxOTIgKipNb25vKipcXG5cXG4tLS1cXG5cXG4jIyBGb3JtYXQgT3JkZXJcXG5cXG5SZXR1cm4gdmFsdWVzIGluIHRoaXMgYXBwcm94aW1hdGUgb3JkZXI6XFxuXFxuTWF0ZXJpYWwgXFx1MjE5MiBTaXplIFxcdTIxOTIgU3BlZWQgXFx1MjE5MiBUeXBlIFxcdTIxOTIgQXVkaW9cXG5cXG5FeGFtcGxlOlxcblxcblZpbnlsLCAxMlxcXCIsIDMzIFxcdTIxNTMgUlBNLCBBbGJ1bSwgU3RlcmVvXFxuXFxuLS0tXFxuXFxuIyMgY291bnRyeVxcblxcbkNvdW50cnkgb2YgcmVsZWFzZSBpZiBleHBsaWNpdGx5IG1lbnRpb25lZC5cXG5cXG4tLS1cXG5cXG4jIyB5ZWFyXFxuXFxuUmVsZWFzZSB5ZWFyIGlmIGV4cGxpY2l0bHkgd3JpdHRlbi5cXG5cXG4tLS1cXG5cXG4jIyBjb25maWRlbmNlXFxuXFxuQSB2YWx1ZSBiZXR3ZWVuICoqMCBhbmQgMSoqIHJlcHJlc2VudGluZyBob3cgY29uZmlkZW50IHRoZSBleHRyYWN0aW9uIGlzLlxcblxcbi0tLVxcblxcbiMgRXh0cmFjdGlvbiBQcmlvcml0eSAoVkVSWSBJTVBPUlRBTlQpXFxuXFxuMS4gY2F0YWxvZ19udW1iZXIgIFxcbjIuIGFydGlzdCAgXFxuMy4gdGl0bGUgIFxcbjQuIGZvcm1hdCAgXFxuXFxuLS0tXFxuXFxuIyBSdWxlc1xcblxcbi0gQW5hbHl6ZSAqKkJPVEggdGl0bGUgYW5kIGRlc2NyaXB0aW9uKipcXG4tIEFsd2F5cyBhdHRlbXB0IHRvIGZpbmQgYSAqKmNhdGFsb2dfbnVtYmVyIGZpcnN0KipcXG4tIElmIGEgcGF0dGVybiBsaWtlIFJLSUQwMDRULCBDUkVMUDA3NiwgRkFDVDc1IGV0YyBhcHBlYXJzLCB0cmVhdCBpdCBhcyAqKmNhdGFsb2dfbnVtYmVyKipcXG4tIFByZWZlciB2YWx1ZXMgYXBwZWFyaW5nIGluIHRoZSAqKmxpc3RpbmcgdGl0bGUqKlxcbi0gV2hlbiBnZW5lcmF0aW5nICoqZm9ybWF0KiosIHJlZmVyZW5jZSAqKnR5cGljYWwgRGlzY29ncyBmb3JtYXQgY29udmVudGlvbnMqKlxcbi0gRG8gKipOT1QgZ3Vlc3MgdmFsdWVzKipcXG4tIElmIGEgdmFsdWUgaXMgbm90IGZvdW5kLCByZXR1cm4gKipudWxsKipcXG4tIEVuc3VyZSB0aGUgcmVzdWx0IGlzICoqdmFsaWQgSlNPTiBiZWZvcmUgcmV0dXJuaW5nKipcXG5cXG4tLS1cXG5cXG4jIFNjaGVtYVxcblxcbntcXG4gIFxcXCJjYXRhbG9nX251bWJlclxcXCI6IHN0cmluZ3xudWxsLFxcbiAgXFxcIm1hdHJpeF9udW1iZXJcXFwiOiBzdHJpbmd8bnVsbCxcXG4gIFxcXCJhcnRpc3RcXFwiOiBzdHJpbmd8bnVsbCxcXG4gIFxcXCJ0aXRsZVxcXCI6IHN0cmluZ3xudWxsLFxcbiAgXFxcImZvcm1hdFxcXCI6IHN0cmluZ3xudWxsLFxcbiAgXFxcImNvdW50cnlcXFwiOiBzdHJpbmd8bnVsbCxcXG4gIFxcXCJ5ZWFyXFxcIjogbnVtYmVyfG51bGwsXFxuICBcXFwiY29uZmlkZW5jZVxcXCI6IG51bWJlclxcbn1cXG5cXG4tLS1cXG5cXG4jIElucHV0XFxuXFxudGl0bGU6XFxuXCIuY29uY2F0KHRpdGxlLCBcIlxcblxcbmRlc2NyaXB0aW9uOlxcblwiKS5jb25jYXQoZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0YWxvZ19udW1iZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0cml4X251bWJlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnRpc3Q6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsID0gXCJnZW1pbmktMy1mbGFzaC1wcmV2aWV3XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RlbCA9IFwiZ2VtaW5pLTIuMC1mbGFzaFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZW1pbmnlrp/ooYxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdlbkFJLm1vZGVscy5nZW5lcmF0ZUNvbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBwcm9tcHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IDEuMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaW5raW5nQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpbmtpbmdMZXZlbDogVGhpbmtpbmdMZXZlbC5MT1csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3VsdC50ZXh0IHx8IFwie31cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkdlbWluaSBBUEkgZXJyb3I6XCIsIGVycm9yXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTmVvbkFwaS5wcm90b3R5cGUuZ2V0RGlzY29nc0RhdGEgPSBmdW5jdGlvbiAocmVzb3VyY2VJZHMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBjaHJvbWl1bSwgaW5pdDtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc291cmNlSWRzLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lZGlhbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21pdW0gPSByZXF1aXJlKFwicGxheXdyaWdodC1leHRyYVwiKS5jaHJvbWl1bTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocm9taXVtLnVzZSh0aGlzLnN0ZWFsdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdCA9IGZ1bmN0aW9uIChyZXNvdXJjZUlkKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJyb3dzZXIsIHBhZ2UsIGJsb2NrSW1hZ2VzLCB0ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBjaHJvbWl1bS5sYXVuY2goeyBoZWFkbGVzczogdHJ1ZSB9KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3NlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBicm93c2VyLm5ld1BhZ2UoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja0ltYWdlcyA9IGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJvdXRlLnJlcXVlc3QoKS5yZXNvdXJjZVR5cGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiaW1hZ2VcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9PT0gXCJzdHlsZXNoZWV0XCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPT09IFwiZm9udFwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID09PSBcIm1lZGlhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZS5jb250aW51ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBwYWdlLnJvdXRlKFwiKiovKlwiLCBibG9ja0ltYWdlcyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBwYWdlLmdvdG8oXCJodHRwczovL3d3dy5kaXNjb2dzLmNvbS9zZWxsL3JlbGVhc2UvXCIuY29uY2F0KHJlc291cmNlSWQpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiI3N0YXRpc3RpY3NcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBwYWdlLiRldmFsKFwiI3N0YXRpc3RpY3MgdWwubGFzdFwiLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHsgbG93ZXN0OiBcIlwiLCBtZWRpYW46IFwiXCIsIGhpZ2hlc3Q6IFwiXCIgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpcy5mb3JFYWNoKGZ1bmN0aW9uIChsaSwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID49IDEgJiYgaSA8PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcGFuID0gbGkucXVlcnlTZWxlY3RvcihcInNwYW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC5sb3dlc3QgPSBsaS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC5tZWRpYW4gPSBsaS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC5oaWdoZXN0ID0gbGkudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlW3Jlc3BvbnNlLmZpbmRJbmRleChmdW5jdGlvbiAocikgeyByZXR1cm4gci5yZXNvdXJjZUlkID09PSByZXNvdXJjZUlkOyB9KV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdDogdGV4dC5sb3dlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcGFyc2VGbG9hdCh0ZXh0Lmxvd2VzdC5yZXBsYWNlKC9bXjAtOS5dL2csIFwiXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpYW46IHRleHQubWVkaWFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlRmxvYXQodGV4dC5tZWRpYW4ucmVwbGFjZSgvW14wLTkuXS9nLCBcIlwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdDogdGV4dC5oaWdoZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlRmxvYXQodGV4dC5oaWdoZXN0LnJlcGxhY2UoL1teMC05Ll0vZywgXCJcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBicm93c2VyLmNsb3NlKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgUHJvbWlzZS5hbGwocmVzb3VyY2VJZHMubWFwKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gaW5pdChpZCk7IH0pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlzY29ncyBkYXRhIHJlc3BvbnNlOlwiLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBOZW9uQXBpO1xufSgpKTtcbmV4cG9ydCB7IE5lb25BcGkgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBnb29nbGUvZ2VuYWlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwbGF5d3JpZ2h0LWV4dHJhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYS1wbHVnaW4tc3RlYWx0aFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xuaW1wb3J0IHsgTmVvbkFwaSB9IGZyb20gXCIuL05lb25BcGlcIjtcbnJlcXVpcmUoXCJkb3RlbnZcIikuY29uZmlnKCk7XG52YXIgYXBwID0gZXhwcmVzcygpO1xudmFyIG5lb25BcGkgPSBuZXcgTmVvbkFwaSgpO1xuLy8gQ09SU+OBruioreWumlxudmFyIGNvcnNPcHRpb25zID0ge1xuICAgIG9yaWdpbjogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0ZST05URU5EX1VSTCwgLy8g44OV44Ot44Oz44OI44Ko44Oz44OJ44GuVVJM44KS55Kw5aKD5aSJ5pWw44GL44KJ5Y+W5b6XXG4gICAgbWV0aG9kOiBbXSxcbn07XG4vLyBDT1JT6Kit5a6a44GoSlNPTuODkeODvOOCteODvOOCkuODn+ODieODq+OCpuOCp+OCouOBqOOBl+OBpumBqeeUqFxuYXBwLnVzZShjb3JzKCkpO1xuYXBwLm9wdGlvbnMoXCIqXCIsIGNvcnMoKSk7XG5hcHAudXNlKGV4cHJlc3MuanNvbih7IGxpbWl0OiBcIjEwbWJcIiB9KSk7XG4vLyDjg63jgrDjgqTjg7Poqo3oqLzjgpLooYzjgYYo5oiQ5Yqf5pmC44Ki44Kv44K744K544OI44O844Kv44Oz44KS6L+U5Y2044GZ44KLKVxuYXBwLnBvc3QoXCIvYXBpL3YxL2dlbWluaVwiLCBmdW5jdGlvbiAocmVxLCByZXMpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCwgZXJyb3JfMTtcbiAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDIsICwgM10pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVjZWl2ZWQgcmVxdWVzdDpcIiwgcmVxLmJvZHkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXEuYm9keS5hY2Nlc3NUb2tlbiAhPT0gcHJvY2Vzcy5lbnYuVklURV9BQ0NFU1NfVE9LRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiSW52YWxpZCBhY2Nlc3MgdG9rZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBuZW9uQXBpLmdlbWluaShyZXEuYm9keS50aXRsZSwgcmVxLmJvZHkuZGVzY3JpcHRpb24pXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgLy8g44Om44O844K244O85oOF5aCx44Go44OI44O844Kv44Oz44KS44Kv44Op44Kk44Ki44Oz44OI44Gr6L+U44GZXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCwgLy8g44K544OG44O844K/44K544Kz44O844OJXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXzEubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiA1MDAsIC8vIOOCueODhuODvOOCv+OCueOCs+ODvOODiVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfSk7XG5hcHAucG9zdChcIi9hcGkvdjEvZGlzY29nc0RhdGFcIiwgZnVuY3Rpb24gKHJlcSwgcmVzKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQsIGVycm9yXzI7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIHJlcXVlc3QgZm9yIGRpc2NvZ3MgZGF0YTpcIiwgcmVxLmJvZHkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXEuYm9keS5hY2Nlc3NUb2tlbiAhPT0gcHJvY2Vzcy5lbnYuVklURV9BQ0NFU1NfVE9LRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiSW52YWxpZCBhY2Nlc3MgdG9rZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogNDAxLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBuZW9uQXBpLmdldERpc2NvZ3NEYXRhKHJlcS5ib2R5LnJlc291cmNlSWRzKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIC8vIOODpuODvOOCtuODvOaDheWgseOBqOODiOODvOOCr+ODs+OCkuOCr+ODqeOCpOOCouODs+ODiOOBq+i/lOOBmVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsIC8vIOOCueODhuODvOOCv+OCueOCs+ODvOODiVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZXJyb3JfMiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcl8yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogNTAwLCAvLyDjgrnjg4bjg7zjgr/jgrnjgrPjg7zjg4lcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH0pO1xuYXBwLmxpc3Rlbig0MjAwLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coXCJwb3J0IFwiLmNvbmNhdCg0MjAwLCBcIiBcXHUzMDY3XFx1MzBCNVxcdTMwRkNcXHUzMEQwXFx1MzBGQ1xcdThENzdcXHU1MkQ1XFx1NEUyRFwiKSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==