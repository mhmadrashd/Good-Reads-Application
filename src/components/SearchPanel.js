import React from 'react';
// import { MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const SearchPanel = () => {
  return (
    <>
      <form className="input-group">
        <input
          type="search"
          className="form-control form-rounded "
          placeholder="Search...."
          aria-label="Search"
        />
      </form>
    </>
  );
};

export default SearchPanel;
