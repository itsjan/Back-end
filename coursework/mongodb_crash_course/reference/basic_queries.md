

[Cheatography](https://cheatography.com/isaeus/cheat-sheets/mongodb/)


# insert

```json
db.posts.insert ({
    title : 'Post One',
    body: 'Body of post one',
    category: 'News',
    likes: 4,
    tags: ['news', 'events'],
    user: {
        name: 'John Doe',
        status: 'author'
    },
    date: Date()
})
```

Response:

```
WriteResult({ "nInserted" : 1 })
```

# insertMany

```
db.posts.insertMany([
    {
        title : 'Post Two',
        body: 'Body of post two',
        category: 'News',
        date: Date()
    },
    {
        title : 'Post Three',
        body: 'Body of post three',
        category: 'Politics',
        date: Date()
    },
    {
        title : 'Post Four',
        body: 'Body of post two',
        category: 'Entertainment',
        date: Date()
    },  
])
```

Response:
```
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5fbcf15bac64cd285b46971b"),
                ObjectId("5fbcf15bac64cd285b46971c"),
                ObjectId("5fbcf15bac64cd285b46971d")
        ]
}
```
# find all posts

```json
db.posts.find()
{ "_id" : ObjectId("5fbcf08cac64cd285b46971a"), "title" : "Post One", "body" : "Body of post one", "category" : "News", "likes" : 4, "tags" : [ "news", "events" ], "user" : { "name" : "John Doe", "status" : "author" }, "date" : "Tue Nov 24 2020 13:37:48 GMT+0200 (EET)" }
{ "_id" : ObjectId("5fbcf15bac64cd285b46971b"), "title" : "Post Two", "body" : "Body of post two", "category" : "News", "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)" }
{ "_id" : ObjectId("5fbcf15bac64cd285b46971c"), "title" : "Post Three", "body" : "Body of post three", "category" : "Politics", "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)" }
{ "_id" : ObjectId("5fbcf15bac64cd285b46971d"), "title" : "Post Four", "body" : "Body of post two", "category" : "Entertainment", "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)" }
```

### pretty()

```json
> db.posts.find().pretty()

{
        "_id" : ObjectId("5fbcf08cac64cd285b46971a"),
        "title" : "Post One",
        "body" : "Body of post one",
        "category" : "News",
        "likes" : 4,
        "tags" : [
                "news",
                "events"
        ],
        "user" : {
                "name" : "John Doe",
                "status" : "author"
        },
        "date" : "Tue Nov 24 2020 13:37:48 GMT+0200 (EET)"
}
{
        "_id" : ObjectId("5fbcf15bac64cd285b46971b"),
        "title" : "Post Two",
        "body" : "Body of post two",
        "category" : "News",
        "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)"
}
{
        "_id" : ObjectId("5fbcf15bac64cd285b46971c"),
        "title" : "Post Three",
        "body" : "Body of post three",
        "category" : "Politics",
        "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)"
}
{
        "_id" : ObjectId("5fbcf15bac64cd285b46971d"),
        "title" : "Post Four",
        "body" : "Body of post two",
        "category" : "Entertainment",
        "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)"
}
```

# Find all posts in the News category

```json
> db.posts.find({ category: 'News'  }).pretty()
{
        "_id" : ObjectId("5fbcf08cac64cd285b46971a"),
        "title" : "Post One",
        "body" : "Body of post one",
        "category" : "News",
        "likes" : 4,
        "tags" : [
                "news",
                "events"
        ],
        "user" : {
                "name" : "John Doe",
                "status" : "author"
        },
        "date" : "Tue Nov 24 2020 13:37:48 GMT+0200 (EET)"
}
{
        "_id" : ObjectId("5fbcf15bac64cd285b46971b"),
        "title" : "Post Two",
        "body" : "Body of post two",
        "category" : "News",
        "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)"
}
```

# Filter by fields ($gt, etc)
  
|   |   |
|---|---|
| $gt   | >  |
| $gte  | >= |
| $lt   | <  |
| $lte  | <= |


```json
> db.posts.find ( { views : { $gt: 7}}).pretty()
{
        "_id" : ObjectId("5fbcf15bac64cd285b46971b"),
        "title" : "Post Two",
        "body" : "Post two body",
        "date" : "Tue Nov 24 2020 14:56:59 GMT+0200 (EET)",
        "category" : "Technology",
        "views" : 10
}
```

# Sort results by a field

- 1: Ascending, -1 Descending

```json
> db.posts.find().sort({title : 1}).pretty()
{
        "_id" : ObjectId("5fbcf15bac64cd285b46971d"),
        "title" : "Post Four",
        "body" : "Body of post two",
        "category" : "Entertainment",
        "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)"
}
....

{
        "_id" : ObjectId("5fbcf15bac64cd285b46971b"),
        "title" : "Post Two",
        "body" : "Body of post two",
        "category" : "News",
        "date" : "Tue Nov 24 2020 13:41:15 GMT+0200 (EET)"
}
```

# Count documents

```
> db.posts.find({ category: 'News'  }).count()

2
```

# update
koko dokumentti korvataan
upsert: update or insert

```json
db.posts.update ( {  title: 'Post Two'},
{
    title: 'Post Two',
    body: ' NEW post 2 body',
    date: Date()
},
{
    upsert: true
})
```
Result
```
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```
Query..
```
> db.posts.find({title:'Post two'}).pretty()
> db.posts.find({title:'Post Two'}).pretty()
{
        "_id" : ObjectId("5fbcf15bac64cd285b46971b"),
        "title" : "Post Two",
        "body" : " NEW post 2 body",
        "date" : "Tue Nov 24 2020 14:56:59 GMT+0200 (EET)"
}
```

The entire document was replaced; field category is missing from the document after the update.

To update only some fields in a document, use **$set**

```json

db.posts.update( { title : 'Post Two'},
{
    $set: {
        body : 'Post two body',
        category: 'Technology'
    }    
})


```

WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })


```json
> db.posts.find({title:'Post Two'}).pretty()
{
        "_id" : ObjectId("5fbcf15bac64cd285b46971b"),
        "title" : "Post Two",
        "body" : "Post two body",
        "date" : "Tue Nov 24 2020 14:56:59 GMT+0200 (EET)",
        "category" : "Technology"
}
```

# Other operators

## increment field value

Use **$inc**

db.posts.update ( {title: 'Post One' }, { $inc: { likes: 2 }})

```json
> db.posts.update ( {title: 'Post One' }, { $inc: { likes: 2 }})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.posts.find( { title : 'Post One' }).pretty()
{
        "_id" : ObjectId("5fbcf08cac64cd285b46971a"),
        "title" : "Post One",
        "body" : "Body of post one",
        "category" : "News",
        "likes" : 6,
        "tags" : [
                "news",
                "events"
        ],
        "user" : {
                "name" : "John Doe",
                "status" : "author"
        },
        "date" : "Tue Nov 24 2020 13:37:48 GMT+0200 (EET)"
}
```

# rename a field

Rename field _likes_ to _views_

```json
> db.posts.update ( {title: 'Post One' }, { $rename: { likes: 'views' }})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.posts.find( { title : 'Post One' }).pretty()
{
        "_id" : ObjectId("5fbcf08cac64cd285b46971a"),
        "title" : "Post One",
        "body" : "Body of post one",
        "category" : "News",
        "tags" : [
                "news",
                "events"
        ],
        "user" : {
                "name" : "John Doe",
                "status" : "author"
        },
        "date" : "Tue Nov 24 2020 13:37:48 GMT+0200 (EET)",
        "views" : 6
}
```

# delete a document

```
> db.posts.remove( { title : 'Post Four' })
WriteResult({ "nRemoved" : 1 })
```

# update $set

```json
db.posts.update({ title : 'Post One'},
    {
        $set: {
            comments: [
                {
                    user: 'Mary W',
                    body: 'Comment from MW',
                    date: Date()
                },
                {
                    user: 'Bob',
                    body: 'This is good',
                    date: Date()
                }
            ]
        }
    }
)


WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

```

```
db.posts.find( { title : 'Post One' }).pretty()
{
        "_id" : ObjectId("5fbcf08cac64cd285b46971a"),
        "title" : "Post One",
        "body" : "Body of post one",
        "category" : "News",
        "tags" : [
                "news",
                "events"
        ],
        "user" : {
                "name" : "John Doe",
                "status" : "author"
        },
        "date" : "Tue Nov 24 2020 13:37:48 GMT+0200 (EET)",
        "views" : 6,
        "comments" : [
                {
                        "user" : "Mary W",
                        "body" : "Comment from MW",
                        "date" : "Tue Nov 24 2020 15:28:29 GMT+0200 (EET)"
                },
                {
                        "user" : "Bob",
                        "body" : "This is good",
                        "date" : "Tue Nov 24 2020 15:28:29 GMT+0200 (EET)"
                }
        ]
}
```

#  $elemMatch

Find posts with comments from Mary
```json
db.posts.find ( {
    comments: {
        $elemMatch: {
            user: 'Mary W'
        }
    }
}).pretty()


{
        "_id" : ObjectId("5fbcf08cac64cd285b46971a"),
        "title" : "Post One",
        "body" : "Body of post one",
        "category" : "News",
        "tags" : [
                "news",
                "events"
        ],
        "user" : {
                "name" : "John Doe",
                "status" : "author"
        },
        "date" : "Tue Nov 24 2020 13:37:48 GMT+0200 (EET)",
        "views" : 6,
        "comments" : [
                {
                        "user" : "Mary W",
                        "body" : "Comment from MW",
                        "date" : "Tue Nov 24 2020 15:28:29 GMT+0200 (EET)"
                },
                {
                        "user" : "Bob",
                        "body" : "This is good",
                        "date" : "Tue Nov 24 2020 15:28:29 GMT+0200 (EET)"
                }
        ]
}
```

# Creating an index

```

> db.posts.createIndex({ title : 'text'})

{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}
```
## Using $text search.

This only searches in indexed fields.

```


db.posts.find({
    $text: {
        $search: "\"Body o\""
    }
}).pretty()

```
Response:

```

{
        "_id" : ObjectId("5fbcf08cac64cd285b46971a"),
        "title" : "Post One",
        "body" : "Body of post one",
        "category" : "News",
        "tags" : [
                "news",
                "events"
        ],
        "user" : {
                "name" : "John Doe",
                "status" : "author"
        },
        "date" : "Tue Nov 24 2020 13:37:48 GMT+0200 (EET)",
        "views" : 6,
        "comments" : [
                {
                        "user" : "Mary W",
                        "body" : "Comment from MW",
                        "date" : "Tue Nov 24 2020 15:28:29 GMT+0200 (EET)"
                },
                {
                        "user" : "Bob",
                        "body" : "This is good",
                        "date" : "Tue Nov 24 2020 15:28:29 GMT+0200 (EET)"
                }
        ]
}
````



db.posts.update ({title: 'Post Two'},
{
    $set : { views : 10}
})

