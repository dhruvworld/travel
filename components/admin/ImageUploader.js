"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageUploader;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function ImageUploader(_a) {
    var onImageSelect = _a.onImageSelect, _b = _a.isUploading, isUploading = _b === void 0 ? false : _b, _c = _a.acceptedTypes, acceptedTypes = _c === void 0 ? "image/jpeg, image/png, image/webp" : _c;
    var _d = (0, react_1.useState)(false), dragActive = _d[0], setDragActive = _d[1];
    var _e = (0, react_1.useState)(null), preview = _e[0], setPreview = _e[1];
    var fileInputRef = (0, react_1.useRef)(null);
    var handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        }
        else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    var handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            var file = e.dataTransfer.files[0];
            handleFile(file);
        }
    };
    var handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            var file = e.target.files[0];
            handleFile(file);
        }
    };
    var handleFile = function (file) {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }
        // Create a preview
        var reader = new FileReader();
        reader.onload = function () {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        // Pass the file to parent component
        onImageSelect(file);
    };
    var handleButtonClick = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var clearPreview = function () {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    return (<div>
      {preview ? (<div className="relative h-40 w-full md:w-1/2 rounded-md overflow-hidden bg-gray-100">
          <img src={preview} alt="Preview" className="h-full w-full object-cover"/>
          <button onClick={clearPreview} className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100" disabled={isUploading}>
            <lucide_react_1.X size={16} className="text-gray-700"/>
          </button>
          
          {isUploading && (<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-sm">Uploading...</div>
            </div>)}
        </div>) : (<div className={"w-full md:w-1/2 h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors ".concat(dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50')} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={handleButtonClick}>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleChange} accept={acceptedTypes} disabled={isUploading}/>
          
          {isUploading ? (<div className="flex flex-col items-center">
              <div className="animate-spin mb-2">
                <lucide_react_1.Upload size={24} className="text-indigo-500"/>
              </div>
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>) : (<>
              <lucide_react_1.Image size={36} className="text-gray-400 mb-2"/>
              <p className="text-sm text-gray-500 text-center">
                <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or WEBP (Max 5MB)
              </p>
            </>)}
        </div>)}
    </div>);
}
