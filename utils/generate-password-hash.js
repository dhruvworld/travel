const bcrypt = require('bcryptjs');

// The password you want to hash
const password = process.argv[2] || 'admin123';

// Generate a salt
const salt = bcrypt.genSaltSync(10);

// Hash the password
const hash = bcrypt.hashSync(password, salt);

console.log('Password:', password);
console.log('Hashed Password:', hash);
console.log('\nAdd this to your .env.local file:');
console.log('ADMIN_PASSWORD_HASH="' + hash + '"');
