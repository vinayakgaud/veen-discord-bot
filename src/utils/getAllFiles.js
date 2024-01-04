//utility function to get all the folders and files
import fs from "fs";
import path from "path";

export default (directory, foldersOnly = false) => {
  //have foldersOnly var as false, if it is true then we will only return folder from particular path
  let fileNames = [];
  const files = fs.readdirSync(directory, { withFileTypes: true }); //to be able to differentiate between files or folders
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }
  return fileNames;
};
