import React from "react";
import { Link } from "react-router-dom";

const JournalEntry = ({entry}) => {
  return (
    <article className="mt-90">
      <header className="text-center mb-40">
        <h3>
          <Link to={`article/${entry.slug}`}>{entry.title}</Link>
        </h3>
        <div className="link-color-default fs-12">
          {/* eslint-disable-next-line */} 
          <a href="#">{entry.category.name}</a>, <time>{(new Date(entry.created_at)).toDateString()}</time>
        </div>
      </header>
      <a href="blog-single.html">
        <img className="rounded" src={entry.imageUrl} alt="..." />
      </a>
      <div className="card-block">
        <p className="text-justify">
          {`${entry.content.substring(0,90)}...`}
        </p>
        <p className="text-center mt-40">
          <Link className="btn btn-primary btn-round" to={`article/${entry.slug}`}>
            Read more
          </Link>
        </p>
      </div>
    </article>
  );
};

export default JournalEntry;
