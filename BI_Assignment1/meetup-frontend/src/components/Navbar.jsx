import React from "react";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-4">
      <span className="navbar-brand fw-bold text-danger">meetup</span>

      <form className="d-flex ms-auto" style={{ width: "300px" }}>
        <input
          className="form-control"
          type="search"
          placeholder="Search by title and tags"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Navbar;
