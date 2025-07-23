import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import { getData } from "./utils/data";
import { useEffect, useState } from "react";
import Posts from "./components/Posts/Posts";

function App() {
  const [rating, setRating] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");
  const [timeline, setIsTimeline] = useState([]);

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
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Posts posts={timeline} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
