import "./addBook.css";
import React, { useState } from "react";
import Nav from "../../admin/adminnav/nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBook = () => {

  const nav = useNavigate();
  const [data, setData] = useState({
    name: "",
    author: "",
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, author } = data;
    try {
      const res = await axios.post("http://localhost:5000/books/", {
        name: name,
        author: author,
      });
      if (res.status === 201) {
        nav("/admindashboard");
        alert("Book Added");
      }
    } catch (error) {
      console.log(error.message);
      setError("The book is already exists");
    }
  };

  return (
    <main>
      <Nav active={"add"} pageTitle={"Add Book"} />
      <div className="add-book-container">
        <form className="form form-addbook" onSubmit={handleSubmit}>
          <div className="add-book-name-container">
            <label className="add-book-name-label">Book name</label>
            <input
              type="text"
              className="add-book-name-input"
              placeholder="Book name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-book-author-container">
            <label className="add-book-author-label">Book author</label>
            <input
              name="author"
              className="add-book-author-input"
              type="text"
              placeholder="Author name"
              value={data.author}
              onChange={handleChange}
              required
            />
            {error ? error : ""}
            <button type="submit" className="add-book-btn">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddBook;
