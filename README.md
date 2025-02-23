# ZKEngine - Zero-Knowledge Proof Middleware

## Overview
`zkengine` is an npm package designed to integrate Zero-Knowledge Proofs (ZKPs) into Node.js applications. It provides a middleware that allows developers to generate and verify proofs efficiently using `snarkjs` and other cryptographic techniques.

## Installation
To install `zkengine`, use npm or yarn:

```sh
npm install zkengine
```

or

```sh
yarn add zkengine
```

## Features
- Zero-Knowledge Proof generation for SQL queries
- Proof verification support
- Middleware integration for Express.js
- Secure authentication mechanism

## Usage

### 1. Importing and Initializing

```javascript
const zkEngine = require("zkengine");
```

### 2. Generating a Proof

```javascript
const proof = await zkEngine.generateProof("SELECT * FROM users;");
console.log(proof);
```

### 3. Verifying a Proof

```javascript
const isValid = await zkEngine.verifyProof(proof);
console.log("Proof Valid:", isValid);
```

## Middleware Integration with Express.js
To integrate `zkengine` as middleware in an Express.js application:

```javascript
const express = require("express");
const zkEngine = require("zkengine");

const app = express();
app.use(express.json());

app.post("/generate-proof", async (req, res) => {
    try {
        const { input } = req.body;
        const proof = await zkEngine.generateProof(input);
        res.json({ proof });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

## CLI Usage
`zkengine` also comes with a CLI tool (`zkcli`) for proof generation and verification.

### 1. Generating a Proof
```sh
zkcli generate "SELECT * FROM users;"
```

### 2. Verifying a Proof
```sh
zkcli verify <proof_file>
```

## Configuration
Some settings can be customized using environment variables:

| Variable        | Default | Description |
|----------------|---------|-------------|
| `ZK_PROOF_MODE` | `snark` | Defines the proof generation mode |
| `DB_HOST` | `localhost` | Database connection host |
| `DB_PORT` | `5432` | Database port |

## API Reference
### `zkEngine.generateProof(input: string) -> Promise<object>`
Generates a Zero-Knowledge Proof for the given SQL query.

### `zkEngine.verifyProof(proof: object) -> Promise<boolean>`
Verifies the Zero-Knowledge Proof.

## License
`zkengine` is open-source and licensed under the MIT License.

---

For more details, visit the [GitHub repository](https://github.com/Fundspay/fundsweb-zkpengie).

