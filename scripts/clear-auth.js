// This script is meant to be run in a browser console to clear NextAuth cookies
// Copy and paste into your browser's developer console and run it

console.log("Clearing all NextAuth cookies...");

// Get all cookies
const cookies = document.cookie.split(";");

// Filter for NextAuth cookies and delete them
let count = 0;
cookies.forEach(cookie => {
  // NextAuth cookies typically start with next-auth
  if (cookie.trim().startsWith("next-auth")) {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Deleted cookie: ${cookieName}`);
    count++;
  }
});

console.log(`Cleared ${count} NextAuth cookies.`);
console.log("Please refresh the page.");
