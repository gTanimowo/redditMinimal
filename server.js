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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
