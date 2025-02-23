const zkEngine = require("../zkengine");
const jwt = require("../auth/jwt");

exports.generateProof = async (req, res) => {
    try {
        const { input } = req.body; // 🔹 Ensure input is from body

        if (!input || typeof input !== "string") {
            return res.status(400).json({ error: "Invalid input: Expected a non-empty string" });
        }

        console.log("Received input for proof generation:", input); // Debugging log

        const proof = await zkEngine.generateProof(input);
        res.json({ proof });
    } catch (error) {
        console.error("Proof generation error:", error); // Log error for debugging
        res.status(500).json({ error: `Proof generation failed: ${error.message}` });
    }
};

exports.verifyProof = async (req, res) => {
    try {
        const { proof } = req.body;

        if (!proof) {
            return res.status(400).json({ error: "Missing proof for verification" });
        }

        const isValid = await zkEngine.verifyProof(proof);
        res.json({ valid: isValid });
    } catch (error) {
        res.status(500).json({ error: `Proof verification failed: ${error.message}` });
    }
};

exports.login = (req, res) => {
    try {
        const token = jwt.generateToken({ user: "testuser" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Token generation failed" });
    }
};

exports.secureEndpoint = (req, res) => {
    try {
        const auth = jwt.authenticate(req);

        if (!auth) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        res.json({ message: "Secure data accessed" });
    } catch (error) {
        res.status(500).json({ error: "Authentication processing failed" });
    }
};
