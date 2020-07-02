const { authenticate } = require('@feathersjs/authentication').hooks;

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);


const imageThumbnail = require('image-thumbnail');
const dauria = require('dauria');
var base64Img = require('base64-img');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {
        const propertyId = context.data.propId;
        const data = await readFile('./uploads/' + context.result.id);
        const mime = context.result.id.split('.')[1];
        try {

          // This checks if uploaded image already exist else in adds it to the image array of the particular property
          await context.app.service('properties').get(propertyId)
            .then(async res => {
              if (res.imageUris === undefined || res.imageUris.length == 0) {
                await context.app.service('properties').patch(propertyId, { imageUris: [context.result.id] });
              } else {
                if (!res.imageUris.includes(context.result.id)) {
                  await context.app.service('properties').patch(propertyId, { imageUris: [...res.imageUris, context.result.id] });
                }
              }
            });

          const options = { percentage: 25 };
          const thumbnail = await imageThumbnail(data, options);

          const uri = dauria.getBase64DataURI(thumbnail, 'image/' + mime);

          base64Img.img(uri, './uploads/thumbnails', context.result.id.split('.')[0], function (err, filepath) { });

          context.result = { thumbnailUri: './uploads/thumbnails/' + context.result.id };
          return context;
        } catch (err) {
          console.error(err);
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
