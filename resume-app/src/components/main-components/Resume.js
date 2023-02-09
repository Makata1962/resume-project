import classes from "./Resume.module.css";
const Resume = (props) => {
  const { formState, showStartDate, showEndDate } = props;

  return (
    <main className={classes.main_container}>
      <div className={classes.personal_container}>
        <div className={classes.left_container}>
          <h1
            className={classes.fullname}
          >{`${formState.name} ${formState.surname}`}</h1>
          <p className={classes.email}>{formState.email}</p>
          <p className={classes.mobile}>{formState.mobile}</p>
          {formState.about && (
            <h1 className={classes.about_header}>ჩემს შესახებ</h1>
          )}
          <p className={classes.about_section}>{formState.about}</p>
        </div>
        <div className={classes.right_container}>
          {formState.uploading && (
            <img src={formState.uploading} alt="resume img of job seeker" />
          )}
        </div>
      </div>
      {formState.experiences.map((experience, index) => (
        <div key={index} className={classes.experience_container}>
          {formState.experiences && (
            <h1 className={classes.experience_header}>გამოცდილება</h1>
          )}
          {experience.position && (
            <p className={classes.experience_section}>
              {experience.position}, {experience.employeer}
            </p>
          )}
          <div className={classes.date_section}>
            {showStartDate && showEndDate && (
              <p>
                {experience.startDate} - {experience.endDate}
              </p>
            )}
          </div>
          <div className={classes.description_section}>
            <p>{experience.description}</p>
          </div>
        </div>
      ))}
      {formState.education.map((education, index) => (
        <div key={index} className={classes.experience_container}>
          {formState.experiences && (
            <h1 className={classes.experience_header}>განათლება</h1>
          )}

          {education.college && (
            <p className={classes.experience_section}>
              {education.college}, {education.degree}
            </p>
          )}
          <div className={classes.date_section}>
            <p>{education.endDate}</p>
          </div>

          <div className={classes.description_section}>
            <p>{education.description}</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Resume;
