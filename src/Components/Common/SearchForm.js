import React from "react";

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  searchItems,
  setItems,
  setPage,
  placeholder
}) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchItems(e);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setItems(e);
  };

  const handleSearchQueryChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
    if (value === '') {
      setItems(e);
    }
};

  return (
    <form className="mg-t-10" onSubmit={handleSearchSubmit}>
      <div className="row gutters-8">
        <div className="col-8-xxxl col-xl-6 col-lg-6 col-6 form-group">
        <input
                  type="text"
                  value={searchTerm} onChange={handleSearchQueryChange}
                  placeholder={placeholder}
                  style={{border: "1px solid grey"}}
                  className="form-control"
                />
        </div>

        <div className="col-4-xxxl col-xl-6 col-lg-6 col-6 form-group">
          <button
            type="submit"
            className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3"
          >
            SEARCH
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-martini ml-3"
          >
            RESET
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
