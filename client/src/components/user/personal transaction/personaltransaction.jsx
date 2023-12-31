import "./pt.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../usernav/usernav";

const Personaltransaction = () => {
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);

  const prop = {
    username: username,
    PageTitle: 'Transactions',
    classname: "transaction"
  };

  const formatDate = (dueDate) => {
    const date = new Date(dueDate);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  useEffect(() => {
    const onLoad = async () => {
      try {
        const user = await axios.get(
          `http://localhost:5000/users/username/${username}`
        );
        const val = user.data;
        const transaction = await axios.get(
          `http://localhost:5000/transactions/user/${val}`
        );
        setData(transaction.data);

        // Extract book IDs from transactions
        const bookIds = transaction.data.map((a) => a.book);

        // Fetch books for each ID asynchronously
        const bookPromises = bookIds.map((id) =>
          axios.get(`http://localhost:5000/books/${id}`)
        );

        // Wait for all promises to resolve
        const bookResponses = await Promise.all(bookPromises);

        // Extract book data from responses
        const bookData = bookResponses.map((response) => response.data);

        // Update the books state
        setBooks(bookData);
      } catch (error) {
        console.log(error.message);
      }
    };
    onLoad();
  }, [username]);

  return (
    <div>
      <Nav prop={prop} />
      <div className="contentCenter">
        <div className="personal-transaction-container">
          {data.length > 0 ? (
            data.map((a, index) => (
              <div key={a._id}>
                <div className="transaction-list">
                  <p>
                    <b>Transaction type :</b> {a.transactionType}
                  </p>
                  <hr />
                  <p>
                    <b>{a.transactionType==='borrowed'?'Due Date':'Submited Date'} : </b> {formatDate(a.dueDate)}
                  </p>
                  <p>
                    <b>Book name : </b>
                    {books[index] ? books[index].name : "Loading..."}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="nolist">"No Transactions"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Personaltransaction;
