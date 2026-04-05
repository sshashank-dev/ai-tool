import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// FIXED URL: Added /api and /chat/
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_KEY = "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";
const OPENROUTER_MODEL = "google/gemini-2.0-flash-001";

app.post("/api/ask", async (req, res) => {
    const { question } = req.body;
    try {
        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [{ role: "user", content: question }],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenRouter Error:", data);
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Server crashed while fetching" });
    }
});

// Explicitly listen on 0.0.0.0 to allow all local connections
app.listen(5000, "0.0.0.0", () => {
    console.log("✅ Backend running on http://localhost:5000");
});