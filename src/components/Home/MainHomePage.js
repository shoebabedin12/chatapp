import SideNav from "../SideNav/SideNav";

const MainHomePage = (props) => {
    
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <SideNav active="home" user={props.user}/>
        </div>
        <div className="col-md-4">
          <h2>main body</h2>
        </div>
        <div className="col-md-3">
          <h2>main body</h2>
        </div>
        <div className="col-md-3">
          <h2>main body</h2>
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;
