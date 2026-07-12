const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
// Static files are handled natively by Vercel, no need for express.static

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join('/tmp', 'uploads', 'gallery');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Simple password authentication middleware
const checkAuth = (req, res, next) => {
    // Basic hardcoded password for now. In production, use JWT or sessions.
    const password = req.headers['authorization'];
    if (password === 'SITARAM SITARAM 112233') {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized. Invalid Password.' });
    }
};

// API Endpoint to get all gallery images
app.get('/api/gallery', (req, res) => {
    const dir = path.join('/tmp', 'uploads', 'gallery');
    if (!fs.existsSync(dir)) {
        return res.json([]);
    }
    
    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading directory' });
        }
        // Filter only image files
        const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        // Return array of image paths relative to frontend
        const imageUrls = images.map(img => `uploads/gallery/${img}`);
        res.json(imageUrls);
    });
});

// API Endpoint to upload an image (protected)
app.post('/api/upload', checkAuth, upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'Photo uploaded successfully!', file: req.file.filename });
});

// API Endpoint to delete an image (protected)
app.delete('/api/gallery/:filename', checkAuth, (req, res) => {
    const filename = req.params.filename;
    // Security check to prevent directory traversal
    if (filename.includes('/') || filename.includes('\\') || filename.includes('..')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    
    const filePath = path.join('/tmp', 'uploads', 'gallery', filename);
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            res.json({ message: 'Photo deleted successfully!' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete file' });
        }
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});
// Start the server
// Only start the server if run directly (local development)
// Otherwise, export it for Vercel serverless
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        console.log(`Admin panel: http://localhost:${PORT}/admin.html`);
    });
}

module.exports = app;
