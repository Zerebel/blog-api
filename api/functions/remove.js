/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint max-len: ["error", { "code": 900 }]*/

module.exports = async function(req, res, db) {
  const {id} = req.query;

  if (!id || id.length < 20) return res.status(402).json({error: {message: "Blog not found", type: "INVALID BLOG ID"}});

  const authHeader = req.headers.authorization;
  const userBlogs = authHeader.replace("Bearer ", "");

  // eslint-disable-next-line no-unused-vars
  const blogRef = db.collection(userBlogs).doc(id);

  // check if the blog exists
  if (!(await blogRef.get()).exists) return res.status(402).json({error: {message: "Blog not found", type: "INVALID BLOG ID"}});

  // if the blog exists
  return blogRef.delete()
      .then(() => res.send(
          {
            message: "Blog with ID " + id + " deleted successfully",
          },
      ));
};
