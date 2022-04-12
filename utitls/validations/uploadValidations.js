const path = require( 'path' );
const AllowedFileTypes = require( '../../models/acceptedFileTypes.schema' );

const validateUpload = ( file , next ) => {
  if ( file ) {
    if ( typeof file === "string" && file.length > 3 ) {
      next( true )
    }

    //	expected type must be of "string"
    // return 'File type must be a string'
    next( false )
  }

  // user did not pass any file to our method
  // return null
  next( null )
};

const fileFilter = async ( req , file , cb ) => {
  // get user's id
  const userId = req.headers[ 'authorization' ];
  // console.log(file , 'this is law 2')
  if ( !userId ) {
    return cb( `Unauthorized` )
  }
  if(!file.originalname) return cb('internal file server error');
  const fileTypes = path.extname( file.originalname );
  const allowedTypes = await AllowedFileTypes.findOne( { fileTypes : { $regex : fileTypes , $options : 'ig' } } );

  if ( !allowedTypes ) {
    return cb( `This file type of "${ fileTypes }" is not allowed. Contact your admin` )
  }

  cb( null , true )
};

module.exports = {
  validateUpload , fileFilter
};
