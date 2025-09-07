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

Authentication: JWT + bcrypt

Others: dotenv, express-validator

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

POST /api/auth/register → Register a new user

POST /api/auth/login → Login user

GET /api/auth/logout → Logout

📦 Products

GET /api/products → List all products

POST /api/products → Add a new product

PUT /api/products/:id → Update a product

DELETE /api/products/:id → Delete a product

👥 Contacts (Customers & Vendors)

GET /api/contacts → List all contacts

POST /api/contacts → Add a contact

PUT /api/contacts/:id → Update a contact

DELETE /api/contacts/:id → Delete a contact

💰 Transactions

GET /api/transactions → List all transactions

POST /api/transactions → Record a transaction

📊 Reports

GET /api/reports/inventory → Current inventory with stock levels

GET /api/reports/transactions → Transaction history with filters

⚙️ Installation & Setup

# Clone the repository

git clone https://github.com/bislesh20/Inventory-Billing-Management-System.git

# Navigate to the project

cd Inventory-Billing-Management-System

# Install dependencies

npm install

# Configure environment variables in .env file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Run the application

npm start
