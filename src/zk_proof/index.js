const prover = require('./prover');
const verifier = require('./verifier');

module.exports = {
    generateProof: prover.generateProof,
    verifyProof: verifier.verifyProof,
};
