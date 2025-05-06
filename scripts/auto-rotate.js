"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/auto-rotate.ts
var child_process_1 = require("child_process");
var date_fns_1 = require("date-fns");
function runScript() {
    var time = (0, date_fns_1.format)(new Date(), 'Pp');
    console.log("[".concat(time, "] Running rotate-featured..."));
    (0, child_process_1.exec)('npm run rotate-featured', function (err, stdout, stderr) {
        if (err)
            console.error("[".concat(time, "] \u274C"), err.message);
        if (stderr)
            console.warn("[".concat(time, "] \u26A0\uFE0F"), stderr);
        if (stdout)
            console.log("[".concat(time, "] \u2705"), stdout);
    });
}
runScript(); // First run
setInterval(runScript, 60 * 60 * 1000); // Repeat every hour
