const path = require('path');

// base file name
console.log(__filename);                // complete path
console.log(path.basename(__filename)); // just the file name
console.log(path.dirname(__filename));  // just the directory - same as __dirname
console.log(path.extname(__filename));  // file extension

// with a path object:
console.log(path.parse(__filename));
/*
{
  root: '/',
  dir: '/Users/johndoe/Documents/FITECH/LUT/Back-end/coursework/node_crash_course/reference',
  base: 'path_demo.js',
  ext: '.js',
  name: 'path_demo'
}
*/
var p = path.parse(__filename);
console.log(p.base); // path_demo.js

// concatenate paths - adds the correct delimiters
console.log( path.join(__dirname, 'test', 'test2', 'hello.html') );
// /.../reference/test/test2/hello.html

