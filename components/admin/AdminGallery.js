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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminGallery;
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
var image_1 = require("next/image");
function AdminGallery() {
    var _this = this;
    var _a = (0, react_1.useState)([]), images = _a[0], setImages = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)({
        title: '',
        url: ''
    }), newImage = _c[0], setNewImage = _c[1];
    (0, react_1.useEffect)(function () {
        function fetchGallery() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, 4, 5]);
                            setLoading(true);
                            return [4 /*yield*/, fetch('/api/admin/gallery')];
                        case 1:
                            response = _a.sent();
                            if (!response.ok) {
                                throw new Error('Failed to fetch gallery images');
                            }
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            setImages(data);
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Error fetching gallery:', error_1);
                            react_hot_toast_1.toast.error('Failed to load gallery images');
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        fetchGallery();
    }, []);
    var handleInputChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setNewImage(__assign(__assign({}, newImage), (_a = {}, _a[name] = value, _a)));
    };
    var handleAddImage = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, addedImage, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!newImage.url) {
                        react_hot_toast_1.toast.error('Image URL is required');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/admin/gallery', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newImage)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add image');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    addedImage = _a.sent();
                    setImages(__spreadArray([addedImage], images, true));
                    setNewImage({
                        title: '',
                        url: ''
                    });
                    react_hot_toast_1.toast.success('Image added successfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error adding image:', error_2);
                    react_hot_toast_1.toast.error('Failed to add image');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this image?')) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/admin/gallery', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: id })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete image');
                    }
                    setImages(images.filter(function (img) { return img.id !== id; }));
                    react_hot_toast_1.toast.success('Image deleted successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error deleting image:', error_3);
                    react_hot_toast_1.toast.error('Failed to delete image');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<section className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Manage Gallery</h2>

      {/* Add new image form */}
      <div className="border p-4 rounded-lg shadow bg-white">
        <h3 className="font-semibold mb-4">Add New Image</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" name="title" value={newImage.title} onChange={handleInputChange} className="w-full p-2 border rounded" placeholder="Image title"/>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
            <input type="text" name="url" value={newImage.url} onChange={handleInputChange} className="w-full p-2 border rounded" placeholder="https://example.com/image.jpg"/>
          </div>
          
          <button onClick={handleAddImage} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Gallery
          </button>
        </div>
      </div>

      {/* Gallery grid */}
      {loading ? (<div className="text-center py-8 text-gray-500">Loading gallery...</div>) : (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length > 0 ? (images.map(function (image) { return (<div key={image.id} className="relative group">
                <div className="aspect-square relative overflow-hidden rounded-lg border">
                  <image_1.default src={image.url} alt={image.title || 'Gallery image'} fill className="object-cover transition-transform group-hover:scale-105"/>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button onClick={function () { return handleDelete(image.id); }} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Delete
                  </button>
                </div>
                {image.title && (<p className="mt-1 text-sm text-gray-700 truncate">{image.title}</p>)}
              </div>); })) : (<div className="col-span-full text-center py-8 text-gray-500">
              No images in gallery. Add some above!
            </div>)}
        </div>)}
    </section>);
}
