const s3 = require('../../../config/aws.config');
const { BUCKET } = process.env;
const File = require('../../../models/file.schema');

const clearRedundancy = async () => {
  // Check the files database and look for files that have not been saved
  const unSavedFiles = await File.find({ isTemp: true });
  
  if (unSavedFiles.length < 1) return;

  // delete them from s3 bucket
  const params = {
    Bucket: BUCKET,
    Delete: {
      Objects: unSavedFiles.map(data => ({ Key: data.filename })),
      Quiet: false
    }
  };
  s3.deleteObjects(params, (err, data) => {
    if (err) {
      throw new Error('Error is: ', err);
    }
  });
  
  // delete them from the database
  await File.deleteMany({ isTemp: true})
};

module.exports = clearRedundancy;