import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { getDataBySubreddit } from "../../utils/data";
import SkeletonComment from "../Comments/SkeletonComment";

const Posts = ({ posts }) => {
  const { subreddit } = useParams();
  const [subredditPosts, setSubredditPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubredditPosts = async () => {
      if (!subreddit) return;
      setSubredditPosts([]);
      setLoading(true);
      try {
        const data = await getDataBySubreddit(subreddit);
        setSubredditPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubredditPosts();
  }, [subreddit]);

  if (subreddit) {
    return (
      <div>
        <h2>r/{subreddit}</h2>
        {loading ? (
          <SkeletonComment />
        ) : (
          subredditPosts.map((post) => <Post key={post.data.id} post={post} />)
        )}
      </div>
    );
  }

  // if no subredditName (home page)

  if (!subreddit) {
    // Only check posts when no subreddit selected
    if (loading)
      return (
        <div>
          <SkeletonComment />
        </div>
      );
    if (!posts || posts.length === 0) return <div>No posts to display</div>;
  }
  return (
    <div>
      <h2>Popular Feed</h2>

      {posts?.map((post) => (
        <Post key={post.data.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
