const request = require('request');
const path = require('path');
const { APP_NAME, OBS, BUCKET } = process.env;
// const log = require( 'utils' ).logger().getLogger( APP_NAME );
const s3 = require('../config/aws.config');
const File = require('../models/file.schema');

module.exports = {
	// upload a new file
	uploadFiles: async (req, res) => {
		const userId = req.headers['authorization'];
		const info = req.files[0];
		if(!info) return res.status(500).send('internal file server error');
		const fileType = path.extname(info.originalname);

		const payload = {
			userId,
			filename: info.key,
			fileSize: info.size,
			fileType,
			mimetype: info.mimetype,
		};

		const uploadedFile = await File.create(payload);

		return res.json({
			message: 'Successfully uploaded ' + req.files.length + ' files!',
			filename: req.files[0]['key'],
			fileId: uploadedFile._id
		})
	},

	// get all buckets
	getBucketList: (req, res) => {
		s3.listBuckets({}, (err, data) => {
			if (err) {
				throw new Error(err);
			} else {
				res.json(data)
			}
		})
	},

	// get a file
	getFile: (req, res, next) => {
		const { filename } = req.params;
		const url = `https://${OBS}/${BUCKET}/${filename}`;
		// console.log(url)
		request.get(url).pipe(res)
	},

	// delete a file
	deleteFile: async (req, res) => {
		const { filename } = req.params;
		const params = {
			Bucket: BUCKET,
			Key: filename
		};
		s3.deleteObject(params, (err, data) => {
			if (err) {
				throw new Error(err);
			} else {
				res.json(data)
			}
		});

		await File.deleteOne({filename})
	},

	// update a file
	updateFile: (req, res) => {
		res.json({
			message: 'Successfully uploaded ' + req.files.length + ' files!',
			filename: req.files[ 0 ][ 'key' ]
		})
	}
};
