import {Link} from "react-router-dom";
// import CreateProject from "../Project/CreateProject";

const PageHeader = (props) => {
  return (
    <>
      {/* Breadcubs Area Start Here */}
      <div className="breadcrumbs-area">
        <h3>{props.title}</h3>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li> {props.title}</li>
        </ul>
      </div>
      {/* Breadcubs Area End Here */}
    </>
  );
};

export default PageHeader;
