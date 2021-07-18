import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useState } from "react";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyBro3NbujeKScm4pWWxnM4zwWb_azUr5C4"
  );

  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=20"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div class="container">
      <h1>Book Search</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Search for Books"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Search
        </button>
      </form>

      {result.map((book) =>
        book.volumeInfo.imageLinks ? (
          <a target="_blank" href={book.volumeInfo.previewLink}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
          </a>
        ) : (
          <a target="_blank" href={book.volumeInfo.previewLink}>
            <img
              src={
                "https://www.entrust.com/es/-/media/images/video-thumbnails_images/thumb-not-available.png"
              }
              alt={book.title}
            />
          </a>
        )
      )}
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
