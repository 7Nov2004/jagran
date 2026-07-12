const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const app = express();
const PORT = 4000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'ekei0ke6', 
  api_key: '233723455372952', 
  api_secret: '7FZy1NaJzFcbrtKHAYknwNoFVto' 
});

// Use memory storage for Vercel Serverless
const upload = multer({ storage: multer.memoryStorage() });

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
app.get('/api/gallery', async (req, res) => {
    try {
        // Fetch images from Cloudinary folder 'jagran_gallery'
        const result = await cloudinary.search
            .expression('folder:jagran_gallery')
            .sort_by('created_at', 'desc')
            .max_results(500)
            .execute();
            
        const imageUrls = result.resources.map(file => file.secure_url);
        res.json(imageUrls);
    } catch (err) {
        console.error('Gallery Fetch Error:', err);
        res.status(500).json({ error: 'Failed to load gallery' });
    }
});

// API Endpoint to upload multiple images (protected)
app.post('/api/upload', checkAuth, upload.array('photos', 50), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    
    try {
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const publicId = 'img-' + uniqueSuffix;
                
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'jagran_gallery', public_id: publicId },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary Upload Error:', error);
                            return reject(error);
                        }
                        resolve(result.secure_url);
                    }
                );
                
                streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });
        });

        const urls = await Promise.all(uploadPromises);
        res.json({ message: `${urls.length} photo(s) uploaded successfully!`, files: urls });
    } catch (error) {
        console.error('Cloudinary Bulk Upload Error:', error);
        res.status(500).json({ error: 'Failed to upload one or more photos' });
    }
});

// API Endpoint to delete an image (protected)
app.delete('/api/gallery/:filename', checkAuth, async (req, res) => {
    const filename = req.params.filename;
    
    // Security check to prevent directory traversal
    if (filename.includes('/') || filename.includes('\\') || filename.includes('..')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    
    try {
        // public_id is folder/name without extension
        const nameWithoutExt = path.parse(filename).name;
        const publicId = `jagran_gallery/${nameWithoutExt}`;
        
        await cloudinary.uploader.destroy(publicId);
        res.json({ message: 'Photo deleted successfully!' });
    } catch (err) {
        console.error('Cloudinary Delete Error:', err);
        res.status(500).json({ error: 'Failed to delete file' });
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
