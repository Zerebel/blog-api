/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint max-len: ["error", { "code": 900 }]*/

module.exports = async function requestValidator(req, res, db) {
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

  const userBlogs = authHeader.replace("Bearer ", "");
  const blogRef = db.collection(userBlogs);

  // invalid API key
  if ((await blogRef.count().get()).data().count < 1) {
    return res.status(403).json({error: {message: "Unauthorized request", type: "OAuthException"}});
  }
};
