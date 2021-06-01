import { nanoid } from "nanoid";
import path from "path";
import fs from "fs";

export const fileHandler = {
  //* Method for create directorys
  createDirs: (userID) => {
    const userDir = makeUserDir(userID);
    if (fs.mkdirSync(userDir, { recursive: true })) {
      specs.directorys.map((directory) => {
        fs.mkdirSync(userDir + `/${directory}`, { recursive: true });
      });
    }
  },
  //* Method for delete directorys
  deleteDirs: (userID) => {
    const userDir = makeUserDir(userID);
    fs.rmdirSync(userDir, { recursive: true });
  },
  //* Method for handle Api uploads
  uploadFile: async (upload, ctx) => {
    try {
      const { createReadStream, filename, mimetype } =
        (await upload.file) || (await upload);
      const extension = filename.substring(filename.lastIndexOf(".") + 1);
      const stream = createReadStream();
      const file = await handleUpload({ stream, extension, mimetype });
      return file;
    } catch (e) {
      return false;
    }
  },
};

//* Static data use in any methods
const specs = {
  //? Set root path
  dirname: path.resolve(),
  //? Set Upload directory
  UploadPath: "/uploads/",
  //? Subfolders specification
  directorys: ["documents", "images", "videos"],
  //? Api Url for make final Api upload request path
  apiUrl: "http://localhost:3100", //TODO change url for production
};

//*
const makeUserDir = (userID) => {
  userID = userID.toString();
  const userDir = path.join(specs.dirname, specs.UploadPath, userID);
  return userDir;
};

const handleUpload = async ({ stream, extension, mimetype }) => {
  //TODO delete const ctx. User param ctx (test)
  const ctx = {
    user: "60b46d55c1a78315d06ebbe6",
    type: "document",
  };
  const userDir = makeUserDir(ctx.user);
  if (fs.existsSync(userDir)) {
    //TODO: implements map function for multiple uploads
    const uniqueFileName = nanoid(10);
    const path = `${userDir}/${ctx.type}s/${uniqueFileName}.${extension}`;
    return new Promise((resolve, reject) => {
      stream
        .pipe(fs.createWriteStream(path))
        .on("finish", () => {
          resolve({
            type: ctx.type,
            filename: uniqueFileName,
            mimetype: mimetype,
            path: `${specs.apiUrl}/api/user/files/${ctx.type}s/${uniqueFileName}.${extension}`,
          });
        })
        .on("error", reject);
    });
  }
};
