require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: [
    'https://redditminimall.netlify.app', 
    'http://localhost:3000' 
  ],
  methods: ['GET', 'HEAD'], 
  credentials: false, 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Apply CORS with these options

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const USER_AGENT = process.env.REDDIT_USER_AGENT;

let accessToken;

// Fetch a new OAuth2 token (runs on startup and refreshes every hour)
async function refreshToken() {
  try {
    const response = await axios.post(
      "https://www.reddit.com/api/v1/access_token",
      "grant_type=client_credentials",
      {
        auth: { username: CLIENT_ID, password: CLIENT_SECRET },
        headers: { "User-Agent": USER_AGENT },
      }
    );
    accessToken = response.data.access_token;
    console.log("OAuth2 token refreshed!");
    setTimeout(refreshToken, 3600 * 1000); // Refresh every 1 hour
  } catch (err) {
    console.error("OAuth2 token error:", err.message);
  }
}

// Initialize OAuth2 token
refreshToken();

// Helper to delay requests (avoid rate limits)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Health check
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Fetch popular posts (OAuth2)
app.get("/reddit", async (req, res) => {
  try {
    await delay(1000);
    const response = await axios.get(
      "https://oauth.reddit.com/r/popular.json",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": USER_AGENT,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Reddit API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch Reddit data" });
  }
});

// Fetch comments for a post (OAuth2)
app.get("/comments/:subreddit/:id", async (req, res) => {
  const { subreddit, id } = req.params;
  try {
    await delay(1000);
    const response = await axios.get(
      `https://oauth.reddit.com/r/${subreddit}/comments/${id}.json`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": USER_AGENT,
        },
      }
    );
    res.json(response.data[1].data.children); // Comments only
  } catch (err) {
    console.error("Reddit comments error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Fetch popular subreddits (OAuth2)
app.get("/api/subreddits", async (req, res) => {
  try {
    await delay(1000);
    const response = await axios.get(
      "https://oauth.reddit.com/subreddits/popular.json?limit=20",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": USER_AGENT,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Subreddits error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch subreddits" });
  }
});

// Fetch posts from a subreddit (OAuth2)
app.get("/api/subreddit/:name", async (req, res) => {
  const { name } = req.params;
  try {
    await delay(1000);
    const response = await axios.get(
      `https://oauth.reddit.com/r/${name}.json`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": USER_AGENT,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Subreddit error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch subreddit posts" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
