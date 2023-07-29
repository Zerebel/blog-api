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

- **GET /api**: Get all posts.

- Request:

```javascript

// strictly required authorization method and headers
 {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Request-Headers": "*",
      Authorization: "Bearer " + 'your api token',
    },
  }


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
    "author": "Jane Doe",
    "title": "Second Post",
    "content": "This is the content of the second post.",
    "................"
  }
  ]
  ```

- **GET /api?blogId**: Get a specific post by ID.
  ##or
- **GET /api?author**: Get a specific post by author.
  ##or
- **GET /api?title**: Get a specific post by title.

  - Response:

    ```json
    {
      "author": "Jane Doe",
      "title": "First Post.",
      "content": "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      "........................."
    }
    ```

- **POST /api**: Create a new post (requires authentication).

  - Request Body:

    ```javascript

    // strictly required authorization method and headers
    {
    method: "POST",
    headers: {
    "content-type": "application/json",
    "Access-Control-Request-Headers": "\*",
    Authorization: "Bearer " + 'your api token',
    },
    body: JSON.stringify(data),
    }

    ```

  - Response:

  ```json
  {
    "author": "Jane Smith",
    "content": "Thank you all for joining me on this journey! Here's the exciting content of the latest adventure.",
    "created": "Tue, 29 Jul 2023 14:22:37 GMT",
    "title": "An Epic Adventure Begins",
    "updated": "Wed, 02 Aug 2023 09:45:19 GMT"
  }
  ```

- **PUT /api/?blogID**: Update a post (requires authentication).

  - Request Body:

    ```javascript
    {
      method: "PUT",
      <!--* Headers removed for brevity -->
      body: JSON.stringify(data),
    }
    ```

  - Response:

    ```json
    {
      "author": "Jane Smith",
      "content": "Exciting news! Stay tuned for updates.",
      "created": "Tue, 29 Jul 2023 14:22:37 GMT",
      "title": "An Epic Adventure Begins",
      "updated": "Wed, 02 Aug 2023 09:45:19 GMT"
    }
    ```

- **DELETE /api?blogId**: Delete a post (requires authentication).

  - Request Body:

    ```javascript
    {
      method: "DELETE",
      <!--* Headers removed for brevity -->
    }
    ```

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

- Firebase: Cloud platform for web and mobile app development.
- ReactJS: JavaScript library for building user interfaces.
- Vite: Fast build tool for modern web apps.
- Tailwind CSS: Utility-first CSS framework.
- Material-UI: React UI framework with Material Design components.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🔹**Author**: Zerebel

**Follow me on:**

- [GitHub](https://github.com/zerebel)
- [Twitter](https://twitter.com/zerebel_)
