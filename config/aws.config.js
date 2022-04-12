const aws = require('aws-sdk');
const { REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, OBS, BUCKET } = process.env;

aws.config.update({
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	accessKeyId: AWS_ACCESS_KEY_ID,
	region: REGION
});

const spacesEndpoint = new aws.Endpoint(OBS);

const s3 = new aws.S3({
	endpoint: spacesEndpoint
});

const params = {
	Bucket: BUCKET
};

const checkBucketExists = async () => {
	try {
		await s3.headBucket(params).promise();
		return true;
	} catch (error) {
		if (error.statusCode === 404) {
			return false;
		}
		throw error;
	}
};
//  See files that are currently in the s3 bucket
// if(!checkBucketExists()) {

// }
checkBucketExists().then(result => {
	if (!result) {
		s3.createBucket(params, (err, data) => {
			if (err) {
				console.log(err); // an error occurred
			} else {
				return data;
			}
		});
	}
});

module.exports = s3;
