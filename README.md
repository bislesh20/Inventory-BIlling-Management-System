📦 Inventory & Billing Management System

A simple backend system for small businesses to manage products, customers, vendors, and transactions.
Each business user manages their own data securely with JWT authentication.

🚀 Features

User Authentication – Register, login, logout with JWT

Product Management – Add, edit, delete, and list products with stock tracking

Customer & Vendor Management – Manage contacts with search functionality

Transaction Management – Record sales & purchases, auto-update stock, calculate totals

Reports – View inventory, transaction history, and summaries

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Authentication & Security: JWT + bcrypt

Environment Management: dotenv, config

Middleware & Utilities: cookie-parser, path

Development Tools: nodemon

📂 Project Structure
src/
├── app.js # Main application file
├── routes/ # API route files
├── models/ # MongoDB schemas
├── controllers/ # Route handlers
├── middleware/ # Auth middleware
├── config/ # Config files
└── utils/ # Helper functions

📑 API Endpoints
🔑 Authentication

POST /auth/register → Register a new user

POST /auth/login → Login user

GET /auth/logout → Logout

📦 Products

GET /products → List all products

POST /products → Add a new product

PUT /products/:id → Update a product

PATCH /products/:id/stock → Update the stock (increase/decrease)

DELETE /products/:id → Delete a product

👥 Contacts (Customers & Vendors)

GET /contacts → List all contacts

POST /contacts → Add a contact

PUT /contacts/:id → Update a contact

DELETE /contacts/:id → Delete a contact

💰 Transactions

GET /transactions → List all transactions

POST /transactions → Record a transaction

📊 Reports

GET /reports/inventory → Current inventory with stock levels

GET /reports/transactions → Transaction history with filters

⚙️ Installation & Setup

# Clone the repository

git clone https://github.com/bislesh20/Inventory-Billing-Management-System.git

# Navigate to the project

cd Inventory-Billing-Management-System

# Install dependencies

npm install

# Configure environment variables in .env file

PORT=3000
MONGO_URI = mongodb://localhost:27017/inventory_billing
JWT_SECRET= sjdhf83hfj3jfsdf9sd8f7sd9fsd8f7sd9f8sd7f8sd7f

# Run the application

npm start
