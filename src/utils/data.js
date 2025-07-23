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
