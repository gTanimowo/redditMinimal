const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getData() {
  try {
    const response = await fetch(`${API_BASE_URL}/reddit`);
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
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${subreddit}/${id}`);
    if (!response.ok) {
      throw new Error(`Response: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

export async function getSubreddits() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/subreddits`);
    if (!response.ok) {
      throw new Error(`Response: ${response.status}`);
    }
    const jsonData = await response.json();
    const sub = jsonData.data;
    return sub;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getDataBySubreddit(name) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/subreddit/${name}`);
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
