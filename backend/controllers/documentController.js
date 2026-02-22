const pdfParse = require('pdf-parse');
const Document = require('../models/Document');
const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

// Helper — upload buffer to Cloudinary as public
const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'studyai-pdfs',
        resource_type: 'raw',
        type: 'upload',
        access_mode: 'public',
        public_id: `${Date.now()}-${filename.replace(/\s+/g, '_')}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// @desc   Upload a PDF document
// @route  POST /api/documents/upload
// @access Private
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title } = req.body;

    // Upload buffer directly to Cloudinary with public access
    const cloudinaryResult = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    const fileUrl = cloudinaryResult.secure_url;
    const publicId = cloudinaryResult.public_id;

    // Extract text from PDF buffer directly
    let extractedText = '';
    let pageCount = 0;
    try {
      const pdfData = await pdfParse(req.file.buffer);
      extractedText = pdfData.text;
      pageCount = pdfData.numpages;
    } catch (err) {
      console.error('PDF parsing error:', err.message);
    }

    const document = await Document.create({
      user: req.user._id,
      title: title || req.file.originalname.replace('.pdf', ''),
      fileName: req.file.originalname,
      filePath: fileUrl,
      cloudinaryId: publicId,
      fileSize: req.file.size,
      pageCount,
      extractedText,
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all documents for logged in user
// @route  GET /api/documents
// @access Private
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id })
      .select('-extractedText')
      .sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single document by ID
// @route  GET /api/documents/:id
// @access Private
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a document
// @route  DELETE /api/documents/:id
// @access Private
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.cloudinaryId) {
      await cloudinary.uploader.destroy(document.cloudinaryId, {
        resource_type: 'raw',
      });
    }

    await document.deleteOne();
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadDocument, getDocuments, getDocumentById, deleteDocument };