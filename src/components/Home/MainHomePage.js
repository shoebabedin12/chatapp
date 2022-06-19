import SideNav from "../SideNav/SideNav";

const MainHomePage = (props) => {
    
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <SideNav user={props.user}/>
        </div>
        <div className="col-md-10">
          <h2>main body</h2>
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;
