const express = require('express');
const router = express.Router();

const FileController = require('../controllers/files.controller');

/**
 * @swagger
 * definitions:
 *   File:
 *     required:
 *       _id:
 *         type: string
 *     properties:
 *       _id:
 *         type: string
 *       fileType:
 *         type: string
 *       userId:
 *         type: string
 *       filename:
 *         type: string
 *       fileSize:
 *         type: string
 *       mimetype:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 * responses:
 *   files:
 *     example: [{
        "isTemp": true,
        "_id": "5d8387ed88f58e6cab63add5",
        "userId": "somekeyhere",
        "filename": "1568901101393_newfile.pdf",
        "fileSize": "1199247",
        "fileType": ".pdf",
        "mimetype": "application/pdf",
        "createdAt": "2019-09-19T13:51:41.430Z",
        "updatedAt": "2019-09-19T13:51:41.430Z"
    }]
 *     properties:
 *       _id:
 *         type: string
 *       isTemp:
 *         type: boolean
 *       userId:
 *         type: string
 *       filename:
 *         type: string
 *       fileSize:
 *         type: string
 *       fileType:
 *         type: string
 *       mimetype:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 *   file:
 *     example: {
        "isTemp": true,
        "_id": "5d8387ed88f58e6cab63add5",
        "userId": "somekeyhere",
        "filename": "1568901101393_newfile.pdf",
        "fileSize": "1199247",
        "fileType": ".pdf",
        "mimetype": "application/pdf",
        "createdAt": "2019-09-19T13:51:41.430Z",
        "updatedAt": "2019-09-19T13:51:41.430Z"
    }
 *     properties:
 *       _id:
 *         type: string
 *       isTemp:
 *         type: boolean
 *       userId:
 *         type: string
 *       filename:
 *         type: string
 *       fileSize:
 *         type: string
 *       fileType:
 *         type: string
 *       mimetype:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */

/**
* @swagger
* /files/save-file:
*   post:
*     summary: This should persist a file saved to the DB and returns a string
*     tags: [File]
*     parameters:
*       - name: body
*         in: body
*         example: { "fileId": "5d84e470f45e255f1a44868c","filename": "my-file.txt" }
*         required: true
*         content:
*           application/json:
*     responses:
*       200:
*         description: file updated successful
*         schema:
*           type: string
*/
router.post('/files/save-file', FileController.saveFile);

/**
 * @swagger
 * /files:
 *   get:
 *     summary: This should return an array of fileTypes and thier IDs
 *     tags: [File]
 *     responses:
 *       200:
 *         description: An array of files and their IDs
 *         schema:
 *           type: array
 *           $ref: '#/responses/files'
 */
router.get('/files/', FileController.getFiles);

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: This an array of a single file
 *     tags: [File]
 *     parametersf:
 *       - in: path
 *         name: id
 *         description: File to fetch
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of files and their details
 *         schema:
 *           type: object
 *           $ref: '#/responses/file'
 */
router.get('/files/:id', FileController.getFile);

module.exports = router;