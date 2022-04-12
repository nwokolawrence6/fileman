exports.validateFileType = async (fileArray) => {
  if (!Array.isArray(fileArray)) { 
    throw new Error(`Expected type of 'Array' [], but got ${JSON.stringify(fileArray)}`)
  }

  if (fileArray.length < 1) {
    throw new Error(`Cannot process empty request`)
  }

  return fileArray
}