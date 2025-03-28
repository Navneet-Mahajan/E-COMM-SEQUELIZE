Node.js E-Commerce Backend

Overview

This backend-only application provides a robust foundation for an e-commerce platform. It includes user authentication, role-based access control, and product management functionalities. Users can register, log in, update their profiles, and manage a shopping cart. Merchants can add and update products. The backend follows REST API principles and integrates with MySQL using Sequelize as the ORM. While the current version is backend-focused, future enhancements will include an EJS-based frontend.

Tech Stack

Backend: Node.js, Express.js

Database: MySQL (using Sequelize ORM)

Authentication: JWT (JSON Web Tokens)

Role-Based Access Control: Middleware implementation

Environment Management: Dotenv

ORM: Sequelize with Sequelize-CLI and Migrations

Getting Started

Prerequisites

Before installing and running this application, ensure you have the following installed on your system:

Node.js (v16 or higher)

MySQL (local instance or cloud-hosted service)

Git (optional, for cloning the repository)

A compatible operating system (Windows, macOS, or Linux)

Installation Instructions

Clone the repository using the following command:

git clone https://github.com/yourusername/ecommerce-backend.git

Navigate to the project directory:

cd ecommerce-backend

Install the required dependencies:

npm install

Create a .env file in the root directory and configure it with the following variables:

PORT=3000
DB_NAME=ecommerce
DB_USER=root
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret_key

Set up the database:

npx sequelize db:create
npx sequelize db:migrate

Start the application:

npm start

API Endpoints

Authentication

Method

Endpoint

Description

POST

/api/users/register

Register a new user

POST

/api/users/

Log in an existing user

User Management

Method

Endpoint

Description

GET

/api/users/

Retrieve the user's profile

PUT

/api/users/

Update the user's profile

POST

/api/users/send-otp

Send OTP for resetting password

PUT

/api/users/reset-password

Reset the user's password

Product Management (Merchant Only)

Method

Endpoint

Description

POST

/api/products

Add a new product

PUT

/api/products/:id

Update an existing product

GET

/api/products

List all products

GET

/api/products/:id

View product by ID

Cart Functionalities

Method

Endpoint

Description

POST

/api/cart/

Add a product to the cart

GET

/api/cart

Retrieve the user's cart

Help and Troubleshooting

Common Issues and Solutions

Database connection error: Ensure MySQL is running and the .env file contains the correct database credentials.

Sequelize migration issues: Run the following command to reapply migrations:

npx sequelize db:migrate:undo:all && npx sequelize db:migrate

Missing environment variables: Verify that all required variables are defined in the .env file.

Dependency issues: Run the following command to check and fix dependency problems:

npm install --force

Future Enhancements

Implement inventory management to track product stock levels.

Integrate secure OTP functionality.

Develop order processing and payment integration.

Build an EJS-based frontend for seamless user interaction.

Optimize API performance and implement caching strategies.

Author

Developed by Navneet Mahajan. For more information, visit my GitHub profile: GitHub Profile