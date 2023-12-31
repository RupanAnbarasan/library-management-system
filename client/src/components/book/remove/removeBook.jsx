import "./removebook.css";
import React, { useState } from "react";
import Nav from "../../admin/adminnav/nav";
import axios from "axios";
const RemoveBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/books/search/autocomplete?searchTerm=${searchTerm}`
      );
      console.log(response);
      if (response.data.length > 0 && response.status === 200) {
        setResults(response.data);
      } else if (response.data.length === 0) {
        setError("No books");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error fetching autocomplete results:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      alert("Book was deleted successfully");
      setResults([]);
      setSearchTerm("");
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  return (
    <main>
      <Nav active={"remove"} pageTitle={"Remove Book"} />

      <div className="remove-book-container">
        <div className="remove-book-input-res-container">
          <label htmlFor="searchTerm">Book name</label>
          <br />
          <input
            name="searchTerm"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onInput={handleSearch}
            placeholder="Search book name to delete"
          />

          {results.length > 0 ? (
            <ul>
              {results.map((book) => (
                <li key={book._id}>
                  {book.name}
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : error ? (
            error
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
};

export default RemoveBook;
