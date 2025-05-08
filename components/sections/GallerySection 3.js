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
exports.default = GallerySection;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
function GallerySection() {
    var _a = (0, react_1.useState)([]), images = _a[0], setImages = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        function fetchGalleryImages() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, 4, 5]);
                            return [4 /*yield*/, fetch('/api/gallery')];
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
                            console.error('Error fetching gallery images:', error_1);
                            // Fallback to demo data if fetch fails
                            setImages([
                                { id: '1', title: 'Taj Mahal at sunrise', url: '/images/taj-mahal.jpg' },
                                { id: '2', title: 'Kerala Backwaters', url: '/images/kerala-backwaters.jpg' },
                                { id: '3', title: 'Rajasthan Desert', url: '/images/rajasthan.jpg' },
                                { id: '4', title: 'Himalayas', url: '/images/himalayas.jpg' },
                                { id: '5', title: 'Goa Beaches', url: '/images/goa.jpg' },
                                { id: '6', title: 'Varanasi Ghats', url: '/images/varanasi.jpg' },
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
        fetchGalleryImages();
    }, []);
    // Only display at most 6 images in the homepage section
    var displayImages = images.slice(0, 6);
    if (displayImages.length === 0 && !loading) {
        return null;
    }
    return (<section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
            Gallery
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Explore India Through Our Lens
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beautiful moments captured during our journeys across incredible destinations
          </p>
        </framer_motion_1.motion.div>

        {loading ? (<div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          </div>) : (<>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {displayImages.map(function (image, idx) { return (<framer_motion_1.motion.div key={image.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="relative rounded-xl overflow-hidden aspect-square group">
                  <image_1.default src={image.url} alt={image.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 33vw"/>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-white text-center px-4">
                      <p className="font-semibold">{image.title}</p>
                    </div>
                  </div>
                </framer_motion_1.motion.div>); })}
            </div>

            <div className="text-center mt-12">
              <link_1.default href="/gallery" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                View Full Gallery 
                <lucide_react_1.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </link_1.default>
            </div>
          </>)}
      </div>
    </section>);
}
