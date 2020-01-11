
const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    commented_by: String,
    post_id: String,
    comment: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Comments', CommentSchema);


// commented_by, post_id, comment