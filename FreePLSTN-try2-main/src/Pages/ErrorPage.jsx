import React from "react";
import { Link } from "react-router-dom";
import Thinking from "../images/Thinking-PNG.png";
const ErrorPage = () => {
  return (
    <section className="container">
      <div className="Error-container">
        <div className="rl-images">
          <img src={Thinking} className="images" />
        </div>
        <Link to="/" className="btn primary">
          Go Back Home!
        </Link>
        <h2>Page Not Found</h2>
      </div>
    </section>
  );
};

export default ErrorPage;
