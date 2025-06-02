'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CarRentalManager;
var react_hot_toast_1 = require("react-hot-toast");
function CarRentalManager() {
    return (<div className="p-6">
      <react_hot_toast_1.Toaster position="top-right"/>
      <h1 className="text-2xl font-bold mb-6">Car Rental Management</h1>
      <p className="text-gray-500">
        This component will allow you to manage car rental options.
        Implementation in progress.
      </p>
    </div>);
}
