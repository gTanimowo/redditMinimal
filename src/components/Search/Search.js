import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../../store/SearchSlice";
import styles from "./Search.module.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(setSearchResults({ term: e.target.value }));
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search"
        className={styles.input}
        aria-label="Search"
        name="search"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
