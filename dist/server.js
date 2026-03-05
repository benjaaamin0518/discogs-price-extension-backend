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
                            var browser, page, blockImages, text, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 8, , 9]);
                                        return [4 /*yield*/, chromium.launch({
                                                headless: true,
                                                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                                            })];
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
                                        return [3 /*break*/, 9];
                                    case 8:
                                        error_2 = _a.sent();
                                        console.error("Error fetching data for resourceId ".concat(resourceId, ":"), error_2);
                                        return [3 /*break*/, 9];
                                    case 9: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyQ0FBSTtBQUNaLGlCQUFpQiwyQ0FBSTtBQUNyQixRQUFRLG1EQUFZLEdBQUcsZUFBZTtBQUN0QztBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLElBQUk7QUFDTCxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJQUFJO0FBQ0w7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC8uL3NyYy9iYWNrZW5kL05lb25BcGkudHMiLCJ3ZWJwYWNrOi8vZGVidC1kYXNoYm9hcmQvZXh0ZXJuYWwgY29tbW9uanMgXCJAZ29vZ2xlL2dlbmFpXCIiLCJ3ZWJwYWNrOi8vZGVidC1kYXNoYm9hcmQvZXh0ZXJuYWwgY29tbW9uanMgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vZGVidC1kYXNoYm9hcmQvZXh0ZXJuYWwgY29tbW9uanMgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC9leHRlcm5hbCBjb21tb25qcyBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC9leHRlcm5hbCBjb21tb25qcyBcInBsYXl3cmlnaHQtZXh0cmFcIiIsIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1leHRyYS1wbHVnaW4tc3RlYWx0aFwiIiwid2VicGFjazovL2RlYnQtZGFzaGJvYXJkL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RlYnQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2RlYnQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kZWJ0LWRhc2hib2FyZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RlYnQtZGFzaGJvYXJkL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZGVidC1kYXNoYm9hcmQvLi9zcmMvYmFja2VuZC9zZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCB7IEdvb2dsZUdlbkFJLCBUaGlua2luZ0xldmVsIH0gZnJvbSBcIkBnb29nbGUvZ2VuYWlcIjtcbnJlcXVpcmUoXCJkb3RlbnZcIikuY29uZmlnKCk7XG52YXIgTmVvbkFwaSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOZW9uQXBpKCkge1xuICAgICAgICB0aGlzLmdlbkFJID0gbmV3IEdvb2dsZUdlbkFJKHtcbiAgICAgICAgICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0dFTUlOSV9BUElfS0VZIHx8IFwiXCIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0ZWFsdGggPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1zdGVhbHRoXCIpKCk7XG4gICAgfVxuICAgIE5lb25BcGkucHJvdG90eXBlLmdlbWluaSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHByb21wdCwgcmVzcG9uc2UsIG1vZGVsLCByZXN1bHQsIGVycm9yXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHQgPSBcIiMgVmlueWwgUmVjb3JkIE1ldGFkYXRhIEV4dHJhY3Rpb24gZm9yIERpc2NvZ3MgU2VhcmNoXFxuXFxuWW91IGFyZSBhIHZpbnlsIHJlY29yZCBtZXRhZGF0YSBleHRyYWN0aW9uIHN5c3RlbSB1c2VkIGZvciBEaXNjb2dzIHNlYXJjaC5cXG5cXG5FeHRyYWN0IHJlY29yZCBpbmZvcm1hdGlvbiBmcm9tIG1hcmtldHBsYWNlIGxpc3RpbmcgZGF0YS5cXG5cXG5Zb3VyIG91dHB1dCB3aWxsIGJlIHBhcnNlZCBieSBhIEpTT04gcGFyc2VyLiBUaGVyZWZvcmUgdGhlIG91dHB1dCAqKk1VU1QgYmUgdmFsaWQgSlNPTioqLlxcblxcbiMjIE91dHB1dCBSZXN0cmljdGlvbnNcXG5cXG5ETyBOT1Qgb3V0cHV0Olxcblxcbi0gTWFya2Rvd25cXG4tIENvZGUgYmxvY2tzXFxuLSBBbnkgdGV4dCBiZWZvcmUgb3IgYWZ0ZXIgSlNPTlxcblxcblJldHVybiAqKk9OTFkgYSByYXcgSlNPTiBvYmplY3QqKi5cXG5cXG4tLS1cXG5cXG4jIElucHV0IEZpZWxkc1xcblxcbiMjIHRpdGxlXFxuTGlzdGluZyB0aXRsZSBvZiB0aGUgbWFya2V0cGxhY2UgcG9zdC5cXG5cXG4jIyBkZXNjcmlwdGlvblxcblNlbGxlciBkZXNjcmlwdGlvbiB0ZXh0Llxcblxcbi0tLVxcblxcbiMgSW1wb3J0YW50IENvbmNlcHRcXG5cXG5jYXRhbG9nX251bWJlciBpcyB0aGUgKiptb3N0IGltcG9ydGFudCBmaWVsZCoqLlxcblxcbkEgY2F0YWxvZyBudW1iZXIgaXMgdXN1YWxseSBhIHNob3J0IGNvZGUgcHJpbnRlZCBvbiB0aGUgcmVjb3JkIGxhYmVsIG9yIHNsZWV2ZS4gIFxcbkl0IGlzIGNvbW1vbmx5IHVzZWQgdG8gaWRlbnRpZnkgcmVsZWFzZXMgb24gRGlzY29ncy5cXG5cXG5FeGFtcGxlcyBvZiBjYXRhbG9nIG51bWJlcnM6XFxuXFxuUktJRDAwNFQgIFxcbkNSRUxQIDA3NiAgXFxuRkFDVCA3NSAgXFxuTDMxNDUwICBcXG5SSVBMUDEyICBcXG5XSUdMUDEyMyAgXFxuWEwxMjM0ICBcXG5LUlMxMjMgIFxcblxcbkNhdGFsb2cgbnVtYmVycyBvZnRlbjpcXG5cXG4tIGNvbnRhaW4gY2FwaXRhbCBsZXR0ZXJzIGFuZCBudW1iZXJzXFxuLSBhcHBlYXIgaW4gdGhlIHRpdGxlIG9mIG1hcmtldHBsYWNlIGxpc3RpbmdzXFxuLSBhcHBlYXIgYWZ0ZXIgd29yZHMgbGlrZSAqKlxcdTU3OEJcXHU3NTZBKiosICoqY2F0KiosICoqY2F0IG5vKiosICoqY2F0YWxvZyoqXFxuXFxuLS0tXFxuXFxuIyBGaWVsZHMgRGVmaW5pdGlvblxcblxcbiMjIGNhdGFsb2dfbnVtYmVyXFxuVGhlIGxhYmVsIGNhdGFsb2cgbnVtYmVyIHByaW50ZWQgb24gdGhlIHJlbGVhc2UuXFxuXFxuRXh0cmFjdCBpdCAqKkVYQUNUTFkgYXMgd3JpdHRlbioqLlxcblxcbi0tLVxcblxcbiMjIG1hdHJpeF9udW1iZXJcXG5cXG5UaGUgcnVub3V0IC8gbWF0cml4IG51bWJlciBldGNoZWQgaW4gdGhlIHZpbnlsLlxcblxcbi0tLVxcblxcbiMjIGFydGlzdFxcblxcblRoZSBtYWluIGFydGlzdCBuYW1lIG9mIHRoZSByZWxlYXNlLlxcblxcbi0tLVxcblxcbiMjIHRpdGxlXFxuXFxuVGhlIHRpdGxlIG9mIHRoZSByZWxlYXNlLlxcblxcbi0tLVxcblxcbiMjIGZvcm1hdFxcblxcblJldHVybiAqKkRpc2NvZ3Mtc3R5bGUgZm9ybWF0IGluZm9ybWF0aW9uIGFzIGEgY29tbWEtc2VwYXJhdGVkIHN0cmluZyoqLlxcblxcbiMjIyBJTVBPUlRBTlRcXG5cXG5EaXNjb2dzIGZvcm1hdCB2YWx1ZXMgY29udGFpbiBtYW55IHZhcmlhdGlvbnMuICBcXG5UbyBlbnN1cmUgY29tcGF0aWJpbGl0eSB3aXRoIERpc2NvZ3Mgc2VhcmNoLCB0aGUgZm9ybWF0IHZhbHVlcyBtdXN0IGZvbGxvdyAqKmFjdHVhbCBEaXNjb2dzIGNvbnZlbnRpb25zKiouXFxuXFxuV2hlbiBkZXRlcm1pbmluZyBmb3JtYXQ6XFxuXFxuLSBQcmVmZXIgdmFsdWVzIHRoYXQgY29tbW9ubHkgYXBwZWFyIGluICoqRGlzY29ncyByZWxlYXNlIGRhdGEqKlxcbi0gQXZvaWQgaW52ZW50aW5nIG5ldyBmb3JtYXQgc3RyaW5nc1xcbi0gT25seSB1c2UgKip3aWRlbHkgdXNlZCBEaXNjb2dzIGZvcm1hdCBkZXNjcmlwdG9ycyoqXFxuXFxuLS0tXFxuXFxuIyMgQ29tbW9uIERpc2NvZ3MgRm9ybWF0IERlc2NyaXB0b3JzXFxuXFxuIyMjIE1hdGVyaWFsXFxuXFxuVmlueWxcXG5cXG4jIyMgU2l6ZVxcblxcbjdcXFwiICBcXG4xMFxcXCIgIFxcbjEyXFxcIlxcblxcbiMjIyBTcGVlZFxcblxcbjMzIFxcdTIxNTMgUlBNICBcXG40NSBSUE1cXG5cXG4jIyMgUmVsZWFzZSBUeXBlXFxuXFxuQWxidW0gIFxcblNpbmdsZSAgXFxuRVAgIFxcbk1heGktU2luZ2xlXFxuXFxuIyMjIEF1ZGlvIFR5cGVcXG5cXG5TdGVyZW8gIFxcbk1vbm9cXG5cXG4tLS1cXG5cXG4jIyBFeGFtcGxlIFZhbGlkIERpc2NvZ3MgRm9ybWF0IFN0cmluZ3NcXG5cXG5WaW55bCwgMTJcXFwiLCAzMyBcXHUyMTUzIFJQTSwgQWxidW0sIFN0ZXJlbyAgXFxuVmlueWwsIDdcXFwiLCA0NSBSUE0sIFNpbmdsZSAgXFxuVmlueWwsIDEyXFxcIiwgRVAgIFxcblZpbnlsLCAxMlxcXCIsIE1heGktU2luZ2xlICBcXG5WaW55bFxcblxcbi0tLVxcblxcbiMjIE5vcm1hbGl6YXRpb24gR3VpZGVsaW5lc1xcblxcbklmIHRoZSBsaXN0aW5nIG1lbnRpb25zOlxcblxcbkxQIC8gMTJcXFwiIC8gN1xcXCIgLyBFUCAvIFJlY29yZCAvIFxcdTMwRUNcXHUzMEIzXFx1MzBGQ1xcdTMwQzkgIFxcblxcdTIxOTIgaW5jbHVkZSAqKlxcXCJWaW55bFxcXCIqKlxcblxcbiMjIyBTaXplIG1hcHBpbmdcXG5cXG5MUCBcXHUyMTkyIGluY2x1ZGUgKioxMlxcXCIqKiAgXFxuMTJcXFwiIFxcdTIxOTIgaW5jbHVkZSAqKjEyXFxcIioqICBcXG43XFxcIiBcXHUyMTkyIGluY2x1ZGUgKio3XFxcIioqICBcXG4xMFxcXCIgXFx1MjE5MiBpbmNsdWRlICoqMTBcXFwiKipcXG5cXG4jIyMgU3BlZWQgbWFwcGluZ1xcblxcbjMzcnBtIC8gMzMgUlBNIFxcdTIxOTIgKiozMyBcXHUyMTUzIFJQTSoqICBcXG40NXJwbSAvIDQ1IFJQTSBcXHUyMTkyICoqNDUgUlBNKipcXG5cXG4jIyMgUmVsZWFzZSB0eXBlIG1hcHBpbmdcXG5cXG5zaW5nbGUgXFx1MjE5MiAqKlNpbmdsZSoqICBcXG5lcCBcXHUyMTkyICoqRVAqKiAgXFxuYWxidW0gXFx1MjE5MiAqKkFsYnVtKipcXG5cXG4jIyMgQXVkaW8gdHlwZSBtYXBwaW5nXFxuXFxuc3RlcmVvIFxcdTIxOTIgKipTdGVyZW8qKiAgXFxubW9ubyBcXHUyMTkyICoqTW9ubyoqXFxuXFxuLS0tXFxuXFxuIyMgRm9ybWF0IE9yZGVyXFxuXFxuUmV0dXJuIHZhbHVlcyBpbiB0aGlzIGFwcHJveGltYXRlIG9yZGVyOlxcblxcbk1hdGVyaWFsIFxcdTIxOTIgU2l6ZSBcXHUyMTkyIFNwZWVkIFxcdTIxOTIgVHlwZSBcXHUyMTkyIEF1ZGlvXFxuXFxuRXhhbXBsZTpcXG5cXG5WaW55bCwgMTJcXFwiLCAzMyBcXHUyMTUzIFJQTSwgQWxidW0sIFN0ZXJlb1xcblxcbi0tLVxcblxcbiMjIGNvdW50cnlcXG5cXG5Db3VudHJ5IG9mIHJlbGVhc2UgaWYgZXhwbGljaXRseSBtZW50aW9uZWQuXFxuXFxuLS0tXFxuXFxuIyMgeWVhclxcblxcblJlbGVhc2UgeWVhciBpZiBleHBsaWNpdGx5IHdyaXR0ZW4uXFxuXFxuLS0tXFxuXFxuIyMgY29uZmlkZW5jZVxcblxcbkEgdmFsdWUgYmV0d2VlbiAqKjAgYW5kIDEqKiByZXByZXNlbnRpbmcgaG93IGNvbmZpZGVudCB0aGUgZXh0cmFjdGlvbiBpcy5cXG5cXG4tLS1cXG5cXG4jIEV4dHJhY3Rpb24gUHJpb3JpdHkgKFZFUlkgSU1QT1JUQU5UKVxcblxcbjEuIGNhdGFsb2dfbnVtYmVyICBcXG4yLiBhcnRpc3QgIFxcbjMuIHRpdGxlICBcXG40LiBmb3JtYXQgIFxcblxcbi0tLVxcblxcbiMgUnVsZXNcXG5cXG4tIEFuYWx5emUgKipCT1RIIHRpdGxlIGFuZCBkZXNjcmlwdGlvbioqXFxuLSBBbHdheXMgYXR0ZW1wdCB0byBmaW5kIGEgKipjYXRhbG9nX251bWJlciBmaXJzdCoqXFxuLSBJZiBhIHBhdHRlcm4gbGlrZSBSS0lEMDA0VCwgQ1JFTFAwNzYsIEZBQ1Q3NSBldGMgYXBwZWFycywgdHJlYXQgaXQgYXMgKipjYXRhbG9nX251bWJlcioqXFxuLSBQcmVmZXIgdmFsdWVzIGFwcGVhcmluZyBpbiB0aGUgKipsaXN0aW5nIHRpdGxlKipcXG4tIFdoZW4gZ2VuZXJhdGluZyAqKmZvcm1hdCoqLCByZWZlcmVuY2UgKip0eXBpY2FsIERpc2NvZ3MgZm9ybWF0IGNvbnZlbnRpb25zKipcXG4tIERvICoqTk9UIGd1ZXNzIHZhbHVlcyoqXFxuLSBJZiBhIHZhbHVlIGlzIG5vdCBmb3VuZCwgcmV0dXJuICoqbnVsbCoqXFxuLSBFbnN1cmUgdGhlIHJlc3VsdCBpcyAqKnZhbGlkIEpTT04gYmVmb3JlIHJldHVybmluZyoqXFxuXFxuLS0tXFxuXFxuIyBTY2hlbWFcXG5cXG57XFxuICBcXFwiY2F0YWxvZ19udW1iZXJcXFwiOiBzdHJpbmd8bnVsbCxcXG4gIFxcXCJtYXRyaXhfbnVtYmVyXFxcIjogc3RyaW5nfG51bGwsXFxuICBcXFwiYXJ0aXN0XFxcIjogc3RyaW5nfG51bGwsXFxuICBcXFwidGl0bGVcXFwiOiBzdHJpbmd8bnVsbCxcXG4gIFxcXCJmb3JtYXRcXFwiOiBzdHJpbmd8bnVsbCxcXG4gIFxcXCJjb3VudHJ5XFxcIjogc3RyaW5nfG51bGwsXFxuICBcXFwieWVhclxcXCI6IG51bWJlcnxudWxsLFxcbiAgXFxcImNvbmZpZGVuY2VcXFwiOiBudW1iZXJcXG59XFxuXFxuLS0tXFxuXFxuIyBJbnB1dFxcblxcbnRpdGxlOlxcblwiLmNvbmNhdCh0aXRsZSwgXCJcXG5cXG5kZXNjcmlwdGlvbjpcXG5cIikuY29uY2F0KGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGFsb2dfbnVtYmVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdHJpeF9udW1iZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aXN0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IFwiZ2VtaW5pLTMtZmxhc2gtcHJldmlld1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbW9kZWwgPSBcImdlbWluaS0yLjAtZmxhc2hcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2VtaW5p5a6f6KGMXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZW5BSS5tb2RlbHMuZ2VuZXJhdGVDb250ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50czogcHJvbXB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiAxLjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlua2luZ0NvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaW5raW5nTGV2ZWw6IFRoaW5raW5nTGV2ZWwuTE9XLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXN1bHQudGV4dCB8fCBcInt9XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJHZW1pbmkgQVBJIGVycm9yOlwiLCBlcnJvcl8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5lb25BcGkucHJvdG90eXBlLmdldERpc2NvZ3NEYXRhID0gZnVuY3Rpb24gKHJlc291cmNlSWRzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgY2hyb21pdW0sIGluaXQ7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXNvdXJjZUlkcy5tYXAoZnVuY3Rpb24gKGlkKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlSWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpYW46IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocm9taXVtID0gcmVxdWlyZShcInBsYXl3cmlnaHQtZXh0cmFcIikuY2hyb21pdW07XG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWl1bS51c2UodGhpcy5zdGVhbHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQgPSBmdW5jdGlvbiAocmVzb3VyY2VJZCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBicm93c2VyLCBwYWdlLCBibG9ja0ltYWdlcywgdGV4dCwgZXJyb3JfMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDgsICwgOV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNocm9taXVtLmxhdW5jaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkbGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtcIi0tbm8tc2FuZGJveFwiLCBcIi0tZGlzYWJsZS1zZXR1aWQtc2FuZGJveFwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgYnJvd3Nlci5uZXdQYWdlKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tJbWFnZXMgPSBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByb3V0ZS5yZXF1ZXN0KCkucmVzb3VyY2VUeXBlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImltYWdlXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPT09IFwic3R5bGVzaGVldFwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID09PSBcImZvbnRcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9PT0gXCJtZWRpYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZS5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcGFnZS5yb3V0ZShcIioqLypcIiwgYmxvY2tJbWFnZXMpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcGFnZS5nb3RvKFwiaHR0cHM6Ly93d3cuZGlzY29ncy5jb20vc2VsbC9yZWxlYXNlL1wiLmNvbmNhdChyZXNvdXJjZUlkKSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBwYWdlLndhaXRGb3JTZWxlY3RvcihcIiNzdGF0aXN0aWNzXCIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcGFnZS4kZXZhbChcIiNzdGF0aXN0aWNzIHVsLmxhc3RcIiwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGlzID0gZWwucXVlcnlTZWxlY3RvckFsbChcImxpXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSB7IGxvd2VzdDogXCJcIiwgbWVkaWFuOiBcIlwiLCBoaWdoZXN0OiBcIlwiIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXMuZm9yRWFjaChmdW5jdGlvbiAobGksIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSAxICYmIGkgPD0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BhbiA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQubG93ZXN0ID0gbGkudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQubWVkaWFuID0gbGkudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQuaGlnaGVzdCA9IGxpLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVtyZXNwb25zZS5maW5kSW5kZXgoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIucmVzb3VyY2VJZCA9PT0gcmVzb3VyY2VJZDsgfSldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUlkOiByZXNvdXJjZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3Q6IHRleHQubG93ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlRmxvYXQodGV4dC5sb3dlc3QucmVwbGFjZSgvW14wLTkuXS9nLCBcIlwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWFuOiB0ZXh0Lm1lZGlhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUZsb2F0KHRleHQubWVkaWFuLnJlcGxhY2UoL1teMC05Ll0vZywgXCJcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3Q6IHRleHQuaGlnaGVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJzZUZsb2F0KHRleHQuaGlnaGVzdC5yZXBsYWNlKC9bXjAtOS5dL2csIFwiXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgYnJvd3Nlci5jbG9zZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YSBmb3IgcmVzb3VyY2VJZCBcIi5jb25jYXQocmVzb3VyY2VJZCwgXCI6XCIpLCBlcnJvcl8yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIFByb21pc2UuYWxsKHJlc291cmNlSWRzLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIGluaXQoaWQpOyB9KSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpc2NvZ3MgZGF0YSByZXNwb25zZTpcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTmVvbkFwaTtcbn0oKSk7XG5leHBvcnQgeyBOZW9uQXBpIH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAZ29vZ2xlL2dlbmFpXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGxheXdyaWdodC1leHRyYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGhcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGNvcnMgZnJvbSBcImNvcnNcIjtcbmltcG9ydCB7IE5lb25BcGkgfSBmcm9tIFwiLi9OZW9uQXBpXCI7XG5yZXF1aXJlKFwiZG90ZW52XCIpLmNvbmZpZygpO1xudmFyIGFwcCA9IGV4cHJlc3MoKTtcbnZhciBuZW9uQXBpID0gbmV3IE5lb25BcGkoKTtcbi8vIENPUlPjga7oqK3lrppcbnZhciBjb3JzT3B0aW9ucyA9IHtcbiAgICBvcmlnaW46IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9GUk9OVEVORF9VUkwsIC8vIOODleODreODs+ODiOOCqOODs+ODieOBrlVSTOOCkueSsOWig+WkieaVsOOBi+OCieWPluW+l1xuICAgIG1ldGhvZDogW10sXG59O1xuLy8gQ09SU+ioreWumuOBqEpTT07jg5Hjg7zjgrXjg7zjgpLjg5/jg4njg6vjgqbjgqfjgqLjgajjgZfjgabpgannlKhcbmFwcC51c2UoY29ycygpKTtcbmFwcC5vcHRpb25zKFwiKlwiLCBjb3JzKCkpO1xuYXBwLnVzZShleHByZXNzLmpzb24oeyBsaW1pdDogXCIxMG1iXCIgfSkpO1xuLy8g44Ot44Kw44Kk44Oz6KqN6Ki844KS6KGM44GGKOaIkOWKn+aZguOCouOCr+OCu+OCueODiOODvOOCr+ODs+OCkui/lOWNtOOBmeOCiylcbmFwcC5wb3N0KFwiL2FwaS92MS9nZW1pbmlcIiwgZnVuY3Rpb24gKHJlcSwgcmVzKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQsIGVycm9yXzE7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIHJlcXVlc3Q6XCIsIHJlcS5ib2R5KTtcbiAgICAgICAgICAgICAgICBpZiAocmVxLmJvZHkuYWNjZXNzVG9rZW4gIT09IHByb2Nlc3MuZW52LlZJVEVfQUNDRVNTX1RPS0VOKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIkludmFsaWQgYWNjZXNzIHRva2VuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDQwMSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbmVvbkFwaS5nZW1pbmkocmVxLmJvZHkudGl0bGUsIHJlcS5ib2R5LmRlc2NyaXB0aW9uKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIC8vIOODpuODvOOCtuODvOaDheWgseOBqOODiOODvOOCr+ODs+OCkuOCr+ODqeOCpOOCouODs+ODiOOBq+i/lOOBmVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsIC8vIOOCueODhuODvOOCv+OCueOCs+ODvOODiVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcl8xLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogNTAwLCAvLyDjgrnjg4bjg7zjgr/jgrnjgrPjg7zjg4lcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH0pO1xuYXBwLnBvc3QoXCIvYXBpL3YxL2Rpc2NvZ3NEYXRhXCIsIGZ1bmN0aW9uIChyZXEsIHJlcykgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0LCBlcnJvcl8yO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCAzXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWNlaXZlZCByZXF1ZXN0IGZvciBkaXNjb2dzIGRhdGE6XCIsIHJlcS5ib2R5KTtcbiAgICAgICAgICAgICAgICBpZiAocmVxLmJvZHkuYWNjZXNzVG9rZW4gIT09IHByb2Nlc3MuZW52LlZJVEVfQUNDRVNTX1RPS0VOKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIkludmFsaWQgYWNjZXNzIHRva2VuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDQwMSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbmVvbkFwaS5nZXREaXNjb2dzRGF0YShyZXEuYm9keS5yZXNvdXJjZUlkcyldO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAvLyDjg6bjg7zjgrbjg7zmg4XloLHjgajjg4jjg7zjgq/jg7PjgpLjgq/jg6njgqTjgqLjg7Pjg4jjgavov5TjgZlcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLCAvLyDjgrnjg4bjg7zjgr/jgrnjgrPjg7zjg4lcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGVycm9yXzIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JfMi5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDUwMCwgLy8g44K544OG44O844K/44K544Kz44O844OJXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyB9KTtcbmFwcC5saXN0ZW4oNDIwMCwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwicG9ydCBcIi5jb25jYXQoNDIwMCwgXCIgXFx1MzA2N1xcdTMwQjVcXHUzMEZDXFx1MzBEMFxcdTMwRkNcXHU4RDc3XFx1NTJENVxcdTRFMkRcIikpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=