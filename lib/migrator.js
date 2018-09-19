"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
function Migrator(params) {
    return function (constructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.mongoUrl = params.mongoUrl;
                _this.dbName = params.dbName;
                _this.collections = params.collections;
                _this.run = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, migrations, _i, _b, c, e_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                console.log('Migrations initiated');
                                console.log("Connecting to Mongo server " + this.mongoUrl);
                                _a = this;
                                return [4 /*yield*/, this.connect()];
                            case 1:
                                _a.mongoClient = _c.sent();
                                return [4 /*yield*/, this.clearDatabase()];
                            case 2:
                                _c.sent();
                                if (!this.collections || !this.collections.length) {
                                    console.log("Collections not found");
                                    return [2 /*return*/];
                                }
                                migrations = [];
                                for (_i = 0, _b = this.collections; _i < _b.length; _i++) {
                                    c = _b[_i];
                                    migrations.push(this.migrate(new c()));
                                }
                                _c.label = 3;
                            case 3:
                                _c.trys.push([3, 5, , 6]);
                                return [4 /*yield*/, Promise.all(migrations)];
                            case 4:
                                _c.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                e_1 = _c.sent();
                                console.error(e_1);
                                this.disconnect();
                                return [2 /*return*/];
                            case 6:
                                console.log('Migrations completed');
                                this.disconnect();
                                return [2 /*return*/];
                        }
                    });
                }); };
                _this.connect = function () {
                    return mongodb_1.MongoClient.connect(_this.mongoUrl, { useNewUrlParser: true });
                };
                _this.clearDatabase = function () { return __awaiter(_this, void 0, void 0, function () {
                    var e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                console.log('Erase database');
                                return [4 /*yield*/, this.mongoClient.db(this.dbName).dropDatabase()];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                e_2 = _a.sent();
                                console.error(e_2);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                _this.migrate = function (c) {
                    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var db, options, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    console.log("Migrating collection " + c.name + "...");
                                    db = this.mongoClient.db(this.dbName);
                                    options = {};
                                    if (c.schema) {
                                        options['validator'] = {
                                            $jsonSchema: c.schema,
                                        };
                                        options['validationLevel'] = 'strict';
                                    }
                                    return [4 /*yield*/, db.createCollection(c.name, options)];
                                case 1:
                                    _a.sent();
                                    if (!(c.items && c.items.length)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, db.collection(c.name).insertMany(c.items)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    resolve();
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_3 = _a.sent();
                                    reject(e_3);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                };
                _this.disconnect = function () {
                    _this.mongoClient.close();
                    console.log('Disconnected from database');
                };
                return _this;
            }
            return class_1;
        }(constructor));
    };
}
exports.Migrator = Migrator;
//# sourceMappingURL=migrator.js.map