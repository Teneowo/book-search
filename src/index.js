import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useState } from "react";
import { Label, FormGroup, Input } from "reactstrap";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

toast.configure();
function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [maxResults, setMaxResults] = useState("10");
  const [apiKey, setApiKey] = useState(
    "AIzaSyBro3NbujeKScm4pWWxnM4zwWb_azUr5C4"
  );

  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (maxResults < 1 || maxResults > 20) {
      toast.error("Max results can only be between 1 and 20");
    } else {
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
  }

  return (
    <Router>
      <html>
        <body>
          <div class="container">
            <div class="navbar">
              <a href="#">Search</a>
              <a href="about" class="right">
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
              <FormGroup>
                <Label for="maxResults">Max Results</Label>
                <div class="max-control">
                  <Input
                    type="number"
                    id="maxResults"
                    value={maxResults}
                    onChange={(e) => setMaxResults(e.target.value)}
                  />
                </div>
              </FormGroup>
              <button type="submit" className="btn btn-danger">
                Search
              </button>
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
          </div>
        </body>
      </html>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
