/*
 * Main Api File
 * -All Endopoint are defined in this file and.
 * -The server starts in this file.
 */
//? Imports section
import { server } from "./server.js"; //? server const origin file.
import path from "path"; //? JS utils for get the path dir.
import "./database.js"; //? DB conection config.
import fs from "fs";

//* Get the actual directory name of the sistem.
const __dirname = path.resolve();

//* Main Api Endpoint
//? The server port is defined as 3100 or get the designed port from env file
server.start({ port: process.env.PORT || 3100 }, ({ port }) => {
  console.info("Server on port", port); //? Debbug log
});

//* Api Endopoint for Request Profile Avatars
server.express.get("/api/default/profile/avatars/:avatar", (req, res) => {
  const getDir = req.params;
  const pathDir = path.join(__dirname, "/assets/avatars/", getDir.avatar);
  res.sendFile(pathDir);
});

//* Api Endopoint for requests default profile image
server.express.get("/api/default/profile/image", (req, res) => {
  const pathDir = path.join(__dirname, "/assets/defaults/no-photo.png");
  res.sendFile(pathDir);
});

//* Api Endopoint for Request Defaults files
server.express.get("/api/default/file/:folder/:file", (req, res) => {
  const getDir = req.params;
  const pathDir = path.join(__dirname, "/assets/", getDir.folder, getDir.file);
  res.sendFile(pathDir);
});

//* Api Endopoint for Request Uploaded Files
server.express.get("/api/uploads/file/:folder/:file", (req, res) => {
  const getDir = req.params;
  const pathDir = path.join(__dirname, "/uploads/", getDir.folder, getDir.file);
});

//* Api Endopoint for user images
server.express.get("/api/user/files/images/:file", (req, res) => {
  const getDir = req.params;
  const getHeaders = req.headers;
  if (getHeaders.user) {
    const pathDir = path.join(
      __dirname,
      "/uploads/",
      getHeaders.user,
      "/images/",
      getDir.file
    );
    res.sendFile(pathDir);
  } else {
    res.status(403).send("No user provided");
  }
});

//* Api Endopoint for user videos
server.express.get("/api/user/files/videos/:file", (req, res) => {
  const getDir = req.params;
  const getHeaders = req.headers;
  if (getHeaders.user) {
    const pathDir = path.join(
      __dirname,
      "/uploads/",
      getHeaders.user,
      "/videos/",
      getDir.file
    );
    res.sendFile(pathDir);
  } else {
    res.status(403).send("No user provided");
  }
});

//* Api Endopoint for user documents
server.express.get("/api/user/files/documents/:file", (req, res) => {
  const getDir = req.params;
  const getHeaders = req.headers;
  if (getHeaders.user) {
    const pathDir = path.join(
      __dirname,
      "/uploads/",
      getHeaders.user,
      "/documents/",
      getDir.file
    );
    res.sendFile(pathDir);
  } else {
    res.status(403).send("No user provided");
  }
});
