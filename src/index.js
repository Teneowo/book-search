import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useState } from "react";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [maxResults, setMaxResults] = useState();
  const [apiKey, setApiKey] = useState(
    "AIzaSyBro3NbujeKScm4pWWxnM4zwWb_azUr5C4"
  );

  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleNumber(event) {
    const maxResults = event.target.value;
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=" +
          maxResults
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div class="container">
      <div class="navbar">
        <a href="#">Search</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="/about.html" class="right">
          About
        </a>
      </div>
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
        <input
          type="number"
          id="maxResults"
          placeholder="How many results?"
          value={maxResults}
          onChange={(e) => setMaxResults(e.target.value)}
        />
      </form>
      {result.map((book) =>
        book.volumeInfo.imageLinks ? (
          <a target="_blank" href={book.volumeInfo.previewLink}>
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.title}
              style={{ height: "233px" }}
            />
          </a>
        ) : (
          <a target="_blank" href={book.volumeInfo.previewLink}>
            <img
              src={
                "https://www.entrust.com/es/-/media/images/video-thumbnails_images/thumb-not-available.png"
              }
              alt={book.title}
              style={{ height: "233px" }}
            />
          </a>
        )
      )}
      <h2>Magic</h2>
      <button id="myBtn">Open Modal</button>

      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
