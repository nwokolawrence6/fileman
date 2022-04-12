const s3 = require( '../config/aws.config' )
const { BUCKET } = process.env

const deleteFile = ( req, res, next ) => {
  const { filename } = req.params
  const params = {
    Bucket: BUCKET,
    Key: filename
  }
  s3.deleteObject( params, ( err, data ) => {
    if ( err ) {
      throw new Error( err  );
    } else {
      next()
    }
  } )
}

module.exports = deleteFile