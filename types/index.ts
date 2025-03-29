// Instead of:
// function handleData(data: any) {
// Use specific types or unknown:
function handleData(data: unknown) {
  // Type guard to check data structure
  if (typeof data === 'object' && data !== null) {
    // Process data
  }
}
