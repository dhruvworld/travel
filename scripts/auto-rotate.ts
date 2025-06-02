// scripts/auto-rotate.ts
import { exec } from 'child_process';
import { format } from 'date-fns';

function runScript() {
  const time = format(new Date(), 'Pp');
  console.log(`[${time}] Running rotate-featured...`);

  exec('npm run rotate-featured', (err, stdout, stderr) => {
    if (err) console.error(`[${time}] ❌`, err.message);
    if (stderr) console.warn(`[${time}] ⚠️`, stderr);
    if (stdout) console.log(`[${time}] ✅`, stdout);
  });
}

runScript(); // First run
setInterval(runScript, 60 * 60 * 1000); // Repeat every hour
