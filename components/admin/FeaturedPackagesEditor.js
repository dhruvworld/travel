"use client";
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
exports.default = FeaturedPackagesEditor;
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
function FeaturedPackagesEditor() {
    var _this = this;
    var _a = (0, react_1.useState)([]), packages = _a[0], setPackages = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        function fetchPackages() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, 4, 5]);
                            setLoading(true);
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
                            react_hot_toast_1.toast.error('Failed to load packages');
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        fetchPackages();
    }, []);
    var toggleFeatured = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("/api/admin/packages/".concat(id, "/toggle-featured"), {
                            method: 'PATCH'
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to update package');
                    setPackages(function (prevPackages) {
                        return prevPackages.map(function (pkg) {
                            return pkg.id === id ? __assign(__assign({}, pkg), { featured: !pkg.featured }) : pkg;
                        });
                    });
                    react_hot_toast_1.toast.success('Package updated successfully');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error updating package:', error_2);
                    react_hot_toast_1.toast.error('Failed to update package');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return (<div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>);
    }
    return (<div className="space-y-6">
      <react_hot_toast_1.Toaster position="top-right"/>
      <h1 className="text-2xl font-bold">Featured Packages Manager</h1>
      
      {packages.length === 0 ? (<p className="text-gray-500">No packages found. Create some packages first.</p>) : (<div className="bg-white rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {packages.map(function (pkg) { return (<li key={pkg.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  {pkg.image && (<div className="w-10 h-10 rounded-md overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover"/>
                    </div>)}
                  <span className="font-medium">{pkg.name}</span>
                </div>
                <button onClick={function () { return toggleFeatured(pkg.id); }} className={"px-3 py-1 rounded ".concat(pkg.featured
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}>
                  {pkg.featured ? 'Featured' : 'Not Featured'}
                </button>
              </li>); })}
          </ul>
        </div>)}
    </div>);
}
