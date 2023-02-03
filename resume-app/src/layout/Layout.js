import RouteComponent from "../components/main-components/RouteComponent";
import classes from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={classes.container}>
      <RouteComponent />
    </div>
  );
};

export default Layout;
