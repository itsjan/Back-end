// https://moment.github.io/luxon/
const {DateTime} = require('luxon')

/*
Sample output
4.12.2020 klo 14.51.30 ::1 : GET http://localhost:3000/api/members/1
*/


const logger = (req, res, next) => {
    console.log(
        `${DateTime.local().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)} ${req.ip} : ` + 
        `${req.method} ${req.protocol}://${req.get('host')}${req.path}`);
    // req.originalUrl is a combination of req.baseUrl and req.path
    // console.log(`   ${req.originalUrl}` )
    // console.dir(req.params)
    next()
}

module.exports = logger