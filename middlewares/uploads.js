const multer = require( 'multer' );
const multerS3 = require( 'multer-s3' );
const s3 = require( '../config/aws.config' );
const { BUCKET } = process.env;
const { validateUpload , fileFilter } = require( '../utitls/validations/uploadValidations' );

const upload = multer( {
  fileFilter ,
  storage : multerS3( {
    s3 : s3 ,
    dirname : "uploads" ,
    bucket : BUCKET ,
    acl : 'public-read' ,
    key : ( req , file , cb ) => {
      if ( !file.originalname ) return  cb( 'internal file server error' , null );
      cb( null , `${ Date.now() }_${ file.originalname.replace( / /g , '_' ).toLowerCase() }` );
    }
  } )
} );

module.exports = upload;
