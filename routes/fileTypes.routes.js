const express = require('express');
const router = express.Router();

const FileTypeController = require('../controllers/filetypes.controller');

/*
* MODEL DESCRIPTION
*/

// =======================================================================
// 
// Describe all models here
// 
// =======================================================================

/**
 * @swagger
 * definitions:
 *   FileType:
 *     required:
 *       - fileType
 *     properties:
 *       fileType:
 *         type: array
 *         example: ['.pdf', '.jpg',".jpeg"]
 * responses:
 *   data:
 *     example: [{"_id": "5d835a99ad6d5d37cde5c346", "fileType": ".pdf"}]
 *     properties:
 *       _id:
 *         type: string 
 *       fileType: 
 *         type: string
 */

/**
 * @swagger
 * /filetypes:
 *   post:
 *     summary: This should add a file type to the collection and returns a string
 *     tags: [FileType]
 *     parameters:
 *       - name: body
 *         in: body
 *         example: {"fileTypes": [".pdf", ".jpg", ".png",".jpeg"]}
 *         required: true
 *         content:
 *           application/json:
 *     responses:
 *       200:
 *         description: upload successful
 *         schema:
 *           type: string
 */
router.post('/filetypes', FileTypeController.saveFileType);

/**
 * @swagger
 * /filetypes:
 *   get:
 *     summary: This should return an array of fileTypes and thier IDs
 *     tags: [FileType]
 *     responses:
 *       200:
 *         description: An array of fileTypes and their IDs
 *         schema:
 *           type: array
 *           $ref: '#/responses/data'
 */
router.get('/filetypes', FileTypeController.getFileTypes);

module.exports = router;