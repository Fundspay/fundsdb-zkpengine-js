const zkEngine = require('../zk_proof');

async function zkMiddleware(req, res, next) {
    const { proof } = req.body;

    if (!proof) {
        return res.status(400).json({ error: "Proof is required" });
    }

    const isValid = await zkEngine.verifyProof(proof);

    if (!isValid) {
        return res.status(403).json({ error: "Invalid Zero-Knowledge Proof" });
    }

    next();
}

module.exports = zkMiddleware;
