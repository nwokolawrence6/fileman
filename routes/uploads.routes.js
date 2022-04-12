const express = require('express')
const router = express.Router();
const upload = require('../middlewares/uploads')
const uploadController = require('../controllers/uploads.controller')
const deleteFile = require('../middlewares/deleteFile')

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
 *   Files:
 *     required:
 *       - fileName
 *     properties:
 *       fileName:
 *         type: string
 *       message:
 *         type: string
 *       fileId:
 *         type: string
 *   Buckets:
 *     type: object
 *     properties:
 *       Bucket:
 *         properties:
 *           Name:
 *              type: string
 *           CreationDate:
 *              type: string
 *       Owner:
 *         properties:
 *           DisplayName:
 *              type: string
 *           ID:
 *              type: string
 */


/**
 * @swagger
 * /upload:
 *   post:
 *     description: This should add a file to the server and returns a string
 *     tags: [Files]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: files
 *         description: File to upload
 *         in: formData
 *         required: true
 *         type: file
 *       - name: authorization
 *         in: header
 *         description: an authorization header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: upload successful
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Files'
 */
router.post('/upload', upload.array('files', 1), uploadController.uploadFiles)

/**
 * @swagger
 * /upload/{filename}:
 *   get:
 *     description: This should download a file from the server
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: filename
 *         description: File to download
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: download successful
 *         schema:
 *           type: object
 */
router.get('/upload/:filename', uploadController.getFile)

/**
 * @swagger
 * /buckets:
 *   get:
 *     description: This should return all buckets available
 *     tags: [Files]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: operation successful
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Buckets'
 */
router.get('/buckets', uploadController.getBucketList)


/**
 * @swagger
 * /upload/{filename}:
 *   delete:
 *     description: This should delete a file from the bucket
 *     tags: [Files]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: filename
 *         description: File to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: delete successful
 *         schema:
 *           type: object
 *
 */
router.delete('/upload/:filename', uploadController.deleteFile)


/**
 * @swagger
 * /update/{filename}:
 *   put:
 *     description: This should update a file in the server
 *     tags: [Files]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: filename
 *         description: File to delete
 *         required: true
 *         type: string
 *       - name: file
 *         description: File to update
 *         type: file
 *         required: true
 *         in: formData
 *     responses:
 *       200:
 *         description: delete successful
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Files'
 */
router.put('/update/:filename', deleteFile, upload.single('files'), uploadController.updateFile)

module.exports = router;
