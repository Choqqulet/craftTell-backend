import express from 'express';
import multer from 'multer';
import { checkNsfw } from '../../utils/nsfwChecker.js';

const router = express.Router();
const upload = multer();

router.post('/', upload.single('image'), async (req, res) => {
  const isNsfw = await checkNsfw(req.file.buffer);
  if (isNsfw) {
    return res.status(400).json({ error: 'NSFW content detected' });
  }

  // proceed to save image or process
  res.status(200).json({ message: 'Image accepted' });
});

export default router;