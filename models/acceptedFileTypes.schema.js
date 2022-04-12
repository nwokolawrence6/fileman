const mongoose = require('mongoose')
const Schema = mongoose.Schema

const acceptedFileTypesSchema = new Schema({
  fileTypes: String
}, { timestamps: true })

const AcceptedFileTypes = mongoose.model('AcceptedFileTypes', acceptedFileTypesSchema)

module.exports = AcceptedFileTypes