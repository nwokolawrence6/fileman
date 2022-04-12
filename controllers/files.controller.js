const File = require('../models/file.schema');

module.exports = {
  // save an uploaded file
  saveFile: async (req, res) => {

    const { fileId } = req.body;
    const fileToSave = await File.updateOne({ _id: fileId }, { isTemp: false });

    return fileToSave.ok === 1 &&
      fileToSave.nModified > 0 ?
      res.status(200).send('File update successful') :
      res.status(400).send('Error occurred')
  },

  getFiles: async (req, res) => {
    const files = await File.find({}).select('-__v');

    return files ? res.status(200).json(files) : res.status(400).send('Could not fetch files')
  },

  getFile: async (req, res) => {
    const { id } = req.params;
    const file = await File.findOne({ _id: id }).select('-__v');

    return file ? res.status(200).json(file) : res.status(400).send('Could not fetch file, are you using the right ID?')
  }
};
