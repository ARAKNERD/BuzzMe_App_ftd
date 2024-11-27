import React from "react";

const CallLogsSearchForm = ({
  caller,
  callee,
  setCaller,
  setCallee,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchCallLogs,
  resetSearch,
  setPage
}) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchCallLogs(e);
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetSearch(e);
  };

  const handleCallerChange = (e) => {
    const value = e.target.value;
    setCaller(value);
    setPage(1);
    if (value === '') {
      resetSearch(e);
    }
};
const handleCalleeChange = (e) => {
    const value = e.target.value;
    setCallee(value);
    setPage(1);
    if (value === '') {
      resetSearch(e);
    }
};

  return (
    <form className="mg-t-20" onSubmit={handleSearchSubmit}>
      <div className="row gutters-8">
        <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
          <div className="row">
            <div className="col-lg-3">
              <input
                type="text"
                placeholder="Enter caller name......"
                style={{ border: "1px solid grey" }}
                value={caller}
                onChange={handleCallerChange}
                className="form-control"
              />
            </div>
            <div className="col-lg-3">
              <input
                type="text"
                placeholder="Enter callee name....."
                style={{ border: "1px solid grey" }}
                value={callee}
                onChange={handleCalleeChange}
                className="form-control"
              />
            </div>
            <div className="col-lg-6">
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

export default CallLogsSearchForm;
{/* <form className="mg-t-10">
        <div className="row gutters-8">
          <div className="col-10-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <div className="row">
              <div className="col-lg-3">
                <input type="text" placeholder="Enter callee name..." className="form-control" style={{border: "1px solid grey"}} value={twilioCaller} 
                  onChange={(e) => {
                    setTwilioCaller(e.target.value);
                    if (e.target.value === '') {
                      resetSearch(e);
                    }
                  }}
                />
              </div>
              <div className="col-lg-3">
            <input
              type="text"
              placeholder="Enter callee name..."
              style={{border: "1px solid grey"}}
              value={twilioCallee} onChange={(e) => {
                setTwilioCallee(e.target.value);
                if (e.target.value === '') {
                  resetSearch(e);
                }
              }}
              className="form-control"
            />
           </div>
              <div className="col-lg-6">
                <div class="flex-fill position-relative">
                  <div class="input-group input-daterange" id="datepicker">
                    <input type="date" style={{border: "1px solid grey"}} class="form-control" value={twilioStartDate} onChange={(e) => setTwilioStartDate(e.target.value)} placeholder="start date"/>
                    <span class="input-group-text" style={{marginLeft: "-1px", borderTopLeftRadius:"0", borderTopRightRadius:"0", borderBottomLeftRadius:"0", borderBottomRightRadius:"0"}}>to</span>
                    <input type="date" style={{border: "1px solid grey"}} value={twilioEndDate} onChange={(e) => setTwilioEndDate(e.target.value)} class="form-control" placeholder="end date"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <button type="submit" onClick={(e) => searchTwilioLogs(e)} className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3">
              SEARCH
            </button>
          </div>
        </div>
      </form> */}