const { compileQueryProof } = require("../src/database/sql_engine");
const { generateProof, verifyProof } = require("../src/zk_proof/prover");
const crypto = require("crypto"); // ✅ Correct import

class ZKEngine {
    constructor(options = {}) {
        this.db = options.db || null;
    }

    /**
     * 🔹 Generates a Zero-Knowledge Proof for an input (query, transaction, auth, etc.)
     * @param {string} input - The raw SQL query or authentication data
     * @returns {object} - The proof object
     */
    async generateProof(input) {
        try {
            if (!input || typeof input !== "string") {
                throw new Error("Invalid input: Expected a non-empty string");
            }

            if (typeof compileQueryProof !== "function") {
                throw new Error("compileQueryProof is not a function. Check sql_engine.js.");
            }

            const zkInput = compileQueryProof(input); // Generate structured input

            // ✅ Ensure FastFile is present before calling generateProof
            if (!zkInput.FastFile) {
                throw new Error("Missing FastFile property in zkInput.");
            }

            const proof = await generateProof(zkInput); // Generate cryptographic proof
            return proof;
        } catch (error) {
            throw new Error(`Proof Generation Failed: ${error.message}`);
        }
    }

    /**
     * 🔹 Verifies the Zero-Knowledge Proof to check data integrity
     * @param {object} proof - The generated proof from the prover
     * @returns {boolean} - Verification result
     */
    async verifyProof(proof) {
        try {
            if (!proof || typeof proof !== "object") {
                throw new Error("Invalid proof: Expected a valid proof object");
            }

            return verifyProof(proof);
        } catch (error) {
            throw new Error(`Proof Verification Failed: ${error.message}`);
        }
    }
}

module.exports = new ZKEngine();
