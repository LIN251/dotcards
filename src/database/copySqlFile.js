const copyfiles = require('copyfiles');


copyfiles(['src/database/setupDatabase.sql', 'dist'], { up: 1 }, (err) => {
  if (err) {
    console.error('Error copying SQL file:', err);
  } else {
    console.log('SQL file copied to dist folder.');
  }
});