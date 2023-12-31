import './returning.css'
import React, { useState } from "react";
import Nav from "../../admin/adminnav/nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Issuing = () => {
  const nav = useNavigate();
  const [data, setData] = useState({
    user: "",
    book: "",
    dueDate:new Date(),
    transactionType: "returned",
  });

  const [searchTermUser, setSearchTermUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [resultUser, setResultUser] = useState([]);
  const [results, setResults] = useState([]);

  const handleClickOutside = (event) => {
    const listUser = document.getElementById("listUser");
    const listBook = document.getElementById("listBook");

    if (listUser && !listUser.contains(event.target)) {
      setResultUser([]);
      document.removeEventListener("click", handleClickOutside);
    }
    else if (listBook && !listBook.contains(event.target)){
      setResults([]);
      document.removeEventListener("click", handleClickOutside);
    }

  };


  const handleUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/searchUser/autocompleteSearch?searchTerm=${searchTermUser}`
      );
      setResultUser(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/books/search/autocomplete/returning?searchTerm=${searchTerm}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, book, dueDate, transactionType } = data;
      const res = await axios.post("http://localhost:5000/transactions", {
        user,
        book,
        dueDate,
        transactionType,
      });
      if (res.status === 201) {
        try {
          const result = await axios.patch(
            `http://localhost:5000/books/${book}`,
            { availability: true }
          );
          if (result.status === 200) {
            nav("/admindashboard");
            alert("book Successfully returned");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  document.addEventListener("click", handleClickOutside);

  return (
    <main>
      <Nav active={'return'} pageTitle={'Return Book'}/>
      <div className="return-container">
        <form className='form issue-form' onSubmit={handleSubmit}>
          <div className="return-user-container">
            <label htmlFor="user">User name</label>
            <input
              name="user"
              className="return-user-name"
              type="text"
              value={searchTermUser}
              placeholder="Username"
              onChange={(e) => {
                setSearchTermUser(e.target.value);
              }}
              onInput={handleUser}
            />
            {resultUser.length > 0 ? (
              <ul id='listUser'>
                {resultUser.map((user) => (
                  <li key={user._id}>
                   
                    <button
                    className='userSelectbtn'
                      name="user"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(data);
                        setData((prev) => ({
                          ...prev,
                          [e.target.name]: user._id,
                        }));
                        setSearchTermUser(user.username)
                        setResultUser([])
                      }}
                    >
                      {user.username}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p></p>
            )}
          </div>
          <div className="select-book-input-res-container">
            <label htmlFor="searchTerm">Book name</label>
            <input

              name="searchTerm"
            className='return-input-book-name'
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onInput={handleSearch}
              placeholder="Search book name"
            />
            {results.length > 0 ? (
              <ul id='listBook'>
                {results.map((book) => (
                  <li key={book._id}>
                    
                    <button
                      className='userSelectbtn'
                      name="book"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(data);
                        setData((prev) => ({
                          ...prev,
                          [e.target.name]: book._id,
                        }));
                        setSearchTerm(book.name);
                        setResults([])
                      }}
                    >
                      {book.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p></p>
            )}
          </div>
          <button className="btn-return"type="submit">Return book</button>
        </form>
      </div>
    </main>
  );
};

export default Issuing;