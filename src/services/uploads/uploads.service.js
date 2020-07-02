// Initializes the `uploads` service on path `/uploads`
const { Uploads } = require('./uploads.class');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');
// const filters = require('./uploads.filters');

// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');

// File storage location. Folder must be created before upload.
// Example: './uploads' will be located under feathers app top level.
const blobStorage = fs('./uploads');


module.exports = function (app) {
  // const Model = createModel(app);
  // const paginate = app.get('paginate');

  // Initialize our service with any options it requires
  app.use('/uploads',
    blobService({ Model: blobStorage })
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.on('created', result => {
    try {
      console.log('Stored blob with id', result.id);
    } catch (error) {
      console.error(error);
    }
  });

  service.hooks(hooks);
};
