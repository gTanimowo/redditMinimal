export async function getData() {
  const url = "http://localhost:5000/reddit";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response: ${response.status}`);
    }
    const jsonData = await response.json();
    const posts = jsonData.data.children;
    return posts;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getComments(subreddit, id) {
  const url = `http://localhost:5000/comments/${subreddit}/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

export async function getSubreddits() {
  const url = "http://localhost:5000/api/subreddits";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response: ${response.status}`);
    }
    const jsonData = await response.json();
    const sub = jsonData.data;
    console.log(sub);
    return sub;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getDataBySubreddit(name) {
  const url = `http://localhost:5000/api/subreddit/${name}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const json = await response.json();
    return json.data.children;
  } catch (error) {
    console.error("Subreddit data error:", error.message);
    return [];
  }
}
