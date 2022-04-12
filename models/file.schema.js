const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const fileSchema = new Schema( {
  filename : {
    type : String ,
    trim : true ,
    required : true
  } ,
  userId : {
    type : Schema.Types.ObjectId ,
    // type: String, // Todo - revert later
    required : true
  } ,
  fileSize : {
    type : String ,
    trim : true ,
    required : true
  } ,
  fileType : {
    type : String ,
    trim : true ,
    required : true
  } ,
  isTemp : {
    type : Boolean ,
    default : true
  } ,
  mimetype : {
    type : String ,
    trim : true ,
    required : true
  }
} , { timestamps : true } )

const File = mongoose.model( 'File' , fileSchema )

module.exports = File
