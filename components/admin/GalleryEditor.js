'use client';
"use strict";
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
exports.default = GalleryEditor;
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
var react_dropzone_1 = require("react-dropzone");
var lucide_react_1 = require("lucide-react");
function GalleryEditor() {
    var _this = this;
    var _a = (0, react_1.useState)([]), photos = _a[0], setPhotos = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), uploading = _c[0], setUploading = _c[1];
    var _d = (0, react_1.useState)(0), uploadProgress = _d[0], setUploadProgress = _d[1];
    // Fetch photos from the server
    var fetchPhotos = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, fetch('/api/admin/gallery', {
                            cache: 'no-store'
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to fetch gallery photos');
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setPhotos(data);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching gallery photos:', error_1);
                    react_hot_toast_1.toast.error('Failed to load gallery photos');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    (0, react_1.useEffect)(function () {
        fetchPhotos();
    }, [fetchPhotos]);
    // Handle file uploads
    var onDrop = (0, react_1.useCallback)(function (acceptedFiles) { return __awaiter(_this, void 0, void 0, function () {
        var batchSize, totalFiles_1, processedFiles_1, _loop_1, i, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!acceptedFiles.length)
                        return [2 /*return*/];
                    setUploading(true);
                    setUploadProgress(0);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    batchSize = 3;
                    totalFiles_1 = acceptedFiles.length;
                    processedFiles_1 = 0;
                    _loop_1 = function (i) {
                        var batch, batchPromises, batchResults;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    batch = acceptedFiles.slice(i, i + batchSize);
                                    batchPromises = batch.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                        var formData, cloudName, uploadResponse, uploadData, apiResponse;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    formData = new FormData();
                                                    formData.append('file', file);
                                                    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'travel');
                                                    cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
                                                    if (!cloudName) {
                                                        throw new Error('Cloudinary configuration missing');
                                                    }
                                                    return [4 /*yield*/, fetch("https://api.cloudinary.com/v1_1/".concat(cloudName, "/image/upload"), {
                                                            method: 'POST',
                                                            body: formData,
                                                        })];
                                                case 1:
                                                    uploadResponse = _a.sent();
                                                    if (!uploadResponse.ok)
                                                        throw new Error('Failed to upload to Cloudinary');
                                                    return [4 /*yield*/, uploadResponse.json()];
                                                case 2:
                                                    uploadData = _a.sent();
                                                    return [4 /*yield*/, fetch('/api/admin/gallery', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                            },
                                                            body: JSON.stringify({
                                                                url: uploadData.secure_url,
                                                                cloudId: uploadData.public_id,
                                                            }),
                                                        })];
                                                case 3:
                                                    apiResponse = _a.sent();
                                                    if (!apiResponse.ok)
                                                        throw new Error('Failed to save photo');
                                                    processedFiles_1++;
                                                    setUploadProgress(Math.round((processedFiles_1 / totalFiles_1) * 100));
                                                    return [4 /*yield*/, apiResponse.json()];
                                                case 4: return [2 /*return*/, _a.sent()];
                                            }
                                        });
                                    }); });
                                    return [4 /*yield*/, Promise.all(batchPromises)];
                                case 1:
                                    batchResults = _b.sent();
                                    setPhotos(function (prev) { return __spreadArray(__spreadArray([], batchResults, true), prev, true); });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < totalFiles_1)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i += batchSize;
                    return [3 /*break*/, 2];
                case 5:
                    react_hot_toast_1.toast.success("Uploaded ".concat(totalFiles_1, " photo").concat(totalFiles_1 !== 1 ? 's' : '', " successfully"));
                    return [3 /*break*/, 8];
                case 6:
                    error_2 = _a.sent();
                    console.error('Error uploading images:', error_2);
                    react_hot_toast_1.toast.error('Failed to upload images');
                    return [3 /*break*/, 8];
                case 7:
                    setUploading(false);
                    setUploadProgress(0);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); }, []);
    var _e = (0, react_dropzone_1.useDropzone)({
        onDrop: onDrop,
        accept: {
            'image/*': []
        },
        disabled: uploading
    }), getRootProps = _e.getRootProps, getInputProps = _e.getInputProps, isDragActive = _e.isDragActive;
    var deletePhoto = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this photo?')) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/admin/gallery/".concat(id), {
                            method: 'DELETE'
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to delete photo');
                    setPhotos(photos.filter(function (photo) { return photo.id !== id; }));
                    react_hot_toast_1.toast.success('Photo deleted successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error deleting photo:', error_3);
                    react_hot_toast_1.toast.error('Failed to delete photo');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return (<div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading gallery photos...</span>
      </div>);
    }
    return (<div className="space-y-6">
      <div {...getRootProps()} className={"border-2 border-dashed rounded-lg p-6 transition-colors text-center cursor-pointer ".concat(isDragActive
            ? 'border-blue-500 bg-blue-50'
            : uploading
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50')}>
        <input {...getInputProps()}/>
        <div className="flex flex-col items-center justify-center space-y-2">
          {uploading ? (<>
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm font-medium">Uploading... {uploadProgress}%</p>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "".concat(uploadProgress, "%") }}></div>
              </div>
            </>) : (<>
              <lucide_react_1.Upload className={isDragActive ? 'text-blue-500' : 'text-gray-400'} size={36}/>
              <p className="font-medium">{isDragActive ? 'Drop the files here' : 'Drop image files here or click to select'}</p>
              <p className="text-xs text-gray-500">Upload multiple files at once</p>
            </>)}
        </div>
      </div>

      {photos.length > 0 ? (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map(function (photo) { return (<div key={photo.id} className="group relative">
              <div className="aspect-square relative rounded-lg overflow-hidden border">
                <img src={photo.url} alt="Gallery photo" className="object-cover w-full h-full"/>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button onClick={function () { return deletePhoto(photo.id); }} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700" title="Delete photo">
                  <lucide_react_1.Trash size={16}/>
                </button>
              </div>
            </div>); })}
        </div>) : (<div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
          No photos in gallery. Add some using the upload area above.
        </div>)}
    </div>);
}
