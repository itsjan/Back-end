const fs = require('fs');
const path = require('path');

// Create a folder

// fs.mkdir(path.join(__dirname, 'test'), {}, err => {
//     if (err) throw err;
//     console.log('Folder created..')
// });

// Files

// Create and write


fs.writeFile( // this overwrites the previous contents
    path.join(__dirname, 'test', 'hello.txt'), 
    ' Hello World!!!', err => {
        if (err) throw err;
        console.log('File written to ..')

        // Append to file

        fs.appendFile( // this overwrites the previous contents
            path.join(__dirname, 'test', 'hello.txt'), 
            ' I love nodejs', err => {
                if (err) throw err;
                console.log('File written to ..');
                
                // Read data from file

                fs.readFile(
                    path.join(__dirname, 'test', 'hello.txt'), 
                    'utf-8', // if not given, will return raw data
                    (err, data) => {
                        if (err) throw err;
                        console.log(data);

                        // Rename file

                        fs.rename(
                            path.join(__dirname, 'test', 'hello.txt'), 
                            path.join(__dirname, 'test', 'helloworld.txt'),
                            err => {
                                if (err) throw err;
                                console.log('File renamed ..');
                            }
                        )
                    }
                )


        });
});






