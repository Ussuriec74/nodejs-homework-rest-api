const tryCatchWrapper = (endpointFn) => {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}



// const Jimp = require('jimp');
// async function resize() {
//   // Read the image.
//   const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
//   // Resize the image to width 150 and heigth 150.
//   await image.resize(150, 150);
//   // Save and overwrite the image
//   await image.writeAsync(`test/${Date.now()}_150x150.png`);
// }
// resize();
module.exports = {
  tryCatchWrapper,
  createError,
};