require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("AnimeHub Backend Running");
});

// ANIME API ROUTES
const animeRoutes = require("./routes/anime");
app.use("/api/anime", animeRoutes);

// In-memory user storage (replace with database in production)
const users = [];

// LOGIN API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Trim whitespace from inputs
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    console.log("🔐 Login attempt:", { email: trimmedEmail, passwordLength: trimmedPassword?.length });

    if (!trimmedEmail || !trimmedPassword) {
        console.log("❌ Login failed: Missing fields");
        return res.json({ success: false, message: "All fields required" });
    }

    // Check if user exists in our registered users
    const user = users.find(u => u.email === trimmedEmail && u.password === trimmedPassword);

    if (user) {
        console.log("✅ Login successful for:", trimmedEmail);
        return res.json({ success: true, message: "Login successful" });
    }

    console.log("❌ Invalid credentials for:", trimmedEmail);
    res.json({ success: false, message: "Invalid credentials. Please sign up first." });
});

// SIGNUP API
app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedEmail || !trimmedPassword) {
        return res.json({ success: false, message: "All fields required" });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === trimmedEmail);
    if (existingUser) {
        return res.json({ success: false, message: "Email already registered" });
    }

    // Register new user
    users.push({ email: trimmedEmail, password: trimmedPassword });
    console.log("✅ New user registered:", trimmedEmail);
    console.log("📊 Total users:", users.length);

    res.json({ success: true, message: "Account created successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
