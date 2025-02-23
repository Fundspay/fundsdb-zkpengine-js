const snarkjs = require('snarkjs');

async function verifyProof(proof) {
    const verificationKey = {};  // Load verification key
    const result = await snarkjs.groth16.verify(verificationKey, proof.publicSignals, proof.proof);
    return result;
}

module.exports = { verifyProof };
