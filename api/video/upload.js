import express from 'express';
import multer from 'multer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase.js';

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const videoRef = ref(storage, `videos/${fileName}`);
    await uploadBytes(videoRef, req.file.buffer);
    const downloadURL = await getDownloadURL(videoRef);
    
    res.status(200).json({
      message: 'Video uploaded',
      url: downloadURL
    });
  } catch (err) {
    res.status(500).json({ error: 'Video upload failed', details: err });
  }
});

export default router;