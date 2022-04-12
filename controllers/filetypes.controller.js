const AcceptedFileType = require('../models/acceptedFileTypes.schema')
const { validateFileType } = require('../utitls/validations/fileType.validation')

module.exports = {
  saveFileType: async (req, res) => {
    try {
      let { fileTypes } = req.body
      fileTypes = await validateFileType(fileTypes)

      const saveFileTypes = fileTypes.map(fileTypes => ({
        fileTypes
      }))

      const foundTypes = await AcceptedFileType.find({
        $or: [
          ...saveFileTypes
        ]
      })

      if (foundTypes.length > 0) {
        return res.status(400).send(`file types already exist in collection: ${foundTypes.map(data => `"${data.fileTypes}"`).join(', ')}`)
      }
  
      await AcceptedFileType.insertMany(saveFileTypes)
  
      res.status(200).send('File types saved successfully')
    } catch (error) {
      res.status(400).send(error.message)
    }
  },
  getFileTypes: async (req, res) => {
    return res.status(200).json( await AcceptedFileType.find().select('fileTypes') )
  }
}