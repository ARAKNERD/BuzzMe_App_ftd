import React from "react";

const TransactionsSearchForm = ({
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchTransactions,
  setTransactions,
  setPage
}) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchTransactions(e);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setTransactions(e);
  };

  const handleSearchQueryChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
    if (value === '') {
      setTransactions(e);
    }
};

  return (
    <form className="mg-t-20" onSubmit={handleSearchSubmit}>
      <div className="row gutters-8">
        <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
          <div className="row">
            <div className="col-lg-4">
              <input
                type="text"
                placeholder="Enter first or last name of user..."
                style={{ border: "1px solid grey" }}
                value={searchTerm}
                onChange={handleSearchQueryChange}
                className="form-control"
              />
            </div>
            <div className="col-lg-8">
              <div className="flex-fill position-relative">
                <div className="input-group input-daterange" id="datepicker">
                  <input
                    type="date"
                    style={{ border: "1px solid grey" }}
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="start date"
                  />
                  <span
                    className="input-group-text"
                    style={{
                      marginLeft: "-1px",
                      borderTopLeftRadius: "0",
                      borderTopRightRadius: "0",
                      borderBottomLeftRadius: "0",
                      borderBottomRightRadius: "0",
                    }}
                  >
                    to
                  </span>
                  <input
                    type="date"
                    style={{ border: "1px solid grey" }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control"
                    placeholder="end date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
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

export default TransactionsSearchForm;
