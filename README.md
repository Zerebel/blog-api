## 📚 Blog API

This is a backend API for a blog application that allows users to create view update and delete posts. Users can authenticate and perform actions on their own posts.

## 📖 API Documentation

### Authentication

- **POST /auth/register**: Register a new user.

  - Request Body:

    ```json
    {
      "username": "john_doe",
      "password": "password123"
    }
    ```

  - Response:

    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **POST /auth/login**: Authenticate and generate an access token.

  - Request Body:

    ```json
    {
      "username": "john_doe",
      "password": "password123"
    }
    ```

  - Response:

    ```json
    {
      "token": "your-access-token"
    }
    ```

### Post Endpoints

- **GET /posts**: Get all posts.

  - Response:

    ```json
    [
      {
        "title": "First Post",
        "content": "This is the content of the first post.",
        "author": "user_id"
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
