import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';

function checkEntitiesExist() {
  const pattern = path.join(__dirname, '/../**/*.entity{.ts,.js}');
  const files = glob.sync(pattern);

  if (files.length === 0) {
    console.log('No entity files found');
    return false;
  }

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.log(`Entity file not found: ${file}`);
      return false;
    }
  }

  console.log('All entity files exist');
  return true;
}

export { checkEntitiesExist };
