/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint max-len: ["error", { "code": 900 }]*/


module.exports = async function update(req, res, db) {
  const {id} = req.query;
  const {author, title, content} = req.body;

  if (!id || id.length < 20) return res.status(402).json({error: "Invalid Blog ID provided"});

  if (!author || !title || !content) return res.status(402).json({error: "No Blog data provided for update"});

  const authHeader = req.headers.authorization;
  const userBlogs = authHeader.replace("Bearer ", "");

  const blogRef = db.collection(userBlogs);

  // invalid API key
  if ((await blogRef.count().get()).data().count < 1) return res.status(404).json({error: "Invalid API Key"});

  const docRef = blogRef.doc(id);

  // get update data
  const updateData = {
    updated: new Date().toUTCString(),
  };

  if (author) updateData.author = author;
  if (title) updateData.title = title;
  if (content) updateData.content = content;

  const read = require("./read");
  // eslint-disable-next-line no-unused-vars
  const updateRes = await docRef.update({
    ...updateData,
  })
      .then(() => read(req, res, db),
      )
      .catch(() => res.status(404).send({message: "Unable to update Blog"}));
};
