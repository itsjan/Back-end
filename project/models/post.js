const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var schema = new Schema({

    authorId: { type: Schema.ObjectId, ref: 'User', required: true },
    text: {type: String, required: true},
    time : { type : Date, default: Date.now },
    reactions: [ { type: Schema.ObjectId, ref: 'Reaction ', required: true }]

});

// @TODO .. timestamp 
// @TODO .. user can like/dislike

schema.virtual('author', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true
  });



// Virtual for this user instance URL.
schema.virtual('url').get( () => '/u/' + this._id );


module.exports = mongoose.model('Post', schema );


/*
https://mongoosejs.com/docs/tutorials/virtuals.html

Populate
Mongoose also supports populating virtuals. 
A populated virtual contains documents from another collection. 
To define a populated virtual, you need to specify:

- The ref option, which tells Mongoose which model to populate 
documents from.
- The localField and foreignField options. 
Mongoose will populate documents from the model in ref whose 
foreignField matches this document's localField.

*/



/*
const User = mongoose.model('User', schema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
await BlogPost.create({ title: 'Introduction to Mongoose', authorId: 1 });
await User.create({ _id: 1, email: 'test@gmail.com' });

const doc = await BlogPost.findOne().populate('author');
doc.author.email; // 'test@gmail.com'

*/



