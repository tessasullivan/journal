import React from "react";
// import { Link } from "react-router-dom";

import JournalEntry from "../../JournalEntry/JournalEntry";
import Banner from "../../Banner/Banner";

const JournalEntries = ({entries, handlePagination, nextUrl, prevUrl}) => {
  return (
    <div>
      <Banner
        backgroundImage="url(assets/img/bg-gift.jpg)"
        title="Latest Blog Posts"
        subtitle="Read and get updated on how we progress."
      />
      <main className="main-content bg-gray">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            {entries && entries.map(entry => (
              <div key={entry.id}>
                <JournalEntry entry={entry} />
                <hr />
              </div>
            ))}
            <nav className="flexbox mb-50 mt-50">
              {/* eslint-disable-next-line */}
              <a className={`btn btn-white ${prevUrl ? '' : 'disabled'}`} href="#" onClick={() => handlePagination(prevUrl)}>
                <i className="ti-arrow-left fs-9 mr-4" /> 
                Older
              </a>
              {/* eslint-disable-next-line */}
              <a className={`btn btn-white ${nextUrl ? '' : 'disabled'}`} href="#" onClick={() => handlePagination(nextUrl)}>
                Newer 
                <i className="ti-arrow-right fs-9 ml-4" />
              </a>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalEntries;
