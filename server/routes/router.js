// backend/routes/imageRoutes.js

const express = require('express');
const Image = require('../model/ImageModel');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// Route to upload an image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.png'; // Save image path
        const newImage = new Image({ imageUrl });
        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
});

// Route to update an image
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        console.log(req.params.id);
        
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        image.imageUrl = `/uploads/${req.file.filename}`; // Update image URL
        await image.save();
        res.status(200).json({ message: 'Image updated successfully', imageUrl: image.imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error updating image', error });
    }
});

// user data get
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error });
    }
})

module.exports = router;
