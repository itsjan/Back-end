const url = require('url');

const myUrl = new URL('https://www.youtube.com/watch?v=fBNz5xF-Kx4');

const myUrl2 = new URL('https://www.youtube.com:8080');


// Serialised URL
console.log ( myUrl.href);          // https://www.youtube.com/watch?v=fBNz5xF-Kx4
console.log ( myUrl.toString());    // https://www.youtube.com/watch?v=fBNz5xF-Kx4
// Host (root domain)
console.log(myUrl2.host);       // www.youtube.com:8080
// Hostname
console.log(myUrl2.hostname);   // www.youtube.com
// Pathname
console.log( myUrl.pathname);   // /watch
// Serialised query
console.log( myUrl.search);     // ?v=fBNz5xF-Kx4
// Params object
console.log( myUrl.searchParams); // URLSearchParams { 'v' => 'fBNz5xF-Kx4' }
myUrl.searchParams.append('ab' , '12');
console.log( myUrl.searchParams); // URLSearchParams { 'v' => 'fBNz5xF-Kx4', 'ab' => '12' }
// Loop through params
myUrl.searchParams.forEach((value,key) => console.log(`${key} : ${value}`));
    //  v : fBNz5xF-Kx4
    //  ab : 12
