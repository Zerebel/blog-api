/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint max-len: ["error", { "code": 900 }]*/

// const {logger} = require("firebase-functions/v2")

module.exports = function create(req, res, db) {
  const {title, author, content} = req.body;

  if (!title || !author || !content) return res.status(404).json({message: "Invalid parameters passed for API request"});

  const blogs = async () => {
    const authHeader = req.headers.authorization;
    const userBlogs = authHeader.replace("Bearer ", "");

    const userRef = db.collection(userBlogs);
    const snapshot = await userRef.get();
    // Document not found
    if (snapshot.empty) {
      return ({error: "Invalid API key provided"});
    }

    const data = {
      author: author,
      content: content,
      title: title,
      created: new Date().toUTCString(),
    };

    // add new blog if some blog already exists
    try {
      const res = await userRef.add({
        ...data,
        updated: new Date().toUTCString(),
      });

      return {
        kind: "blog#post",
        id: res.id,
        data: data,
      };
    } catch (error) {
      return {
        error: "Error creating blog",
      };
    }
  };

  return blogs()
      .then((result)=> {
        res.send(result);
      })
      .catch((err)=> {
        res.status(500).json({err});
      });
};
