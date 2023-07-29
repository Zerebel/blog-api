## 📚 Blog API

This is a backend API for a blog application that allows users to create, view, update, and delete posts. Users can authenticate and perform actions on their own posts.

## 📖 API Documentation

### Authentication

- **Register as a new user:**

  - Head to: [BLOG API](https://auth-dev-ae419.web.app/)

- **Authenticate and generate an access token**

  - Verify your Email to access the API Key

### Post Endpoints

-- URL endpoint:

```javascript
"https://auth-dev-ae419.web.app/api";
```

- **GET /blogs**: Get all posts.

- Request:

```javascript
const url = "https://auth-dev-ae419.web.app/api";
const authorizationToken = "your api key here";

const fetchData = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Request-Headers": "*",
      Authorization: "Bearer " + authorizationToken,
    },
  });

  const data = await response.json();
  console.log(data);
};

fetchData();
```

- Response:

  ```json
  [
    {
      "author": "John Doe",
      "content": "This is the content of the first post.",
      "created": "Thu, 06 Jul 2023 11:36:09 GMT",
      "title": "First Post",
      "updated": "Fri, 21 Jul 2023 18:16:02 GMT",
    }
    {
      "title": "Second Post",
      "content": "This is the content of the second post.",
      "author": "user_id"
    }
  ]
  ```

- **GET /posts/:postId**: Get a specific post by ID.

  - Response:

    ```json
    {
      "title": "First Post.",
      "content": "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      "author": "user_id"
    }
    ```

- **POST /posts**: Create a new post (requires authentication).

  - Request Body:

    ```json
    {
      "title": "New Post",
      "content": "Sed vitae nibh vehicula malesuada felis vel tempor ipsum."
    }
    ```

  - Response:

    ```json
    {
      "message": "Post created successfully"
    }
    ```

- **PUT /posts/:postId**: Update a post (requires authentication).

  - Request Body:

    ```json
    {
      "title": "Updated Post",
      "content": "Vestibulum ultrices dui vel ex finibus at consectetur mauris maximus."
    }
    ```

  - Response:

    ```json
    {
      "message": "Post updated successfully"
    }
    ```

- **DELETE /posts/:postId**: Delete a post (requires authentication).

  - Response:

    ```json
    {
      "message": "Post deleted successfully"
    }
    ```

## 🔐 Authentication and Authorization

To access protected routes (create update delete posts) include the access token in the request headers:

`nAuthorization: Bearer <access_token>n`

Make sure to replace `<access_token>` with the actual token received during login or registration.

## 🛠️ Technologies Used

- Express.js: Fast and minimalist web framework for Node.js
- MongoDB: NoSQL database for storing post and user data
- bcrypt: Password hashing library for secure storage
- jsonwebtoken: Token-based authentication library for generating and verifying access tokens
- dotenv: Environment variable management

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🔹**Author**: Zerebel

**Follow me on:**

- [GitHub](https://github.com/zerebel)
- [Twitter](https://twitter.com/zerebel_)
