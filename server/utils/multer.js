import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import fs from 'fs';
import multer from 'multer';

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderPath;

    if (file.fieldname === 'musicFile') {
      folderPath = join(__dirname, '../../react/public/assets/song');
    } else if (file.fieldname === 'coverFile') {
      folderPath = join(__dirname, '../../react/public/assets/cover');
    } else {
      return cb(new Error('Invalid field name'), null);
    }

    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const ext = extname(file.originalname); // Get file extension (e.g. .mp3, .jpg)
    const title = req.body.title?.trim().replace(/\s+/g, '_'); // Replace spaces with underscores

    if (!title) {
      return cb(new Error("Missing 'title' in form data"));
    }

    const filename = `${title}${ext}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage });
