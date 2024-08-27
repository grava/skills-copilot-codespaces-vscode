// create web server
var express = require('express');
var app = express();

// include the body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// include the comments module
var comments = require('./comments');

// Get all comments
app.get('/comments', function(req, res) {
  res.json(comments.getComments());
});

// Get one comment
app.get('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = comments.getComment(id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// Create a comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  var newComment = comments.createComment(comment);
  res.json(newComment);
});

// Update a comment
app.put('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = req.body;
  var updatedComment = comments.updateComment(id, comment);
  if (updatedComment) {
    res.json(updatedComment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// Delete a comment
app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments.deleteComment(id);
  res.status(204).send();
});

// Start the web server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});
