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
const {getFirestore, Timestamp} = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

const functions = require("firebase-functions/v2");
const {beforeUserCreated} = require("firebase-functions/v2/identity");
const express = require("express");
const app = express();
const requestValidator = require("./middleware");

// Middleware
app.use( async (req, res, next) => {
  await requestValidator(req, res, db);
  next();
});

// Get requests function
app.get("/", (req, res) => {
  const errorMessage = "Invalid URL passed: " + req.url;
  return res.status(401).json({error: errorMessage});
});

app.get("/api", (req, res) => {
  const read = require("./read");
  return read(req, res, db);
});


app.post("/api", (req, res) => {
  const create = require("./create");
  return create(req, res, db);
});


app.delete("/api", async (req, res) => {
  const remove = require("./remove");
  remove(req, res, db);
});

app.put("/api", async (req, res) => {
  const update = require("./update");
  return update(req, res, db);
});


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
    owner: user.email,
  };

  // Add a new sample document with the uid
  const docRef = db.collection(user.uid).doc("sample").set(data);

  docRef.then((result)=>logger.log(result)).catch((error)=>logger.log(error));

  if (user.email && !user.emailVerified && event.eventType.includes(":github.com")) {
    return {
      emailVerified: true,
    };
  }
});

