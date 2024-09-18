const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// 设置文件上传的存储配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')  // 上传的文件将存储在 'uploads/' 文件夹中
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // 使用时间戳和原文件扩展名命名文件
    }
});

const upload = multer({ storage: storage });

// 提供静态文件
app.use(express.static('public'));

// 处理文件上传请求
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.send('文件上传成功: ' + req.file.filename);
    } else {
        res.status(400).send('未选择文件或文件上传失败');
    }
});

// 启动服务器
app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
