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
exports.default = TestimonialsEditor;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
function TestimonialsEditor() {
    var _this = this;
    var _a = (0, react_1.useState)([]), testimonials = _a[0], setTestimonials = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), editingId = _c[0], setEditingId = _c[1];
    var _d = (0, react_1.useState)(null), editForm = _d[0], setEditForm = _d[1];
    var _e = (0, react_1.useState)({
        name: '',
        country: '',
        feedback: '',
        stars: 5,
        image: ''
    }), newTestimonial = _e[0], setNewTestimonial = _e[1];
    var _f = (0, react_1.useState)(false), showAddForm = _f[0], setShowAddForm = _f[1];
    (0, react_1.useEffect)(function () {
        fetchTestimonials();
    }, []);
    function fetchTestimonials() {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        setLoading(true);
                        return [4 /*yield*/, fetch('/api/admin/testimonials')];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error('Failed to fetch testimonials');
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setTestimonials(data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching testimonials:', error_1);
                        react_hot_toast_1.toast.error('Failed to load testimonials');
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    var handleInputChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setNewTestimonial(__assign(__assign({}, newTestimonial), (_a = {}, _a[name] = name === 'stars' ? Math.min(5, Math.max(1, parseInt(value))) : value, _a)));
    };
    var handleEditChange = function (e) {
        var _a;
        if (!editForm)
            return;
        var _b = e.target, name = _b.name, value = _b.value;
        setEditForm(__assign(__assign({}, editForm), (_a = {}, _a[name] = name === 'stars' ? Math.min(5, Math.max(1, parseInt(value))) : value, _a)));
    };
    var handleAddTestimonial = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, addedTestimonial, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!newTestimonial.name || !newTestimonial.feedback) {
                        react_hot_toast_1.toast.error('Name and feedback are required');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/admin/testimonials', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newTestimonial)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to add testimonial');
                    return [4 /*yield*/, response.json()];
                case 3:
                    addedTestimonial = _a.sent();
                    setTestimonials(__spreadArray([addedTestimonial], testimonials, true));
                    setNewTestimonial({
                        name: '',
                        country: '',
                        feedback: '',
                        stars: 5,
                        image: ''
                    });
                    setShowAddForm(false);
                    react_hot_toast_1.toast.success('Testimonial added successfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error adding testimonial:', error_2);
                    react_hot_toast_1.toast.error('Failed to add testimonial');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleUpdateTestimonial = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, updatedTestimonial_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editForm)
                        return [2 /*return*/];
                    if (!editForm.name || !editForm.feedback) {
                        react_hot_toast_1.toast.error('Name and feedback are required');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/admin/testimonials', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(editForm)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to update testimonial');
                    return [4 /*yield*/, response.json()];
                case 3:
                    updatedTestimonial_1 = _a.sent();
                    setTestimonials(testimonials.map(function (t) {
                        return t.id === updatedTestimonial_1.id ? updatedTestimonial_1 : t;
                    }));
                    setEditingId(null);
                    setEditForm(null);
                    react_hot_toast_1.toast.success('Testimonial updated successfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error updating testimonial:', error_3);
                    react_hot_toast_1.toast.error('Failed to update testimonial');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteTestimonial = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this testimonial?'))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/admin/testimonials', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: id })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to delete testimonial');
                    setTestimonials(testimonials.filter(function (t) { return t.id !== id; }));
                    react_hot_toast_1.toast.success('Testimonial deleted successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error deleting testimonial:', error_4);
                    react_hot_toast_1.toast.error('Failed to delete testimonial');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleToggleActive = function (id, currentActive) { return __awaiter(_this, void 0, void 0, function () {
        var response, updatedTestimonial_2, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/admin/testimonials', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: id,
                                active: !currentActive
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error('Failed to update testimonial');
                    return [4 /*yield*/, response.json()];
                case 2:
                    updatedTestimonial_2 = _a.sent();
                    setTestimonials(testimonials.map(function (t) {
                        return t.id === id ? updatedTestimonial_2 : t;
                    }));
                    react_hot_toast_1.toast.success("Testimonial ".concat(!currentActive ? 'activated' : 'deactivated'));
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error('Error updating testimonial:', error_5);
                    react_hot_toast_1.toast.error('Failed to update testimonial');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Stars rendering helper
    var renderStars = function (count) {
        return Array.from({ length: 5 }).map(function (_, index) { return (<lucide_react_1.Star key={index} size={16} fill={index < count ? 'currentColor' : 'none'} className={index < count ? 'text-yellow-400' : 'text-gray-300'}/>); });
    };
    if (loading) {
        return (<div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading testimonials...</span>
      </div>);
    }
    return (<div className="space-y-6">
      <button onClick={function () { return setShowAddForm(!showAddForm); }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {showAddForm ? 'Cancel' : 'Add New Testimonial'}
      </button>
      
      {showAddForm && (<div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Add New Testimonial</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" name="name" value={newTestimonial.name} onChange={handleInputChange} className="w-full p-2 border rounded"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input type="text" name="country" value={newTestimonial.country} onChange={handleInputChange} className="w-full p-2 border rounded"/>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback *</label>
              <textarea name="feedback" value={newTestimonial.feedback} onChange={handleInputChange} rows={3} className="w-full p-2 border rounded"></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5 stars)</label>
                <input type="number" name="stars" min="1" max="5" value={newTestimonial.stars} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                <div className="flex mt-2">
                  {renderStars(newTestimonial.stars)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" name="image" value={newTestimonial.image} onChange={handleInputChange} className="w-full p-2 border rounded"/>
              </div>
            </div>
            
            <button onClick={handleAddTestimonial} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Add Testimonial
            </button>
          </div>
        </div>)}
      
      <div className="space-y-4">
        {testimonials.length > 0 ? (testimonials.map(function (testimonial) { return (<div key={testimonial.id} className={"border p-4 rounded-lg ".concat(!testimonial.active ? 'opacity-70 bg-gray-50' : 'bg-white')}>
              {editingId === testimonial.id ? (
            // Edit mode
            <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input type="text" name="name" value={editForm === null || editForm === void 0 ? void 0 : editForm.name} onChange={handleEditChange} className="w-full p-2 border rounded"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input type="text" name="country" value={editForm === null || editForm === void 0 ? void 0 : editForm.country} onChange={handleEditChange} className="w-full p-2 border rounded"/>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feedback *</label>
                    <textarea name="feedback" value={editForm === null || editForm === void 0 ? void 0 : editForm.feedback} onChange={handleEditChange} rows={3} className="w-full p-2 border rounded"></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5 stars)</label>
                      <input type="number" name="stars" min="1" max="5" value={editForm === null || editForm === void 0 ? void 0 : editForm.stars} onChange={handleEditChange} className="w-full p-2 border rounded"/>
                      <div className="flex mt-2">
                        {editForm ? renderStars(editForm.stars) : null}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input type="text" name="image" value={editForm === null || editForm === void 0 ? void 0 : editForm.image} onChange={handleEditChange} className="w-full p-2 border rounded"/>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button onClick={function () {
                    setEditingId(null);
                    setEditForm(null);
                }} className="flex items-center px-3 py-1.5 border rounded">
                      <lucide_react_1.X size={14} className="mr-1"/> Cancel
                    </button>
                    <button onClick={handleUpdateTestimonial} className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <lucide_react_1.Save size={14} className="mr-1"/> Save
                    </button>
                  </div>
                </div>) : (
            // View mode
            <>
                  <div className="flex justify-between">
                    <div className="flex">
                      {testimonial.image && (<div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover"/>
                        </div>)}
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        {testimonial.country && <p className="text-sm text-gray-500">{testimonial.country}</p>}
                        <div className="flex mt-1">
                          {renderStars(testimonial.stars)}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={function () { return handleToggleActive(testimonial.id, testimonial.active); }} className={"px-3 py-1 rounded text-white ".concat(testimonial.active ? 'bg-amber-500' : 'bg-green-500')}>
                        {testimonial.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={function () {
                    setEditingId(testimonial.id);
                    setEditForm(testimonial);
                }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                        <lucide_react_1.Edit size={16}/>
                      </button>
                      <button onClick={function () { return handleDeleteTestimonial(testimonial.id); }} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                        <lucide_react_1.Trash size={16}/>
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 italic">"{testimonial.feedback}"</p>
                </>)}
            </div>); })) : (<div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
            No testimonials found. Add some using the button above.
          </div>)}
      </div>
    </div>);
}
