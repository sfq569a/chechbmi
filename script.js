async function accessCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.getElementById('cameraFeed');
      video.srcObject = stream;
      video.play();
      document.getElementById('cameraFeed').style.display = 'block';
      // Capture image after 3 seconds
      setTimeout(() => {
        captureImageFromVideo();
      }, 3000);
    } catch (error) {
      console.error('Error accessing camera: ', error);
    }
  }
  
  function captureImageFromVideo() {
    const video = document.getElementById('cameraFeed');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/jpeg');
    saveImage(imageDataURL);
  }
  
  function saveImage(imageDataURL) {
    // Send imageDataURL to server for saving
    fetch('/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageDataURL })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Image saved:', data.message);
    })
    .catch(error => {
      console.error('Error saving image:', error);
    });
  }
  
  function calculateBMI() {
    // Your BMI calculation code here
    // ...
    // Access camera after BMI calculation
    accessCamera();
  }
  