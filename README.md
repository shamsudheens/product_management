# Product Management System - Interview/Assessment Submission

This project is a robust, full-stack web application designed to demonstrate clean architecture, type safety, and efficient database interactions without relying on heavy frameworks (like ORMs).

## 🚀 Overview in Brief

- **Goal**: Manage product inventory with authentication and reporting.
- **Backend**: Node.js + Express (TypeScript).
- **Database**: MySQL (using `mysql2` with connecting pooling, **Raw SQL** for performance).
- **Architecture**: **Strict Repository Pattern** (Controller ↔ Service ↔ Repository).
- **Frontend**: Lightweight HTML/CSS/(No heavy framework dependencies).

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript (Strict typing enabled)
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **Authentication**: JWT (JSON Web Tokens) + Bcrypt for hashing
- **Logging**: Winston (Structured logging)

## 🏗 Architecture & Design Decisions

I chose a **3-Layer Architecture** (Repository Pattern) to ensure Separation of Concerns:

1.  **Controller Layer (`src/controllers`)**: Handles HTTP requests, parses inputs, and sends responses. It contains **no business logic**.
2.  **Service Layer (`src/services`)**: Contains the business logic. It orchestrates data flow between controllers and repositories.
3.  **Repository Layer (`src/repositories`)**: The **only** layer that touches the database. It executes raw SQL queries, ensuring the rest of the app is agnostic of the underlying database technology.

**Why this approach?**
- **Scalability**: Logic is separated, making it easier to add features.
- **Maintainability**: Changing the database implementation only affects the Repository layer.
- **Professional Standard**: Demonstrates enterprise-grade Node.js development practices.

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js (v14 or higher)
- MySQL Server

### 2. Clone & Install
```bash
git clone <repository-url>
cd product-management-system
npm install
```

### 3. Database Configuration
Run the provided SQL script to initialize the schema and seed data.
```bash
# Example command (adjust for your system)
sudo mysql -u root -p < database/productDb.sql
```
This creates:
- Database: `product_management_system`
- Default User: `admin` / `admin123`

### 4. Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and update `DB_PASSWORD` with **YOUR** local MySQL password.
   ```env
   PORT=3006
   DB_HOST=localhost
   DB_USER=root           
   DB_PASSWORD=your_actual_password_here
   DB_NAME=product_management_system
   JWT_SECRET=shamsudheen_secret
   ```

### 5. Running the Application

**Development Mode** (with TypeScript execution):
```bash
npm run dev
```

**Production Build** (Clean compile & run):
```bash
npm run build
node app.js
```
*Access the app at:* `http://localhost:3006/`

## 📂 Project Structure

```text
src/
 ├── config/            # Database Connection Pool
 ├── controllers/       # Route Controllers (Request/Response)
 ├── middleware/        # Auth, Error Handling, Logging
 ├── repositories/      # SQL Queries & Data Access
 ├── routes/            # API Route Definitions
 ├── services/          # Business Logic
 ├── types/             # TypeScript Interfaces
 ├── utils/             # Headers, Hashing, Token Utils
 ├── views/             # Frontend Static Assets
 └── app.ts             # Application Entry Point
```

## ✅ Features Implemented

1.  **Secure Authentication**:
    - Users utilize JWT for stateless authentication.
    - Passwords are salted and hashed using `bcrypt` (Work factor: 10).
2.  **Product Management (CRUD)**:
    - Create, Read, Update, Delete products.
    - Data validation ensures integrity.
3.  **Inventory Reports**:
    - Aggregated statistics (Total Value, Total Quantity) calculated directly via SQL for performance.
4.  **Security Best Practices**:
    - **No SQL Injection**: Uses parameterized queries implementation from `mysql2`.
    - **Environment Config**: Secrets managed via `.env`.
    - **Error Handling**: Centralized error middleware ensures no sensitive stack traces leak to the client.

## 🧪 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Login & receive JWT | No |
| `GET` | `/products` | List all products | **Yes** |
| `POST` | `/products` | Add new product | **Yes** |
| `PUT` | `/products/:id` | Update product | **Yes** |
| `DELETE` | `/products/:id` | Remove product | **Yes** |
| `GET` | `/reports` | View inventory stats | **Yes** |

---
