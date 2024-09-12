import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { firebaseStorage } from '../../config/FirebaseConfig';
import { Button, TextField, Typography, Box, Card, CardMedia, CardActions } from '@mui/material';
import './PhotoUpload.css';

const PhotoUpload = () => {
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // Handle image selection
  const handleImageChange = (e) => {
    setUploadedImageUrl(null)

    if (e.target.files[0]) {
      setImage(e.target.files[0]);

    }
  };

  // Upload image to Firebase Storage
  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(firebaseStorage, `trail/${image.name}`);

    // Start uploading
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUploadedImageUrl(url);
        setImage(null); // Clear the file input
        fileInputRef.current.value = null; // Reset file input
        fetchImages(); // Refresh the list of images
      });
    }).catch((error) => {
      console.error("Upload failed: ", error);
    });
  };

  // Delete uploaded image from Firebase Storage
  const handleDelete = (fileName) => {
    const storageRef = ref(firebaseStorage, `trail/${fileName}`);
    deleteObject(storageRef).then(() => {
      console.log('File deleted successfully');
      fetchImages(); // Refresh the list of images
    }).catch((error) => {
      console.error("Delete failed: ", error);
    });
  };

  // Fetch all images from Firebase Storage
  const fetchImages = () => {
    const listRef = ref(firebaseStorage, 'trail/');
    listAll(listRef).then((res) => {
      const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
      Promise.all(promises).then((urls) => {
        const names = res.items.map(item => item.name);
        setImages(urls.map((url, index) => ({ url, name: names[index] })));
      });
    }).catch((error) => {
      console.error("Failed to list images: ", error);
    });
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>Photo Gallery</Typography>
      <form noValidate autoComplete="off">
        <TextField
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          inputRef={fileInputRef} // Use useRef here
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!image}
          className="uploadButton"
        >
          Upload
        </Button>
      </form>
      {uploadedImageUrl && (
        <div className="imageCard">
          <Typography variant="h6">Uploaded Image:</Typography>
          <img src={uploadedImageUrl} alt="Uploaded" className="image" />
        </div>
      )}
      <Typography variant="h5" className="cardGrid" gutterBottom>
        Existing Images
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {images.map((img, index) => (
          <Box key={index} width={{ xs: '100%', sm: '48%', md: '30%' }}>
            <Card>
              <CardMedia
                component="img"
                alt="Uploaded"
                height="140"
                image={img.url}
              />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleDelete(img.name)}
                  className="deleteButton"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default PhotoUpload;
