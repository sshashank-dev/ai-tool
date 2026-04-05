// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch"; // You MUST have this line since it's in your package.json

// const app = express();
// app.use(cors());
// app.use(express.json());

// const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
// const OPENROUTER_KEY = "sk-or-v1-your-key-here";
// const OPENROUTER_MODEL = "openai/gpt-3.5-turbo";

// app.post("/api/ask", async (req, res) => {
//     try {
//         const { question } = req.body;
//         console.log("Question received:", question);

//         const response = await fetch(OPENROUTER_URL, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${OPENROUTER_KEY}`,
//                 "Content-Type": "application/json",
//                 "HTTP-Referer": "http://localhost:5173", // Vite default port
//                 "X-Title": "My AI App"
//             },
//             body: JSON.stringify({
//                 model: OPENROUTER_MODEL,
//                 messages: [{ role: "user", content: question }],
//             }),
//         });

//         // Check if OpenRouter itself sent an error
//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("OpenRouter Error:", errorData);
//             return res.status(response.status).json(errorData);
//         }

//         const data = await response.json();
//         res.json(data);

//     } catch (err) {
//         console.error("BACKEND CRASHED:", err.message);
//         res.status(500).json({ error: "Server Error", details: err.message });
//     }
// });

// app.listen(5000, () => {
//     console.log("✅ Server is definitely running on port 5000");
// });




// import express from "express";
// import cors from "cors";

// const app = express();

// // Standard middleware
// app.use(cors());
// app.use(express.json());

// // CONFIGURATION
// const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
// const OPENROUTER_KEY = process.env.VITE_GEMINI_KEY;
// const OPENROUTER_MODEL = "openai/gpt-3.5-turbo";

// app.post("/api/ask", async (req, res) => {
//     try {
//         const { question } = req.body;

//         // 1. Safety check for the API key
//         if (!OPENROUTER_KEY) {
//             console.error("CRITICAL: OPENROUTER_KEY is missing from Vercel Environment Variables.");
//             return res.status(500).json({ error: "Server Configuration Error: Missing API Key" });
//         }

//         // 2. Use the NATIVE fetch (built into Node 18+)
//         const response = await fetch(OPENROUTER_URL, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${OPENROUTER_KEY}`,
//                 "Content-Type": "application/json",
//                 "HTTP-Referer": "https://eclipse-ai.vercel.app",
//                 "X-Title": "Eclipse AI"
//             },
//             body: JSON.stringify({
//                 model: OPENROUTER_MODEL,
//                 messages: [{ role: "user", content: question }],
//             }),
//         });

//         // 3. Handle OpenRouter errors
//         if (!response.ok) {
//             const errorText = await response.text(); // Get raw text to avoid JSON parse errors
//             console.error("OpenRouter API Error:", errorText);
//             return res.status(response.status).send(errorText);
//         }

//         const data = await response.json();
//         res.json(data);

//     } catch (err) {
//         console.error("BACKEND EXCEPTION:", err.message);
//         res.status(500).json({ error: "Internal Server Error", details: err.message });
//     }
// });

// // DO NOT use app.listen(). Vercel handles the server lifecycle.
// export default app;




import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURATION - Matches your Vercel Environment Variable name
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = "openai/gpt-3.5-turbo";

app.post("/api/ask", async (req, res) => {
    try {
        const { question } = req.body;

        if (!OPENROUTER_KEY) {
            return res.status(500).json({ error: "API Key missing in Vercel settings" });
        }

        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_KEY}`,
                "Content-Type": "application/json",
                // This dynamic referer helps avoid 401 errors on Vercel
                "HTTP-Referer": req.headers.origin || "https://eclipse-ai.vercel.app",
                "X-Title": "Eclipse AI"
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [{ role: "user", content: question }],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Forward the specific error from OpenRouter (e.g., Invalid Key)
            return res.status(response.status).json(data);
        }

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

export default app;