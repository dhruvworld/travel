"use strict";
/**
 * Utility to validate required environment variables
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
exports.validateEnvs = validateEnvs;
exports.checkRequiredEnvs = checkRequiredEnvs;
/**
 * Throws an error if the environment variable is missing
 */
function validateEnv(key, throwOnError) {
    if (throwOnError === void 0) { throwOnError = true; }
    var value = process.env[key];
    if (!value && throwOnError) {
        throw new Error("Environment variable ".concat(key, " is not set"));
    }
    return value || null;
}
/**
 * Validates all required environment variables at once
 */
function validateEnvs(keys) {
    try {
        keys.forEach(function (key) { return validateEnv(key); });
        return true;
    }
    catch (error) {
        console.error("Environment validation error:", error);
        return false;
    }
}
/**
 * Check required environment variables on startup
 */
function checkRequiredEnvs() {
    var requiredEnvs = [
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL',
        'DATABASE_URL',
    ];
    // Only check these in production
    if (process.env.NODE_ENV === 'production') {
        requiredEnvs.push('GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET');
    }
    validateEnvs(requiredEnvs);
}
