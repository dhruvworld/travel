'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeaturedPackagesForm;
var react_1 = require("react");
function FeaturedPackagesForm() {
    var _this = this;
    var _a = (0, react_1.useState)([]), packages = _a[0], setPackages = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), isSaving = _c[0], setIsSaving = _c[1];
    var _d = (0, react_1.useState)(null), message = _d[0], setMessage = _d[1];
    (0, react_1.useEffect)(function () {
        var fetchPackages = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch('/api/packages')];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error('Failed to fetch packages');
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setPackages(data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching packages:', error_1);
                        setMessage({
                            text: 'Failed to load packages. Please try again.',
                            type: 'error'
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchPackages();
    }, []);
    var handleToggleFeatured = function (id) {
        setPackages(packages.map(function (pkg) {
            return pkg.id === id ? __assign(__assign({}, pkg), { isFeatured: !pkg.isFeatured }) : pkg;
        }));
    };
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var featuredIds, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSaving(true);
                    setMessage(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    featuredIds = packages
                        .filter(function (pkg) { return pkg.isFeatured; })
                        .map(function (pkg) { return pkg.id; });
                    return [4 /*yield*/, fetch('/api/featured-packages', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ featuredIds: featuredIds }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to update featured packages');
                    setMessage({
                        text: 'Featured packages updated successfully!',
                        type: 'success'
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error saving featured packages:', error_2);
                    setMessage({
                        text: 'Failed to update featured packages. Please try again.',
                        type: 'error'
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (isLoading) {
        return <div className="text-center py-6">Loading packages...</div>;
    }
    return (<div className="featured-packages-form">
      {message && (<div className={"p-4 mb-4 rounded-md ".concat(message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
          {message.text}
        </div>)}
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Select the packages you want to feature on the homepage.
        </p>
      </div>
      
      <div className="space-y-2">
        {packages.map(function (pkg) { return (<div key={pkg.id} className="flex items-center p-3 border rounded hover:bg-gray-50">
            <input type="checkbox" id={"pkg-".concat(pkg.id)} checked={pkg.isFeatured} onChange={function () { return handleToggleFeatured(pkg.id); }} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
            <label htmlFor={"pkg-".concat(pkg.id)} className="ml-3 block text-sm font-medium text-gray-700">
              {pkg.name}
            </label>
          </div>); })}
      </div>
      
      <div className="mt-6">
        <button onClick={handleSave} disabled={isSaving} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
          {isSaving ? 'Saving...' : 'Save Featured Packages'}
        </button>
      </div>
    </div>);
}
