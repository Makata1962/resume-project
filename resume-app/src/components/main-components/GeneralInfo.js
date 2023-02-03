import classes from "./GeneralInfo.module.css";

const GeneralInfo = () => {
  return (
    <main>
      <div className={classes.container}>
        <div className={classes.header}>
          <p className={classes.page_name}>პირადი ინფო</p>
          <p className={classes.pagination}>1/3</p>
        </div>
        <form>
          <div className={classes.name_container}>
            <label>
              სახელი
              <input type="text" name="name" />
              <small>მინიმუმ 2 ასო, ქართული ასოები</small>
            </label>
            <label>
              გვარი
              <input type="text" />
              <small>მინიმუმ 2 ასო, ქართული ასოები</small>
            </label>
          </div>
        </form>
      </div>
      <div className={classes.resume_container}></div>
    </main>
  );
};

export default GeneralInfo;
