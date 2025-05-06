'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthProvider;
var react_1 = require("next-auth/react");
function AuthProvider(_a) {
    var children = _a.children, session = _a.session;
    return (<react_1.SessionProvider session={session}>
      {children}
    </react_1.SessionProvider>);
}
