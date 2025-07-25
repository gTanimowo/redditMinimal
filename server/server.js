const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Endpoint for Reddit posts
app.get("/reddit", async (req, res) => {
  try {
    const response = await fetch("https://www.reddit.com/r/popular.json", {
      headers: {
        "User-Agent": "MyRedditApp/1.0",
      },
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

// Endpoint for Reddit comments
app.get("/comments/:subreddit/:id", async (req, res) => {
  const { subreddit, id } = req.params;
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${id}.json`
    );
    const data = await response.json();
    res.json(data[1].data.children); // Send only comments
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Reddit comments" });
  }
});

//Endpoint for subreddits for navigation
app.get("/api/subreddits", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.reddit.com/subreddits/popular.json?limit=20"
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch subreddits" });
  }
});

//Endpoint to get subreddits data
app.get("/api/subreddit/:name", async (req, res) => {
  const { name } = req.params;
  const url = `https://www.reddit.com/r/${name}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    res.json(data); // Send Reddit data back to your frontend
  } catch (error) {
    console.error("Reddit fetch error:", error);
    res.status(500).json({ error: "Failed to fetch subreddit posts" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
