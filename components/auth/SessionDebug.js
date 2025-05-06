'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionDebug = SessionDebug;
var react_1 = require("react");
var react_2 = require("next-auth/react");
var ClearAuthCookies_1 = require("./ClearAuthCookies");
function SessionDebug() {
    var _a = (0, react_2.useSession)(), session = _a.data, status = _a.status;
    var _b = (0, react_1.useState)(false), showDebug = _b[0], setShowDebug = _b[1];
    if (!showDebug) {
        return (<button onClick={function () { return setShowDebug(true); }} className="text-xs text-gray-500 underline mt-2">
        Show session debug
      </button>);
    }
    return (<div className="mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Session Debug</h3>
        <button onClick={function () { return setShowDebug(false); }} className="text-xs text-gray-500">
          Hide
        </button>
      </div>
      
      <div className="text-xs">
        <p>Status: <span className="font-semibold">{status}</span></p>
        {status === 'authenticated' ? (<pre className="mt-2 p-2 bg-gray-100 overflow-auto text-xs">
            {JSON.stringify(session, null, 2)}
          </pre>) : null}
      </div>
      
      <div className="mt-2">
        <ClearAuthCookies_1.ClearAuthCookies />
      </div>
    </div>);
}
