const randomize = require('randomatic');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    // Validate new property form data
    // Throw an error if we didn't get a data from any of the required form fields.
    if (!data.title || !data.description || !data.category || !data.contractType || !data.town || !data.state || !data.price) {
      throw new Error('Provide all required data!');
    }
    // The logged in user
    const { user } = context.params;
    console.log(context.params.user);

    // auto generated code
    const code = randomize('A0', 6);

    // The actual form data
    const title = data.title.substring(0, 20);
    const description = data.description.substring(0, 400);
    const category = data.category; // Land or Building
    const buildingType = data.buildingType; // Residential(Duplexes, Terraces, Townhouses, Bungalows, Flats, Rooms, Boys Quaters ) or Commercial(Offices, Shops, Warehouses, Hotels)
    const contractType = data.contractType; // lease, Rent, Sale
    const location = data.location;
    const city = data.city;
    const state = data.state;
    const availability = data.availability || true;
    const landSize = data.landSize;
    const bedRoom = data.bedRoom;
    const bathRoom = data.bathRoom;
    const garage = data.garage;
    const price = data.price;
    const imageUris = data.imageUris || [];

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
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
      bedRoom,
      bathRoom,
      garage,
      price,
      imageUris,
      // Set the user id
      userId: user._id,
      // Add the current date
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    };

    return context;
  };
};
