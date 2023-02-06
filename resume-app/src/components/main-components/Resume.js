import classes from "./Resume.module.css";

const Resume = ({ name, surname, email, mobile, about, experience }) => {
  return (
    <main className={classes.main_container}>
      <div className={classes.personal_container}>
        <div className={classes.left_container}>
          <h1 className={classes.fullname}>{`${name} ${surname}`}</h1>
          <p className={classes.email}>{email}</p>
          <p className={classes.mobile}>{mobile}</p>
          {about && <h1 className={classes.about_header}>ჩემს შესახებ</h1>}
          <p className={classes.about_section}>{about}</p>
        </div>
        <div className={classes.right_container}></div>
      </div>
      <div className={classes.experience_container}>
        {experience && (
          <h1 className={classes.experience_header}>გამოცდილება</h1>
        )}
        <p className={classes.experience_section}>{experience}</p>
      </div>
    </main>
  );
};

export default Resume;
