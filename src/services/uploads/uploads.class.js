const { Service } = require('feathers-nedb');

exports.Uploads = class Uploads extends Service {
  create(data, params) {
    // This is the information we want from the user signup data
    const {
      code,
      imageUris,
      userId,
      createdAt,
      updatedAt
    } = data;

    // The complete user
    const uploadData = {
      code,
      imageUris,
      userId,
      createdAt,
      updatedAt
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(uploadData, params);
  }
};
