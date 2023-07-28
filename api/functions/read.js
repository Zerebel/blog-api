/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint max-len: ["error", { "code": 900 }]*/

const {logger} = require("firebase-functions/v2");


module.exports = async function read(req, res, db) {
  const {title, author, id} = req.query;

  const blogs = async ()=> {
    const authHeader = req.headers.authorization;
    const userBlogs = authHeader.replace("Bearer ", "");

    const userRef = db.collection(userBlogs);
    const snapshot = await userRef.get();


    // Document not found
    if (snapshot.empty) {
      return res.status(500).json({error: "No user blog post found"});
    }

    // put all blogs into an array
    const allBlogsFunction = () => {
      const blogs = [];
      snapshot.forEach((value) => {
        const data = value.data();

        return blogs.push({
          id: value.id,
          ...data,
        });
      });

      return blogs.filter((value) => value.id !== "sample");
    };

    const allBlogs = allBlogsFunction();

    // No Search parameters - return all blog posts
    if (!title && !author && !id) {
      return (
        {
          kind: "blog#get",
          total_count: allBlogs.length,
          blogs: allBlogs || "No blog found",
        }
      );
    }

    // With search parameters - return matching blog posts

    // validate search parameters
    if (title && title.length < 6) {
      return res.status(400).json({error: "Title must be at least 6 characters"});
    }

    if (author && author.length < 3) {
      return res.status(400).json({error: "Authur must be at least 3 characters"});
    }

    if (id && id.length < 20) {
      return res.status(400).json({error: "ID must be at least 20 characters"});
    }

    const macthingResults = allBlogs.filter((blog)=> {
      if (id === blog["id"]) return true;

      if (title) {
        const blogTitle = blog["title"].toLowerCase();
        const searchTitle = title.toLowerCase();
        if (blogTitle.includes(searchTitle)) return true;
        return;
      }

      if (author) {
        const blogAuthor = blog["author"].toLowerCase();
        const searchAuthor = author.toLowerCase();
        if (blogAuthor.includes(searchAuthor)) return true;
        return;
      }
    });

    // if the search parameters didn't match anything
    if (!macthingResults.length > 0) return res.status(500).json({error: "Could not find any blogs matching the search criteria"});

    // if found, return it
    return {
      kind: "blog#" + req.method,
      total_count: macthingResults.length,
      blogs: macthingResults,
    };
  };

  return blogs()
      .then((data)=> {
        return res.json(data);
      })
      .catch((err)=> logger.error(err));
};
