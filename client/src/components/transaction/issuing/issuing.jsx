import "./issuing.css";
import React, { useState } from "react";
import Nav from "../../admin/adminnav/nav";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Issuing = () => {
  const nav = useNavigate();
  const [data, setData] = useState({
    user: "",
    book: "",
    dueDate: new Date(),
    transactionType: "borrowed",
  });

  const [searchTermUser, setSearchTermUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [resultUser, setResultUser] = useState([]);
  const [results, setResults] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Add click event listener to close dropdown when clicking outside the list
  const handleClickOutside = (event) => {
    const listContainer = document.getElementById("userListContainer");
    const listContainer2 = document.getElementById("userListContainer2");

    if (listContainer && !listContainer.contains(event.target)) {
      setResultUser([]);
      document.removeEventListener("click", handleClickOutside);
    }
    else if (listContainer2 && !listContainer2.contains(event.target)){
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
        `http://localhost:5000/books/search/autocomplete?searchTerm=${searchTerm}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error.message);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setData((prevData) => ({
      ...prevData,
      dueDate: date,
    }));
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
            { availability: false }
          );
          if (result.status === 200) {
            nav("/admindashboard");
            alert("Book Successfully issued");
          }
        } catch (error) {
          console.error("Error updating book availability:", error.message);
        }
      }
    } catch (error) {
      console.error("Error issuing book:", error.message);
    }
  };
  
  document.addEventListener("click", handleClickOutside);

  return (
    <main>
      <Nav active={"issue"} pageTitle={"Issue"} />
      <div className="issue-container">
        <form className="issue-form" onSubmit={handleSubmit}>
          <div className="issue-user-container">
            <label htmlFor="user">User name</label>
            <input
              name="user"
              className="issue-user-name"
              type="text"
              value={searchTermUser}
              placeholder="Username"
              required
              onChange={(e) => {
                setSearchTermUser(e.target.value);
              }}
              onInput={handleUser}
            />
            {resultUser.length > 0 ? (
              <ul id="userListContainer">
                {resultUser.map((user) => (
                  <li key={user._id}>
                    <button
                      className="userSelectbtn"
                      name="user"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(data);
                        setData((prev) => ({
                          ...prev,
                          [e.target.name]: user._id,
                        }));
                        setSearchTermUser(user.username);
                        setResultUser([]);
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
          <div className="selec-book-input-res-container">
            <label htmlFor="searchTerm">Book name</label>
            <input
              name="searchTerm"
              type="text"
              className="issue-book-name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onInput={handleSearch}
              placeholder="Search book name"
              required
            />
            {results.length > 0 ? (
              <ul id='userListContainer2'>
                {results.map((book) => (
                  <li key={book._id}>
                    <button
                      className="userSelectbtn"
                      name="book"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(data);
                        setData((prev) => ({
                          ...prev,
                          [e.target.name]: book._id,
                        }));
                        setSearchTerm(book.name);
                        setResults([]);
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
          <div className="date-box">
            <label>Select Date</label>
            <DatePicker
              className="datepicker"
              name="dueDate"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>
          <button className="btn-issue" type="submit">
            Issue book
          </button>
        </form>
      </div>
    </main>
  );
};

export default Issuing;
