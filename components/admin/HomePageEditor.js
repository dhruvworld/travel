"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePageEditor;
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
var dynamic_1 = require("next/dynamic");
// Use dynamic imports to improve performance
var FeaturedPackagesTab = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('../admin/FeaturedPackagesEditor'); }); }, {
    loading: function () { return <div className="animate-pulse h-64 w-full bg-gray-100 rounded-lg"></div>; }
});
var TestimonialsTab = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('../admin/TestimonialsEditor'); }); }, {
    loading: function () { return <div className="animate-pulse h-64 w-full bg-gray-100 rounded-lg"></div>; }
});
var GalleryTab = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('../admin/GalleryEditor'); }); }, {
    loading: function () { return <div className="animate-pulse h-64 w-full bg-gray-100 rounded-lg"></div>; }
});
var OffersTab = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return require('../admin/OffersEditor'); }); }, {
    loading: function () { return <div className="animate-pulse h-64 w-full bg-gray-100 rounded-lg"></div>; }
});
function HomePageEditor() {
    var _a = (0, react_1.useState)('packages'), activeTab = _a[0], setActiveTab = _a[1];
    return (<div className="space-y-6 p-6">
      <react_hot_toast_1.Toaster position="top-right"/>
      <h1 className="text-2xl font-bold">Homepage Content Manager</h1>

      <div className="flex flex-wrap gap-2">
        <button onClick={function () { return setActiveTab('packages'); }} className={"px-4 py-2 rounded ".concat(activeTab === 'packages' ? 'bg-blue-600 text-white' : 'bg-gray-200')}>
          Featured Packages
        </button>
        <button onClick={function () { return setActiveTab('testimonials'); }} className={"px-4 py-2 rounded ".concat(activeTab === 'testimonials' ? 'bg-blue-600 text-white' : 'bg-gray-200')}>
          Testimonials
        </button>
        <button onClick={function () { return setActiveTab('gallery'); }} className={"px-4 py-2 rounded ".concat(activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'bg-gray-200')}>
          Travel Gallery
        </button>
        <button onClick={function () { return setActiveTab('offers'); }} className={"px-4 py-2 rounded ".concat(activeTab === 'offers' ? 'bg-blue-600 text-white' : 'bg-gray-200')}>
          Special Offers
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'packages' && <FeaturedPackagesTab />}
        {activeTab === 'testimonials' && <TestimonialsTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'offers' && <OffersTab />}
      </div>
    </div>);
}
