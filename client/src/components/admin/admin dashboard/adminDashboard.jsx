import "./adminDashboard.css";
import React, { useState, useEffect } from "react";
import Nav from "../adminnav/nav";
import axios from "axios";
const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([
    { _id: "", transactionType: "", dueDate: "", book: "", user: "" },
  ]);
  const [data, setData] = useState([
    { _id: "", transactionType: "", dueDate: "", book: "", user: "" },
  ]);
  const [bookdetails, setBookDetails] = useState([]);
  const [userdetails, setUserDetails] = useState([]);

  useEffect(() => {
    var load = async () => {
      try {
        const books = await axios.get("http://localhost:5000/books");
        if (books.status === 200) {
          setBooks(books.data);
        }
        const transactions = await axios.get(
          "http://localhost:5000/transactions"
        );
        if (transactions.status === 200) {
          setData(transactions.data);
          setTransactions(transactions.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const onLoadTransactions = async () => {
      try {
        const bookIds = transactions.map((a) => a.book);
        const bookPromises = bookIds.map((id) =>
          axios.get(`http://localhost:5000/books/${id}`)
        );
        const bookResponses = await Promise.all(bookPromises);
        const bookData = bookResponses.map((response) => response.data);
        setBookDetails(bookData);

        const userIds = transactions.map((a) => a.user);

        const userPromises = userIds.map((id) =>
          axios.get(`http://localhost:5000/users/${id}`)
        );
        const userResponses = await Promise.all(userPromises);

        const userData = userResponses.map((response) => response.data);

        setUserDetails(userData);
      } catch (error) {
        console.log(error.message);
      }
    };
    onLoadTransactions();
  }, [transactions]);

  const formatDate = (dueDate) => {
    const date = new Date(dueDate);
    return date.toLocaleDateString();
  };
  const handleSeprate = async (e) => {
    e.preventDefault();
    try {
      if (e.target.value === "all") {
        setTransactions(data);
      } else if (e.target.value === "returned") {
        const returned = data.filter(
          (transaction) => transaction.transactionType === "returned"
        );
        console.log(returned);
        setTransactions(returned);
      } else {
        const borrowed = data.filter(
          (transaction) => transaction.transactionType === "borrowed"
        );
        setTransactions(borrowed);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <main>
      <Nav active={"home"} pageTitle={"Home"} />
      <section className="admin-contentCenter">
        <h2 className="title-books"> Books</h2>
        <div className="admin-Catalog-container">
          {books.length > 0 ? (
            <div className="admin-catalog-list">
              {books.map((a) => {
                return (
                  <div className="admin-book" key={a._id}>
                    <p className="admin-bookName">{a.name}</p>
                    <hr />
                    <p className="admin-author">Author name</p>
                    <p>{a.author}</p>
                    <div
                      className={
                        a.availability
                          ? "admin-book-availability"
                          : "admin-book-not-available"
                      }
                    >
                      {a.availability ? "Available" : "Not Available"}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="nolist">"No books"</div>
          )}
        </div>
      </section>
      <hr />

      <section>
        <div className="admin-contentCenter">
          <h2 className="title-transactions">Transactions</h2>
          <select className="tnxdropdown" onChange={(e) => handleSeprate(e)}>
            <option value="all">All</option>
            <option value="returned">Returned</option>
            <option value="borrowed">Borrowed</option>
          </select>

          <div className="personal-transaction-container">
            {transactions.length > 0 ? (
              transactions.map((a, index) => (
                <div key={a._id}>
                  <div className="transaction-list">
                    <p>
                      <b>Transaction type :</b> {a.transactionType}
                    </p>
                    <hr />
                    <p>
                      <b>
                        {a.transactionType === "borrowed"
                          ? "Due Date"
                          : "Submited Date"}{" "}
                        :{" "}
                      </b>{" "}
                      {formatDate(a.dueDate)}
                    </p>
                    <p>
                      <b>Book name : </b>
                      {bookdetails[index]
                        ? bookdetails[index].name
                        : "Loading..."}
                    </p>
                    <p>
                      <b>User name : </b>
                      {userdetails[index]
                        ? userdetails[index].username
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="nolist">"No Transactions"</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
