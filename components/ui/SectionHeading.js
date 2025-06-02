"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHeading = SectionHeading;
var utils_1 = require("@/lib/utils");
function SectionHeading(_a) {
    var title = _a.title, description = _a.description, className = _a.className, props = __rest(_a, ["title", "description", "className"]);
    return (<div className={(0, utils_1.cn)("text-center", className)} {...props}>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {description && (<p className="mt-4 text-lg text-gray-600">{description}</p>)}
    </div>);
}
