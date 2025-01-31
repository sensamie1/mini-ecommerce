# README.md

## Mini E-Commerce Product API

### Overview

The **Mini E-Commerce Product API** is a RESTful service that provides CRUD operations for managing products. It includes features such as pagination, search, filtering, sorting, authentication, and security enhancements. The API is built with **Node.js**, **Express.js**, and **PostgreSQL**, ensuring scalability and efficiency.

### Features

- **CRUD Operations**: Create, Read, Update, and Delete products.
- **Pagination & Sorting**: Retrieve products efficiently with customizable sorting.
- **Search & Filtering**: Search by name and filter based on criteria like category and price.
- **Authentication & Authorization**: Secure endpoints for admin users.
- **Rate Limiting**: Prevent API abuse.
- **Input Validation & Error Handling**: Ensure data integrity.
- **API Versioning**: Maintain backward compatibility.
- **Comprehensive Documentation**: Clear API documentation with usage guidelines.
- **Unit Testing** (Bonus): Ensures reliability and performance.

### Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Joi / Express-validator
- **Testing**: Jest / Supertest

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sensamie1/mini-ecommerce.git
   cd mini-ecommerce-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a `.env` file and configure the following:

   ```env
      HOST=
      PORT=
      DB_HOST=
      DB_PORT=
      DB_USER=
      DB_PASSWORD=
      DB_NAME=

      JWT_SECRET=
   ```

4. **Run database migrations**:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the server**:

   ```bash
   npm start
   ```

### API Endpoints

#### Authentication

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | `/api/v1/users/signup` | Register a new user |
| POST   | `/api/v1/users/login`  | Authenticate a user |

#### Products

| Method | Endpoint                             | Description                                       |
| ------ | ------------------------------------ | ------------------------------------------------- |
| POST   | `/api/v1/products/categories/create` | Create a new category (Admin)                     |
| POST   | `/api/v1/products/create`            | Create a new product (Admin)                      |
| GET    | `/api/v1/products/categories`        | Get all categoris (Pagination, Sorting)           |
| GET    | `/api/v1/products`                   | Get all products (Pagination, Sorting, Filtering) |
| GET    | `/api/v1/products/:id`               | Get a single product                              |
| PUT    | `/api/v1/products/:id`               | Update product (Admin)                            |
| DELETE | `/api/v1/products/:id`               | Delete product (Admin)                            |

#### Example API Call

Fetch all products with pagination and sorting:

```bash
curl -X GET "http://localhost:4001/api/v1/products?page=1&limit=10&sortBy=price&order=ASC"
```

### Testing

Run unit tests with:

```bash
npm test
```

### API Documentation

The API is documented using **Swagger** or **Postman** collections. Visit:

```bash
http://localhost:4001/api-docs
```

### Contributing

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit changes and push to your branch.
4. Open a Pull Request.

### License

This project is licensed under the **MIT License**.

### Contact

For inquiries or support, reach out via sen4word@gmail.com.

