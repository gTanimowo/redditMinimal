const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Endpoint for Reddit popular posts
app.get("/reddit", async (req, res) => {
  try {
    const response = await fetch("https://www.reddit.com/r/popular.json", {
      headers: { "User-Agent": "MyRedditApp/1.0" },
    });

    if (!response.ok) {
      console.error("Reddit API error:", response.status, response.statusText);
      return res.status(500).json({ error: "Failed to fetch Reddit data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch Reddit data" });
  }
});

// Endpoint for Reddit comments of a post
app.get("/comments/:subreddit/:id", async (req, res) => {
  const { subreddit, id } = req.params;
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${id}.json`,
      {
        headers: { "User-Agent": "MyRedditApp/1.0" },
      }
    );

    if (!response.ok) {
      console.error(
        "Reddit comments API error:",
        response.status,
        response.statusText
      );
      return res.status(500).json({ error: "Failed to fetch Reddit comments" });
    }

    const data = await response.json();
    res.json(data[1].data.children); // Send only comments
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch Reddit comments" });
  }
});

// Endpoint for popular subreddits (navigation)
app.get("/api/subreddits", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.reddit.com/subreddits/popular.json?limit=20",
      {
        headers: { "User-Agent": "MyRedditApp/1.0" },
      }
    );

    if (!response.ok) {
      console.error(
        "Reddit subreddits API error:",
        response.status,
        response.statusText
      );
      return res.status(500).json({ error: "Failed to fetch subreddits" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch subreddits" });
  }
});

// Endpoint to get posts from a specific subreddit
app.get("/api/subreddit/:name", async (req, res) => {
  const { name } = req.params;
  const url = `https://www.reddit.com/r/${name}.json`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "MyRedditApp/1.0" },
    });

    if (!response.ok) {
      console.error(
        "Reddit subreddit API error:",
        response.status,
        response.statusText
      );
      return res.status(500).json({ error: "Failed to fetch subreddit posts" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Reddit fetch error:", error);
    res.status(500).json({ error: "Failed to fetch subreddit posts" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
