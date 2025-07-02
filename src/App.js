import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import { timeline } from "./utils/data";
import { useState } from "react";
import Posts from "./components/Posts/Posts";

function App() {
  const [rating, setRating] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Posts timeline={timeline} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
