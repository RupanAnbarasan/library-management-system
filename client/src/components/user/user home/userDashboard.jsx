import "./ud.css";
import React, { useState, useEffect } from "react";
import Nav from "../usernav/usernav";
import { useParams } from "react-router-dom";
import axios from "axios";
const UserDashboard = () => {
  const { username } = useParams();
  const [books, setBooks] = useState([]);
  const prop = {
    username: username,
    PageTitle: "Home",
    classname: "home",
  };
  useEffect(() => {
    const load = async () => {
      try {
        const books = await axios.get(
          "http://localhost:5000/books/latest/three"
        );
        if (books.status === 200) {
          setBooks(books.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    load();
  }, []);

  return (
    <div>
      <Nav prop={prop} />
      <section className="admin-contentCenter">
        <h2 className="title-books"> Latest Arrival</h2>
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
    </div>
  );
};

export default UserDashboard;
