const express = require('express');
const router = express.Router();
const Model = require('../models/user');

/**
 * @api {get} / Users
 * @apiName GetUsers
 * @apiGroup User Lookup
 * @apiVersion 0.1.0
 * @apiSampleRequest /users/
 * @apiSuccess (200) {Array} data Array of User objects. 
 * @apiSuccessExample {json} 200 Success - Default Payload
  * HTTP/1.1 200 OK
  * X-Powered-By: Express
  * Content-Type: application/json; charset=utf-8
  * Content-Length: 544
  * ETag: W/"220-TSVzoZkcgfNBAjr28gfgGKRU1TM"
  * Date: Sun, 06 Dec 2020 15:56:14 GMT
  * Connection: close
  * 
  * {
  *   "data": [
  *     {
  *       "_id": "5fcce2097838c4acd66ac06e",
  *       "name": {
  *         "first": "John",
  *         "last": "Doe"
  *       },
  *       "username": "johndoe",
  *       "email": "johndoe@email.com",
  *       "__v": 0
  *     },
  *     {
  *       "_id": "5fcce5e233a1eaaede0ce90c",
  *       "name": {
  *         "first": "John",
  *         "last": "Doe Junior"
  *       },
  *       "username": "johndoejr",
  *       "email": "john.doe.jr@email.com",
  *       "__v": 0
  *     },
  *     {
  *       "_id": "5fccfe41623c46b8edc21eb8",
  *       "name": {
  *         "first": "Alice",
  *         "last": "Doe"
  *       },
  *       "username": "alice99",
  *       "email": "alice.doe.jr@email.com",
  *       "__v": 0
  *     },
  *     {
  *       "_id": "5fccfe58623c46b8edc21eb9",
  *       "name": {
  *         "first": "Bob",
  *         "last": "Doe"
  *       },
  *       "username": "bobdoe",
  *       "email": "b.doe.jr@email.com",
  *       "__v": 0
  *     }
  *   ]
  * }
  * 
  */

router.get('/', async (req, res) => {
    try {
        const data = await Model.find().lean();
        res.json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @api {get} /by/username/:username User by Username
 * @apiName GetUserByUsername
 * @apiGroup User Lookup
 * @apiVersion 0.1.0
 *
 * @apiParam {String{6..30}} username User's unique handle.
 * @apiSampleRequest /users/by/username/johndoe
 * @apiSuccess (200) {String} _id 
 * @apiSuccess (200) {String} email User's email address.
 * @apiSuccess (200) {Object} name User's full name.
 * @apiSuccess (200) {String} name.first User's first name.
 * @apiSuccess (200) {String} name.last User's last name.
 * @apiSuccessExample {json} 200 Success - Default Payload
  * HTTP/1.1 200 OK
  * X-Powered-By: Express
  * Content-Type: application/json; charset=utf-8
  * Content-Length: 137
  * ETag: W/"89-eyym1vTkAsu+bR98D/B3g926rrc"
  * Date: Sun, 06 Dec 2020 15:00:59 GMT
  * Connection: close
  * 
  * {
  *   "data": {
  *     "_id": "5fcce2097838c4acd66ac06e",
  *     "name": {
  *       "first": "John",
  *       "last": "Doe"
  *     },
  *     "username": "johndoe",
  *     "email": "johndoe@email.com",
  *     "__v": 0
  *   }
  * }
  * @apiSuccessExample {json} 200 Success - User is not found
  * {
  *   "data": {
  *     "_id": "5fcce2097838c4acd66ac06e",
  *     "name": {
  *       "first": "John",
  *       "last": "Doe"
  *     },
  *     "username": "johndoe",
  *     "email": "johndoe@email.com",
  *     "__v": 0
  *   }
  * }
  */


router.get('/by/username/:username', async (req, res) => {
    try {
        const data = await Model.findOne().byUserName(req.params.username).lean();
        if (data) {
            return res.status(200).json({ data });
        }
        else {
            return res.status(200).json({
                "inputs": {
                    "query": req.query,
                    "params": req.params,
                    "notfound": req.params.username,
                    "message": `No user exists with name ${req.params.username}`
                }
            });

        }
    }

    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
 * @api {get} /by?usernames= Users by Username
 * @apiName GetUsersByUsername
 * @apiGroup User Lookup
 * @apiVersion 0.1.0
 *
 * @apiParam usernames Required. A comma-separated list of usernames.
 * @apiSampleRequest /users/by?usernames=johndoe,johndoejr
 * @apiSuccess (200) {Array} data Array of User objects. 
 * @apiSuccessExample {json} 200 Success - Default Payload:
 * HTTP/1.1 200 OK
 * X-Powered-By: Express
 * Content-Type: application/json; charset=utf-8
 * Content-Length: 281
 * ETag: W/"119-al5TgS5k3ClGrA9b8Xjc5RhP+6s"
 * Date: Sun, 06 Dec 2020 18:03:33 GMT
 * Connection: close
 * 
 * {
 *   "data": [
 *     {
 *       "name": {
 *         "first": "John",
 *         "last": "Doe"
 *       },
 *       "_id": "5fcce2097838c4acd66ac06e",
 *       "username": "johndoe",
 *       "email": "johndoe@email.com",
 *       "__v": 0
 *     },
 *     {
 *       "name": {
 *         "first": "John",
 *         "last": "Doe Junior"
 *       },
 *       "_id": "5fcce5e233a1eaaede0ce90c",
 *       "username": "johndoejr",
 *       "email": "john.doe.jr@email.com",
 *       "__v": 0
 *     }
 *   ]
 * }
 * 
 * @apiSuccessExample {json} 200 Success - Some users not found:
 * HTTP/1.1 200 OK
 * X-Powered-By: Express
 * Content-Type: application/json; charset=utf-8
 * Content-Length: 260
 * ETag: W/"104-mKLQWfO2cWFSD4Qtu5JEmiN40RQ"
 * Date: Sun, 06 Dec 2020 18:02:39 GMT
 * Connection: close
 * 
 * {
 *   "inputs": {
 *     "query": {
 *       "usernames": "johndoejr,MissX"
 *     },
 *     "params": {}
 *   },
 *   "data": [
 *     {
 *       "name": {
 *         "first": "John",
 *         "last": "Doe Junior"
 *       },
 *       "_id": "5fcce5e233a1eaaede0ce90c",
 *       "username": "johndoejr",
 *       "email": "john.doe.jr@email.com",
 *       "__v": 0
 *     }
 *   ],
 *   "notfound": [
 *     "MissX"
 *   ],
 *   "message": "Found 1 / 2"
 * }
 * 
 */

router.get('/by/', async (req, res) => {
    let { usernames } = req.query;

    if (!usernames) {
        return res.status(400)
            .json({
                "inputs": {
                    "query": req.query,
                    "params": req.params,
                    "message": `query parameter 'usernames' is required`
                }
            });

    }

    var usernamesArray = usernames.split(',');
    var userData;

    try {
        await Model.find().byUserNames(usernamesArray).exec((err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (data.length === usernamesArray.length) { // all users were found
                return res.status(200).json({ data });
            }
            else {
                var missingUsernames = [];
                if (data.length) {
                    let returnedUsernames = data.map(user => user.username);
                    missingUsernames = usernamesArray.filter(username => returnedUsernames.indexOf(username) < 0);
                }
                else { // data == []
                    missingUsernames = usernamesArray;
                }
                res.status(200).json({
                    "inputs": {
                        "query": req.query,
                        "params": req.params
                    },
                    data,
                    "notfound": missingUsernames,
                    "message": `Found ${data.length} / ${usernamesArray.length}`
                }
                )
            }
        });


    } catch (error) {
        res.status(500).json({ message: error.message })
    }


});


// CREATE
router.post('/', async (req, res) => {

    const newModel = new Model(req.body);
    try {
        const savedModel = await newModel.save();
        res.status(201).json(savedModel)
    } catch (error) {
        res.status(400).json({ error: error })
    }
});

// UPDATE

router.put('/:username', async (req, res) => {
    try {
        const data = await Model.findOne().byUserName(req.params.username);
        if (data) {

            await Model.findByIdAndUpdate(data._id, req.body)

            const updatedModel = await Model.findOne().byUserName(req.params.username)
            res.status(202).json({ "message": "User updated", "user": updatedModel });
        }
        else
            res.status(400).json({ message: "User not found!" });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// DELETE

router.delete('/:username', async (req, res) => {
    try {
        const data = await Model.findOne().byUserName(req.params.username);
        if (data) {

            await Model.findByIdAndDelete(data._id)

            res.status(200).json({ "message": "User deleted" });
        }
        else
            res.status(400).json({ message: "User not found!" });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});



module.exports = router;