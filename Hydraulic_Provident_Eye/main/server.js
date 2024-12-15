const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // Cho phép mọi kết nối từ ứng dụng React Native

// Cấu hình Multer để lưu file vào thư mục "components/media"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'main/components/media')); // Lưu vào thư mục media
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên file
  },
});

const upload = multer({ storage });

// Route để nhận file từ React Native
app.post('/upload', upload.single('video'), (req, res) => {
  console.log('File received:', req.file);
  res.json({ message: 'Video đã được tải lên', filePath: req.file.path });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
