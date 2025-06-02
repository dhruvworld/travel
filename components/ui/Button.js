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
exports.Button = Button;
var link_1 = require("next/link");
var utils_1 = require("@/lib/utils");
function Button(_a) {
    var children = _a.children, className = _a.className, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, href = _a.href, target = _a.target, props = __rest(_a, ["children", "className", "variant", "href", "target"]);
    var baseStyles = "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md";
    var variantStyles = {
        primary: "text-white bg-blue-600 hover:bg-blue-700",
        secondary: "text-white bg-gray-600 hover:bg-gray-700",
        outline: "text-blue-600 border-blue-600 hover:bg-blue-50"
    };
    var classes = (0, utils_1.cn)(baseStyles, variantStyles[variant], className);
    if (href) {
        return (<link_1.default href={href} target={target} className={classes}>
        {children}
      </link_1.default>);
    }
    return (<button className={classes} {...props}>
      {children}
    </button>);
}
