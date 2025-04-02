/**
 * Utility to validate required environment variables
 */

/**
 * Throws an error if the environment variable is missing
 */
export function validateEnv(
  key: string,
  throwOnError: boolean = true
): string | null {
  const value = process.env[key];
  
  if (!value && throwOnError) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  
  return value || null;
}

/**
 * Validates all required environment variables at once
 */
export function validateEnvs(keys: string[]): boolean {
  try {
    keys.forEach(key => validateEnv(key));
    return true;
  } catch (error) {
    console.error("Environment validation error:", error);
    return false;
  }
}

/**
 * Check required environment variables on startup
 */
export function checkRequiredEnvs(): void {
  const requiredEnvs = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'DATABASE_URL',
  ];
  
  // Only check these in production
  if (process.env.NODE_ENV === 'production') {
    requiredEnvs.push(
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
    );
  }
  
  validateEnvs(requiredEnvs);
}
