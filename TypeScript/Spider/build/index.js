"use strict";
/*
 * @Author: your name
 * @Date: 2020-11-01 13:12:15
 * @LastEditTime: 2020-11-02 09:30:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /VScode/ts/src/index.ts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var superagent_1 = __importDefault(require("superagent"));
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Crowller = /** @class */ (function () {
    function Crowller() {
        this.url = 'http://www.dell-lee.com';
        this.Spider();
    }
    Crowller.prototype.Spider = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHTML()];
                    case 1:
                        json = _a.sent();
                        this.generateJSONFile(json);
                        console.info(json);
                        return [2 /*return*/];
                }
            });
        });
    };
    Crowller.prototype.getHTML = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get(this.url)];
                    case 1:
                        html = _a.sent();
                        json = this.getTarget(html.text);
                        return [2 /*return*/, json];
                }
            });
        });
    };
    Crowller.prototype.getTarget = function (html) {
        var _a;
        var _this = this;
        var $ = cheerio_1.default.load(html);
        var items = $('.course-item');
        var date = new Date().getTime();
        var result = (_a = {},
            _a[date] = {},
            _a);
        items.map(function (index, element) {
            var dec = $(element).find('.course-desc').eq(0).text();
            var img = _this.url + $(element).find('.course-img').eq(0).attr('src') || '';
            result[date][index] = { dec: dec, img: img };
        });
        return result;
    };
    Crowller.prototype.generateJSONFile = function (json) {
        var filePath = path_1.default.resolve(__dirname, '../data/data.json');
        var isExist = fs_1.default.existsSync(filePath);
        var content = {};
        if (isExist) {
            var haveExistedContent = fs_1.default.readFileSync(filePath, 'utf-8');
            content = JSON.parse(haveExistedContent);
        }
        var time = parseInt(Object.keys(json)[0], 10);
        content[time] = json[time];
        fs_1.default.writeFileSync(filePath, JSON.stringify(content));
    };
    return Crowller;
}());
var crowller = new Crowller;
