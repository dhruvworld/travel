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
exports.default = PackageManager;
var react_1 = require("react");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
var ImageUpload_1 = require("./ImageUpload");
function PackageManager(_a) {
    var label = _a.label, iconComponent = _a.iconComponent, initial = _a.initial;
    var _b = (0, react_1.useState)(initial), items = _b[0], setItems = _b[1];
    var _c = (0, react_1.useState)(null), editingItem = _c[0], setEditingItem = _c[1];
    var _d = (0, react_1.useState)(false), showAddForm = _d[0], setShowAddForm = _d[1];
    var _e = (0, react_1.useState)({
        title: '',
        description: '',
        price: 0,
        image: ''
    }), newItem = _e[0], setNewItem = _e[1];
    var handleDelete = function (id) {
        if (window.confirm("Are you sure you want to delete this ".concat(label.toLowerCase(), "?"))) {
            setItems(items.filter(function (item) { return item.id !== id; }));
        }
    };
    var handleEdit = function (item) {
        setEditingItem(item);
    };
    var handleSaveEdit = function () {
        if (!editingItem)
            return;
        setItems(items.map(function (item) {
            return item.id === editingItem.id ? editingItem : item;
        }));
        setEditingItem(null);
    };
    var handleCancelEdit = function () {
        setEditingItem(null);
    };
    var handleEditChange = function (e) {
        var _a;
        if (!editingItem)
            return;
        var _b = e.target, name = _b.name, value = _b.value;
        setEditingItem(__assign(__assign({}, editingItem), (_a = {}, _a[name] = name === 'price' ? parseFloat(value) : value, _a)));
    };
    var handleAddItem = function () {
        setShowAddForm(true);
    };
    var handleAddChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setNewItem(__assign(__assign({}, newItem), (_a = {}, _a[name] = name === 'price' ? parseFloat(value) : value, _a)));
    };
    var handleSaveNew = function () {
        // Validate required fields
        if (!newItem.title || !newItem.description || newItem.price <= 0) {
            alert('Please fill in all required fields correctly');
            return;
        }
        // Create new item
        var newId = "new-".concat(Date.now());
        setItems(__spreadArray(__spreadArray([], items, true), [__assign({ id: newId }, newItem)], false));
        // Reset form
        setNewItem({
            title: '',
            description: '',
            price: 0,
            image: ''
        });
        setShowAddForm(false);
    };
    var handleCancelAdd = function () {
        setShowAddForm(false);
    };
    var handleImageUpload = function (url, isNewItem) {
        if (isNewItem === void 0) { isNewItem = false; }
        if (isNewItem) {
            setNewItem(__assign(__assign({}, newItem), { image: url }));
        }
        else if (editingItem) {
            setEditingItem(__assign(__assign({}, editingItem), { image: url }));
        }
    };
    return (<div className="mt-8 mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {iconComponent && <span>{iconComponent}</span>}
          {label}
        </h2>
        <button onClick={handleAddItem} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <lucide_react_1.Plus size={16}/>
          Add {label.split(' ').pop()}
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (<div className="border rounded-lg p-4 bg-gray-50 mb-6">
          <h3 className="font-semibold mb-4">Add New {label.split(' ').pop()}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" value={newItem.title} onChange={handleAddChange} className="w-full p-2 border rounded-md" placeholder={"Enter ".concat(label.toLowerCase(), " title")}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={newItem.description} onChange={handleAddChange} rows={3} className="w-full p-2 border rounded-md" placeholder="Enter a detailed description"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input type="number" name="price" value={newItem.price || ''} onChange={handleAddChange} className="w-full p-2 border rounded-md" placeholder="0"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <div className="space-y-3">
                <input type="text" name="image" value={newItem.image} onChange={handleAddChange} className="w-full p-2 border rounded-md" placeholder="/images/your-image.jpg"/>
                <div className="flex items-center">
                  <div className="h-px bg-gray-300 flex-grow"></div>
                  <span className="px-2 text-gray-500 text-sm">OR</span>
                  <div className="h-px bg-gray-300 flex-grow"></div>
                </div>
                <ImageUpload_1.default onUploadComplete={function (url) { return handleImageUpload(url, true); }} className="mt-2"/>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSaveNew} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-2">
                Save
              </button>
              <button onClick={handleCancelAdd} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>)}

      {/* Edit form */}
      {editingItem && (<div className="border rounded-lg p-4 bg-gray-50 mb-6">
          <h3 className="font-semibold mb-4">Edit {label.split(' ').pop()}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" name="title" value={editingItem.title} onChange={handleEditChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={editingItem.description} onChange={handleEditChange} rows={3} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input type="number" name="price" value={editingItem.price || ''} onChange={handleEditChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" name="image" value={editingItem.image} onChange={handleEditChange} className="w-full p-2 border rounded-md"/>
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Or upload a new image:</p>
                  <ImageUpload_1.default onUploadComplete={function (url) { return handleImageUpload(url); }}/>
                </div>
              </div>
            </div>
            <div>
              <div className="relative aspect-video rounded-md overflow-hidden bg-gray-200">
                {editingItem.image ? (<image_1.default src={editingItem.image} alt={editingItem.title} fill className="object-cover"/>) : (<div className="flex items-center justify-center h-full text-gray-400">
                    No Image Preview
                  </div>)}
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-2 flex items-center gap-1">
                  <lucide_react_1.Save size={16}/>
                  Save
                </button>
                <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1">
                  <lucide_react_1.X size={16}/>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>)}

      {/* Items grid */}
      {items.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(function (item) { return (<div key={item.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                {item.image ? (<image_1.default src={item.image} alt={item.title} fill className="object-cover"/>) : (<div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>)}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <div className="flex space-x-1">
                    <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-full" onClick={function () { return handleEdit(item); }} title="Edit">
                      <lucide_react_1.Pencil size={16}/>
                    </button>
                    <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-full" onClick={function () { return handleDelete(item.id); }} title="Delete">
                      <lucide_react_1.Trash2 size={16}/>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                <p className="text-sm font-medium mt-2 text-indigo-600">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
            </div>); })}
        </div>) : (<div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No {label.toLowerCase()} found. Click the button above to add.</p>
        </div>)}
    </div>);
}
