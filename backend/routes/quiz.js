const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const router = express.Router();

// Configure multer to save uploaded PDF temporarily
const upload = multer({ dest: "uploads/" });

router.post("/upload-pdf", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({ success: true, text: extractedText });
  } catch (error) {
    console.error("Error reading PDF:", error);
    res.status(500).json({ success: false, message: "Failed to extract PDF" });
  }
});

module.exports = router;
