---
title: Integrating zkEngine as Middleware in an Express.js Application
sidebar_label: Express.js Middleware Guide
---

## Overview
This guide will walk you through the step-by-step process of integrating `zkengine` as middleware in an Express.js application using Sequelize and Node.js.

## Prerequisites
Before you start, ensure you have the following:
- **Node.js** (>=16.x recommended)
- **Express.js** installed
- **Sequelize** ORM configured with PostgreSQL
- **zkengine** installed via npm

## Step 1: Initialize an Express.js Application
First, create a new project and install necessary dependencies:
```sh
mkdir zkapp && cd zkapp
npm init -y
npm install express sequelize pg pg-hstore dotenv zkengine
```

## Step 2: Set Up Database Configuration
Create a `.env` file for storing database credentials securely:
```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
DB_HOST=localhost
DB_PORT=5432
```

Now, configure Sequelize in `config/db.js`:
```js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
```

## Step 3: Define a User Model with Sequelize
Create a `models/user.js` file:
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
```

## Step 4: Initialize zkEngine Middleware
In `middleware/zkMiddleware.js`, define middleware to integrate zkEngine:
```js
const zkEngine = require('zkengine');

const zkMiddleware = async (req, res, next) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ error: 'Input is required for proof generation' });
    }

    const proof = await zkEngine.generateProof(input);
    req.proof = proof; // Attach proof to request
    next();
  } catch (error) {
    res.status(500).json({ error: `Proof generation failed: ${error.message}` });
  }
};

module.exports = zkMiddleware;
```

## Step 5: Set Up Express.js Routes
Modify `routes/proof.js` to use zkEngine middleware:
```js
const express = require('express');
const zkMiddleware = require('../middleware/zkMiddleware');
const router = express.Router();

router.post('/generate', zkMiddleware, (req, res) => {
  res.json({ proof: req.proof });
});

module.exports = router;
```

## Step 6: Create the Express Server
Now, create an `index.js` file:
```js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const proofRoutes = require('./routes/proof');

const app = express();
app.use(express.json());
app.use('/proof', proofRoutes);

sequelize.sync().then(() => {
  console.log('✅ Database connected');
  app.listen(3000, () => console.log('🚀 Server running on port 3000'));
});
```

## Step 7: Test the API
Start the server:
```sh
node index.js
```

Test the proof generation using `curl` or Postman:
```sh
curl -X POST http://localhost:3000/proof/generate \
  -H "Content-Type: application/json" \
  -d '{"input": "SELECT * FROM users;"}'
```

If successful, you should receive a proof response:
```json
{
  "proof": { ... }
}
```

## Conclusion
You have successfully integrated `zkengine` as middleware in an Express.js application using Sequelize and PostgreSQL. 🚀

For more details, visit the official zkEngine documentation!

