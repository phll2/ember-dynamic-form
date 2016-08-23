/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var uploadFilesRouter = express.Router();

  uploadFilesRouter.post('/', function(req, res) {
    let files = [{
      originalname: 'someTestFileName',
      encoding: 'someEncodingType',
      mimetype: 'someMimeType',
      destination: 'someDestination',
      filename: 'someFileName',
      path: '/some/path',
      size: '123'
    }];

    res.status(200).send(files);
  });

  app.use('/api/uploadFiles', uploadFilesRouter);
};
