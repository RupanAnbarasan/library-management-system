import './catalog.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../usernav/usernav";
const Catalog = () => {
  const [data, setData] = useState([]);
  const prop = {
    PageTitle: 'Catalog',
    classname:'catalog'
  }
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books");
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadBooks();
  }, []);

  return (
    <main>
      <Nav prop={prop} />
      <div className='contentCenter'>
        <div className="Catalog-container">
          {data.length > 0? (
            <div className='catalog-list'>
              {data.map((a) => {
                return (
                  <div className='book' key={a._id}>
                    <p className='bookName'>{a.name}</p>
                    <hr />
                    <p className='author'>Author name</p>
                    <p>{a.author}</p>
                    <div className={a.availability ? 'book-availability' : 'book-not-available'}>
                      {a.availability ? 'Available' : 'Not Available'}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="nolist">"No books"</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Catalog;
