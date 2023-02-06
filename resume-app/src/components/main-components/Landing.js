import classes from "./Landing.module.css";
import redberryImg from "../../assets/redberry.png";
import redberryLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className={classes.container}>
      <img src={redberryImg} alt="redberry-logo" />
      <div className={classes.sub_container}>
      <hr className={classes.underline} /> 
        <div className={classes.center_button}>
          <Link to="/general-info">
            <button className={classes.button}>რეზიუმეს დამატება</button>
          </Link>
          <img src={redberryLogo} alt="redberry-logo" />
        </div>
      </div>
    </main>
  );
};

export default Landing;


// underline should be displayed later