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
exports.default = ContactSection;
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
function ContactSection() {
    var _this = this;
    var _a = (0, react_1.useState)({
        name: '',
        email: '',
        phone: '',
        message: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var _c = (0, react_1.useState)({}), errors = _c[0], setErrors = _c[1];
    var validateForm = function () {
        var newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.message.trim())
            newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors(function (prev) {
                var newErrors = __assign({}, prev);
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validateForm())
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // Simulate API call - replace with actual API call
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 2:
                    // Simulate API call - replace with actual API call
                    _a.sent();
                    react_hot_toast_1.toast.success('Your message has been sent! We will get back to you soon.');
                    // Reset form
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_hot_toast_1.toast.error('Failed to send your message. Please try again later.');
                    console.error('Contact form submission error:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<section className="py-16 sm:py-24 px-6 bg-white" id="contact">
      <div className="max-w-6xl mx-auto">
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to plan your next adventure? We're here to help.
          </p>
        </framer_motion_1.motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Information */}
          <framer_motion_1.motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-sm h-full">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <lucide_react_1.MapPinIcon className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Address</p>
                    <p className="text-gray-600">
                      Yogeshwar Twin Bauglo, 10<br />
                      New Ranip, Ahmedabad<br />
                      Gujarat 382481, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <lucide_react_1.PhoneIcon className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Phone</p>
                    <p className="text-gray-600">+91 97379 90335</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <lucide_react_1.MailIcon className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">info@shuhamtours.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Business Hours</h4>
                <p className="text-gray-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600 mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </framer_motion_1.motion.div>
          
          {/* Contact Form */}
          <framer_motion_1.motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Send Us a Message</h3>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={"w-full px-4 py-3 border rounded-lg transition-colors ".concat(errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary')} placeholder="John Doe"/>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={"w-full px-4 py-3 border rounded-lg transition-colors ".concat(errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary')} placeholder="you@example.com"/>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="+91 98765 43210"/>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className={"w-full px-4 py-3 border rounded-lg transition-colors ".concat(errors.message ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary')} placeholder="Tell us about your travel plans or questions..."></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                
                <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
                  {isSubmitting ? (<>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>) : ('Send Message')}
                </button>
              </div>
            </form>
          </framer_motion_1.motion.div>
        </div>
      </div>
    </section>);
}
