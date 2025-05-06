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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestimonialsSection;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var image_1 = require("next/image");
function TestimonialsSection() {
    var _a = (0, react_1.useState)([]), testimonials = _a[0], setTestimonials = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        function fetchTestimonials() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, 4, 5]);
                            return [4 /*yield*/, fetch('/api/testimonials')];
                        case 1:
                            response = _a.sent();
                            if (!response.ok) {
                                throw new Error('Failed to fetch testimonials');
                            }
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            setTestimonials(data);
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Error fetching testimonials:', error_1);
                            // Fallback to demo data if fetch fails
                            setTestimonials([
                                {
                                    id: '1',
                                    name: "Priya Sharma",
                                    country: "India",
                                    feedback: "Shubham Tours planned everything perfectly for our honeymoon! The attention to detail was amazing. All the accommodations were excellent and the guides were knowledgeable.",
                                    stars: 5,
                                    image: "/images/person1.jpg"
                                },
                                {
                                    id: '2',
                                    name: "John Carter",
                                    country: "USA",
                                    feedback: "Incredible experience through the Golden Triangle. The guides were knowledgeable, accommodations excellent, and the entire journey was seamless. Would highly recommend!",
                                    stars: 5,
                                    image: "/images/person2.jpg"
                                },
                                {
                                    id: '3',
                                    name: "Emily Chen",
                                    country: "Canada",
                                    feedback: "Our Kerala tour was magical. Beautiful backwaters and excellent service from the team.",
                                    stars: 4,
                                    image: "/images/person3.jpg"
                                }
                            ]);
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        fetchTestimonials();
    }, []);
    // Stars rendering helper
    var renderStars = function (count) {
        return Array.from({ length: 5 }).map(function (_, index) { return (<lucide_react_1.Star key={index} size={16} fill={index < count ? 'currentColor' : 'none'} className={index < count ? 'text-yellow-400' : 'text-gray-300'}/>); });
    };
    if (testimonials.length === 0 && !loading) {
        return null;
    }
    return (<section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of customers who have explored the world with us
          </p>
        </framer_motion_1.motion.div>

        {loading ? (<div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(function (testimonial, idx) { return (<framer_motion_1.motion.div key={testimonial.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex mb-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    {testimonial.image ? (<image_1.default src={testimonial.image} alt={testimonial.name} fill className="object-cover"/>) : (<div className="bg-indigo-100 w-full h-full flex items-center justify-center">
                        <span className="text-indigo-700 font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    {testimonial.country && (<p className="text-sm text-gray-500">{testimonial.country}</p>)}
                  </div>
                </div>
                
                <div className="flex text-yellow-400 mb-2">
                  {renderStars(testimonial.stars)}
                </div>
                
                <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
              </framer_motion_1.motion.div>); })}
          </div>)}
      </div>
    </section>);
}
