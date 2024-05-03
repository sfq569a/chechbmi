const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');

app.use(express.json());

app.post('/save-image', (req, res) => {
  const imageDataURL = req.body.image;
  const base64Data = imageDataURL.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  // Save image to server (adjust path as needed)
  fs.writeFile('images/friend_photo.jpg', buffer, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      res.status(500).json({ message: 'Error saving image' });
    } else {
      console.log('Image saved successfully');
      res.status(200).json({ message: 'Image saved successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
