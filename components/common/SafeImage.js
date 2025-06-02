'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SafeImage;
var react_1 = require("react");
var image_1 = require("next/image");
var imageUtils_1 = require("@/lib/imageUtils");
function SafeImage(props) {
    var _a = (0, react_1.useState)(false), error = _a[0], setError = _a[1];
    var _b = (0, react_1.useState)(props.src), imageSrc = _b[0], setImageSrc = _b[1];
    (0, react_1.useEffect)(function () {
        // Reset error state when src changes
        setError(false);
        setImageSrc(props.src);
    }, [props.src]);
    var handleError = function () {
        // First try the mapped path
        var mappedPath = (0, imageUtils_1.getValidImagePath)(props.src);
        if (mappedPath !== props.src) {
            setImageSrc(mappedPath);
        }
        else {
            // If still failing or no mapping exists, use default fallback
            setError(true);
        }
    };
    return (<image_1.default {...props} src={error ? '/images/placeholder-package.jpg' : imageSrc} onError={handleError} alt={props.alt || 'Image'}/>);
}
