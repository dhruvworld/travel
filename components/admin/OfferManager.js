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
exports.default = OfferManager;
var react_1 = require("react");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
var ImageUpload_1 = require("./ImageUpload");
var react_hot_toast_1 = require("react-hot-toast");
function OfferManager() {
    var _this = this;
    var _a = (0, react_1.useState)([]), offers = _a[0], setOffers = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), editingOffer = _c[0], setEditingOffer = _c[1];
    var _d = (0, react_1.useState)(false), showAddForm = _d[0], setShowAddForm = _d[1];
    var _e = (0, react_1.useState)({
        title: '',
        description: '',
        code: '',
        discountPercent: 10,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
        image: '',
        active: true
    }), newOffer = _e[0], setNewOffer = _e[1];
    var _f = (0, react_1.useState)(false), uploadingImage = _f[0], setUploadingImage = _f[1];
    // Fetch offers from API
    (0, react_1.useEffect)(function () {
        function fetchOffers() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, 4, 5]);
                            setLoading(true);
                            return [4 /*yield*/, fetch('/api/offers')];
                        case 1:
                            response = _a.sent();
                            if (!response.ok) {
                                throw new Error('Failed to fetch offers');
                            }
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            setOffers(data);
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Error fetching offers:', error_1);
                            react_hot_toast_1.toast.error('Failed to load offers');
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        fetchOffers();
    }, []);
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Are you sure you want to delete this offer?')) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/offers/".concat(id), {
                            method: 'DELETE'
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete offer');
                    }
                    setOffers(offers.filter(function (offer) { return offer.id !== id; }));
                    react_hot_toast_1.toast.success('Offer deleted successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error deleting offer:', error_2);
                    react_hot_toast_1.toast.error('Failed to delete offer');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleToggleActive = function (id, currentActive) { return __awaiter(_this, void 0, void 0, function () {
        var offer, response, updatedOffer_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    offer = offers.find(function (o) { return o.id === id; });
                    if (!offer)
                        return [2 /*return*/];
                    return [4 /*yield*/, fetch("/api/offers/".concat(id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(__assign(__assign({}, offer), { active: !currentActive }))
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update offer status');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    updatedOffer_1 = _a.sent();
                    setOffers(offers.map(function (o) { return o.id === id ? updatedOffer_1 : o; }));
                    react_hot_toast_1.toast.success("Offer ".concat(updatedOffer_1.active ? 'activated' : 'deactivated', " successfully"));
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error updating offer status:', error_3);
                    react_hot_toast_1.toast.error('Failed to update offer status');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (offer) {
        var formattedOffer = __assign(__assign({}, offer), { startDate: offer.startDate ? new Date(offer.startDate).toISOString().split('T')[0] : '', endDate: offer.endDate ? new Date(offer.endDate).toISOString().split('T')[0] : '' });
        setEditingOffer(formattedOffer);
    };
    var handleSaveEdit = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, updatedOffer_2, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editingOffer)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("/api/offers/".concat(editingOffer.id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(editingOffer)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update offer');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    updatedOffer_2 = _a.sent();
                    setOffers(offers.map(function (o) { return o.id === editingOffer.id ? updatedOffer_2 : o; }));
                    setEditingOffer(null);
                    react_hot_toast_1.toast.success('Offer updated successfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error updating offer:', error_4);
                    react_hot_toast_1.toast.error('Failed to update offer');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleCancelEdit = function () {
        setEditingOffer(null);
    };
    var handleEditChange = function (e) {
        var _a;
        if (!editingOffer)
            return;
        var _b = e.target, name = _b.name, value = _b.value;
        setEditingOffer(__assign(__assign({}, editingOffer), (_a = {}, _a[name] = name === 'discountPercent' ? parseFloat(value) : value, _a)));
    };
    var handleAddOffer = function () {
        setShowAddForm(true);
    };
    var handleAddChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setNewOffer(__assign(__assign({}, newOffer), (_a = {}, _a[name] = name === 'discountPercent' ? parseFloat(value) : value, _a)));
    };
    var handleSaveNew = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, createdOffer, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Validate required fields
                    if (!newOffer.title || !newOffer.description) {
                        react_hot_toast_1.toast.error('Please fill in all required fields');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/offers', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newOffer)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to create offer');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    createdOffer = _a.sent();
                    setOffers(__spreadArray([createdOffer], offers, true));
                    // Reset form
                    setNewOffer({
                        title: '',
                        description: '',
                        code: '',
                        discountPercent: 10,
                        startDate: new Date().toISOString().split('T')[0],
                        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
                        image: '',
                        active: true
                    });
                    setShowAddForm(false);
                    react_hot_toast_1.toast.success('Offer created successfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error creating offer:', error_5);
                    react_hot_toast_1.toast.error('Failed to create offer');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleCancelAdd = function () {
        setShowAddForm(false);
    };
    var handleImageUpload = function (url, isNew) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (isNew) {
                setNewOffer(__assign(__assign({}, newOffer), { image: url }));
            }
            else if (editingOffer) {
                setEditingOffer(__assign(__assign({}, editingOffer), { image: url }));
            }
            return [2 /*return*/];
        });
    }); };
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          🎉 Homepage Offers
        </h2>
        <button onClick={handleAddOffer} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2" disabled={showAddForm}>
          <lucide_react_1.Plus size={16}/>
          Add Offer
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (<div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="font-semibold mb-4">Add New Offer</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Title *</label>
                <input type="text" name="title" value={newOffer.title} onChange={handleAddChange} className="w-full p-2 border rounded-md" placeholder="E.g. Flat 20% Off on Goa Tour"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Code</label>
                <input type="text" name="code" value={newOffer.code} onChange={handleAddChange} className="w-full p-2 border rounded-md" placeholder="E.g. SUMMER20"/>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" value={newOffer.description} onChange={handleAddChange} rows={3} className="w-full p-2 border rounded-md" placeholder="Enter offer details"></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                <input type="number" name="discountPercent" value={newOffer.discountPercent || ''} onChange={handleAddChange} className="w-full p-2 border rounded-md" placeholder="E.g. 20" min="1" max="100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" name="startDate" value={newOffer.startDate} onChange={handleAddChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" name="endDate" value={newOffer.endDate} onChange={handleAddChange} className="w-full p-2 border rounded-md"/>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Offer Image</label>
              {newOffer.image ? (<div className="relative h-40 w-full md:w-1/2 rounded-md overflow-hidden mb-2">
                  <image_1.default src={newOffer.image} alt="Offer preview" fill className="object-cover"/>
                  <button onClick={function () { return setNewOffer(__assign(__assign({}, newOffer), { image: '' })); }} className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <lucide_react_1.X size={16} className="text-gray-700"/>
                  </button>
                </div>) : (<ImageUpload_1.default onUploadComplete={function (url) { return handleImageUpload(url, true); }} className="mt-2"/>)}
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="active" checked={newOffer.active} onChange={function () { return setNewOffer(__assign(__assign({}, newOffer), { active: !newOffer.active })); }} className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
              <label htmlFor="active" className="text-sm font-medium text-gray-700">
                Active (display on homepage)
              </label>
            </div>
            
            <div className="flex justify-end gap-2">
              <button onClick={handleCancelAdd} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveNew} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1" disabled={!newOffer.title || !newOffer.description}>
                <lucide_react_1.Save size={16}/>
                Save Offer
              </button>
            </div>
          </div>
        </div>)}

      {/* Edit Form */}
      {editingOffer && (<div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="font-semibold mb-4">Edit Offer</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Title *</label>
                <input type="text" name="title" value={editingOffer.title} onChange={handleEditChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Code</label>
                <input type="text" name="code" value={editingOffer.code || ''} onChange={handleEditChange} className="w-full p-2 border rounded-md"/>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" value={editingOffer.description} onChange={handleEditChange} rows={3} className="w-full p-2 border rounded-md"></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                <input type="number" name="discountPercent" value={editingOffer.discountPercent || ''} onChange={handleEditChange} className="w-full p-2 border rounded-md" min="1" max="100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" name="startDate" value={editingOffer.startDate || ''} onChange={handleEditChange} className="w-full p-2 border rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" name="endDate" value={editingOffer.endDate || ''} onChange={handleEditChange} className="w-full p-2 border rounded-md"/>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Offer Image</label>
              {editingOffer.image ? (<div className="relative h-40 w-full md:w-1/2 rounded-md overflow-hidden mb-2">
                  <image_1.default src={editingOffer.image} alt="Offer preview" fill className="object-cover"/>
                  <button onClick={function () { return setEditingOffer(__assign(__assign({}, editingOffer), { image: '' })); }} className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <lucide_react_1.X size={16} className="text-gray-700"/>
                  </button>
                </div>) : (<ImageUpload_1.default onUploadComplete={function (url) { return handleImageUpload(url, false); }} className="mt-2"/>)}
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="edit-active" checked={editingOffer.active} onChange={function () { return setEditingOffer(__assign(__assign({}, editingOffer), { active: !editingOffer.active })); }} className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
              <label htmlFor="edit-active" className="text-sm font-medium text-gray-700">
                Active (display on homepage)
              </label>
            </div>
            
            <div className="flex justify-end gap-2">
              <button onClick={handleCancelEdit} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1">
                <lucide_react_1.Save size={16}/>
                Save Changes
              </button>
            </div>
          </div>
        </div>)}

      {/* Offers List */}
      {loading ? (<div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-500">Loading offers...</p>
        </div>) : (<>
          {offers.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map(function (offer) { return (<div key={offer.id} className={"border rounded-lg overflow-hidden ".concat(offer.active ? 'bg-white' : 'bg-gray-50 opacity-70', " shadow-sm hover:shadow-md transition-shadow")}>
                  <div className="relative h-40">
                    {offer.image ? (<image_1.default src={offer.image} alt={offer.title} fill className="object-cover"/>) : (<div className="h-full w-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                      </div>)}
                    {offer.discountPercent && (<div className="absolute top-3 right-3 bg-red-500 text-white font-bold rounded-full w-14 h-14 flex items-center justify-center">
                        <span>-{offer.discountPercent}%</span>
                      </div>)}
                    <div className={"absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ".concat(offer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}>
                      {offer.active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{offer.title}</h3>
                      <div className="flex space-x-1">
                        <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-full" onClick={function () { return handleEdit(offer); }} title="Edit Offer">
                          <lucide_react_1.Pencil size={16}/>
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-full" onClick={function () { return handleDelete(offer.id); }} title="Delete Offer">
                          <lucide_react_1.Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{offer.description}</p>
                    
                    {offer.code && (<div className="mt-2 inline-block bg-gray-100 rounded-md px-2 py-1 text-sm font-mono">
                        {offer.code}
                      </div>)}
                    
                    {(offer.startDate || offer.endDate) && (<div className="flex items-center text-xs text-gray-500 mt-2">
                        <lucide_react_1.Calendar size={12} className="mr-1"/>
                        <span>
                          {offer.startDate && new Date(offer.startDate).toLocaleDateString()} 
                          {offer.endDate && " - ".concat(new Date(offer.endDate).toLocaleDateString())}
                        </span>
                      </div>)}
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button onClick={function () { return handleToggleActive(offer.id, offer.active); }} className={"px-3 py-1 text-xs rounded-full ".concat(offer.active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200')}>
                        {offer.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>); })}
            </div>) : (<div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No offers found. Click the button above to add an offer.</p>
            </div>)}
        </>)}
    </div>);
}
