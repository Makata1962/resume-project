import classes from "./Resume.module.css";

const Resume = (props) => {
  const {
    name,
    surname,
    email,
    mobile,
    about,
    position,
    employeer,
    uploading,
    startDate,
    endDate,
    description,
  } = props;

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
        <div className={classes.right_container}>
          {uploading && <img src={uploading} alt="resume img of job seeker" />}
        </div>
      </div>
      <div className={classes.experience_container}>
        {position && <h1 className={classes.experience_header}>გამოცდილება</h1>}
        <p className={classes.experience_section}>{position}</p>
        <p className={classes.experience_section}>{employeer}</p>
        <div className={classes.date_section}>
          <p>{startDate}</p>
          <p>{endDate}</p>
        </div>
        <div className={classes.description_section}>
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
};

export default Resume;
