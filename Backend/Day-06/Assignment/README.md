<div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
  <h1 style="color: #2c3e50; font-size: 2.5em; font-weight: bold; border-bottom: 2px solid #3498db; display: inline-block; padding-bottom: 5px;">
    Authentication
  </h1>
</div>

---

## 🚀 Let's Start by Creating Our Assignment for Today

### 🌐 Project Overview:

We will build a simple authentication system with **two endpoints**.

---

### 1️⃣ **POST /signin** 📝

#### 🔹 Request Body:

```json
{
  "username": "string",
  "password": "string"
}
```

#### 🔹 Response:

    Returns a JSON Web Token (JWT) with the username encrypted.

#

### 2️⃣ **GET /users** 🔍

#### 🔹 Headers:

```json
Authorization: Bearer <your_token_here>
```

#### 🔹 Response:

    ✅ Returns an array of all users if the user is signed in (valid token).

    ❌ Returns 403 Forbidden if the token is invalid or missing.
