import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import { getData, getSubreddits } from "./utils/data";
import { useEffect, useState, Suspense, lazy } from "react";
import Posts from "./components/Posts/Posts";
import Error from "./components/Error/Error";
import SkeletonComment from "./components/Comments/SkeletonComment";

const Posts = lazy(() => import("./Posts"));
const Error = lazy(() => import("./Error"));

function App() {
  const [loading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");
  const [timeline, setIsTimeline] = useState([]);
  const [subreddit, setSubreddits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getData();
        if (!data) {
          throw new Error("An error occured, try again!");
        }

        setIsTimeline(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleGetSubreddits = async () => {
      const data = await getSubreddits();
      setSubreddits(data.children);
    };
    handleGetSubreddits();
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="App">
      <Suspense fallback={<SkeletonComment />}>
        <Routes>
          <Route path="/" element={<MainLayout nav={subreddit} />}>
            <Route
              index
              element={
                <Posts posts={timeline} isloading={loading} isError={error} />
              }
            />
            <Route path="r/:subreddit" element={<Posts />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
