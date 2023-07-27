/* eslint-disable new-cap */
/* eslint max-len: ["error", { "code": 900 }]*/

// Global options
const {setGlobalOptions} = require("firebase-functions/v2/options");
// Set the maximum instances to 10 for all functions
setGlobalOptions({maxInstances: 10});

// functions logger
// eslint-disable-next-line no-unused-vars
const logger = require("firebase-functions/logger");

// initialization
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, Timestamp, FieldValue} = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

const functions = require("firebase-functions/v2");
const {beforeUserCreated} = require("firebase-functions/v2/identity");
const express = require("express");
const app = express();

// Middleware
app.use((req, res, next) => {
  requestValidator(req, res);
  next();
});

// Get requests function
app.get("/", (req, res) => {
  const errorMessage = "Invalid URL passed: " + req.url;
  return res.status(401).json({error: errorMessage});
});

app.get("/api", (req, res) => {
  const read = require("./read");
  return read(req, res, db, Timestamp);
});


app.post("/api", (req, res) => {
  const create = require("./create");
  return create(req, res, db, Timestamp, FieldValue);
});


app.delete("/api", (req, res) => {
  res.send({message: "Hello from Delete request"});
});

app.put("/api", (req, res) => {
  res.send({message: "Hello from PUT request"});
});

// Application-level Middleware
const requestValidator = (req, res)=> {
  const contentType = req.headers["content-type"];
  const accessControl = req.headers["access-control-request-headers"];

  if (!contentType || !accessControl) {
    const errorMessage="Missing or invalid request headers";
    return res.status(404).json({error: {message: errorMessage, type: "HeadersException"}});
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const errorMessage = "Authorization header missing";
    return res.status(401).json({error: {message: errorMessage, type: "OAuthException"}});
  }

  if (authHeader.length !== 35) {
    const errorMessage = "Unauthorized request";
    return res.status(403).json({error: {message: errorMessage, type: "OAuthException"}});
  }
};

// main api endpoint function
exports.app = functions.https.onRequest(app);

// function to create a new sample blog entry
exports.beforeUserCreated = beforeUserCreated((event)=> {
  const user = event.data;

  const data = {
    author: "Sample",
    content: "This is a sample content",
    title: "Sample Title",
    created: Timestamp.fromDate(new Date()),
  };

  // Add a new sample document with the uid
  const docRef = db.collection(user.uid).doc("sample").set(data);

  docRef.then((result)=>logger.log(result)).catch((error)=>logger.log(error));

  return;
});

