const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'ekei0ke6', 
  api_key: '133672996317874', 
  api_secret: 'v8Nn_Ldn_CPtVtc1BZOaFEkvPcY' 
});

// Upload a simple base64 1x1 pixel image
const dummyImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

cloudinary.uploader.upload(dummyImage)
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Upload Error:', error));
