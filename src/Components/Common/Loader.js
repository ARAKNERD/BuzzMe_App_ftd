import React from "react";

export default function Loader() {
  return (
    <div id="" className="text-center preloader">
      {/* LOADEAR */}
      <div>
        <img
          className="loader-img"
          src={process.env.PUBLIC_URL + "/assets/img/preloader.gif"}
          alt="Loader"
        />
      </div>
      {/* END LOADEAR */}
    </div>
  );
}
