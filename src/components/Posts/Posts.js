import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { getDataBySubreddit } from "../../utils/data";
import SkeletonComment from "../Comments/SkeletonComment";
import { useSelector } from "react-redux";
import Error from "../Error/Error";

const Posts = ({ posts, isloading, isError }) => {
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
        alert.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubredditPosts();
  }, [subreddit]);

  const searchTerm = useSelector((state) => state.search.search);

  const currentPosts = subreddit ? subredditPosts : posts ?? [];

  const filteredPosts =
    searchTerm && searchTerm.trim() !== ""
      ? currentPosts.filter((post) =>
          post.data.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : currentPosts;

  return (
    <div>
      <h2>{subreddit ? `r/${subreddit}` : "Popular Feed"}</h2>
      {isError ? (
        <Error />
      ) : loading || isloading ? (
        <SkeletonComment />
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Post key={post.data.id} post={post} />)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default Posts;
