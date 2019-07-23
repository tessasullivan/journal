import React from "react";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <article className="mt-90">
      <header className="text-center mb-40">
        <h3>
          <a href="blog-single.html">New features will add to dashboard soon</a>
        </h3>
        <div className="link-color-default fs-12">
          {/* eslint-disable-next-line */}
          <a href="#">News</a>, <time>July 23, 2019</time>
        </div>
      </header>
      <a href="blog-single.html">
        <img className="rounded" src="assets/img/blog-1.jpg" alt="..." />
      </a>
      <div className="card-block">
        <p className="text-justify">
          Lorem ipsum dolor sit amet, quas eruditi facilisi ut eam, et omnes
          dolores vix. Et numquam omnesque pro, nec tota fugit discere ei. Vel
          persius deseruisse definiebas ex, mel eu solet cetero malorum. Sed et
          labore tritani inciderint. Sea at mutat quando, dicant nullam et vim.
        </p>
        <p className="text-center mt-40">
          <Link className="btn btn-primary btn-round" to="article/some-title-slug">
            Read more
          </Link>
        </p>
      </div>
    </article>
  );
};

export default Article;
