const { Service } = require('feathers-nedb');

exports.Properties = class Properties extends Service {
  create(data, params) {
    // This is the information we want from the user signup data
    const {
      code,
      title,
      description,
      category,
      buildingType,
      contractType,
      location,
      city,
      state,
      availability,
      landSize,
      bathRoom,
      bedRoom,
      garage,
      price,
      imageUris,
      userId,
      createdAt,
      updatedAt
    } = data;

    // The complete user
    const propertyData = {
      code,
      title,
      description,
      category,
      buildingType,
      contractType,
      location,
      city,
      state,
      availability,
      landSize,
      bathRoom,
      bedRoom,
      garage,
      price,
      imageUris,
      userId,
      createdAt,
      updatedAt
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(propertyData, params);
  }
};
