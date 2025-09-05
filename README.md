# Inventory & Billing Management System

A simple backend system for small businesses to manage products, customers, vendors, and basic transactions.

## Overview

Build a simple backend system for small businesses to manage products, customers, vendors, and basic transactions. Each business user manages their own data with JWT authentication.

## Core Features

### 1. User Authentication

- Username or email/password login (JWT)
- Basic session management
- Each business user manages their own data

### 2. Product Management

- Add, edit, delete, and list products
- Simple stock tracking (increase/decrease)
- Basic search by name or category

### 3. Customer & Vendor Management

- Add, edit, delete customers and vendors
- Simple list and search functionality

### 4. Transaction Management

- Record sales (to customers) and purchases (from vendors)
- Automatically update product stock
- Calculate totals

### 5. Simple Reports

- List all transactions with filters (date, type)
- Current inventory with stock levels
- Customer/vendor transaction history

## Technical Requirements

### Project Structure

src/
├── app.js # Main application file
├── routes/ # API route files
├── models/ # MongoDB schemas
├── controllers/ # Route handlers
├── middleware/ # Basic auth middleware
├── config/ # Configuration files
└── utils/ # Helper functions

### Database (MongoDB)

- Use Mongoose for database operations
- Schema design with relationships
- No complex aggregations required

### Authentication

- Session-based auth (JWT required)
- Basic password hashing using bcrypt
- Simple middleware to protect routes

### Error Handling

- Basic try-catch blocks
- Error responses
- Console logging for debugging

## API Endpoints

### Authentication

- `POST /login`
- `POST /register`
- `GET /logout`

### Products

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### Customers/Vendors

- `GET /contacts`
- `POST /contacts`
- `PUT /contacts/:id`
- `DELETE /contacts/:id`

### Transactions

- `GET /transactions`
- `POST /transactions`

### Reports

- `GET /reports/inventory`
- `GET /reports/transactions`

## Data Schemas

### Product Schema

{
name: String,
description: String,
price: Number,
stock: Number,
category: String,
businessId: String
}

### Customer/Vendor Schema

{
name: String,
phone: String,
email: String,
address: String,
type: 'customer' or 'vendor',
businessId: String
}

### Transaction Schema

{
type: 'sale' or 'purchase',
customerId: String, // for sales
vendorId: String, // for purchases
products: [{
productId: String,
quantity: Number,
price: Number
}],
totalAmount: Number,
date: Date,
businessId: String
}

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB connection
4. Configure environment variables
5. Run the application: `npm start`

.
