import classes from "./Resume.module.css";
const Resume = (props) => {
  const {
    formState,
    showStartDate,
    showEndDate,
    expTouched,
    eduTouched,
    showEduEndDate,
  } = props;

  return (
    <main className={classes.main_container}>
      <div className={classes.personal_container}>
        <div className={classes.left_container}>
          <h1
            className={classes.fullname}
          >{`${formState.name} ${formState.surname}`}</h1>
          <p className={classes.email}>{formState.email}</p>
          <p className={classes.mobile}>{formState.phone_number}</p>
          {formState.about_me && (
            <h1 className={classes.about_header}>ჩემს შესახებ</h1>
          )}
          <p className={classes.about_section}>{formState.about_me}</p>
        </div>
        <div className={classes.right_container}>
          {formState.image && (
            <img src={formState.image} alt="resume img of job seeker" />
          )}
        </div>
      </div>
      {formState.experiences.map((experience, index) => (
        <div key={index} className={classes.experience_container}>
          {expTouched && (
            <h1 className={classes.experience_header}>გამოცდილება</h1>
          )}
          {experience.position && (
            <p className={classes.experience_section}>
              {experience.position}, {experience.employer}
            </p>
          )}
          <div className={classes.date_section}>
            {showStartDate && showEndDate && (
              <p>
                {experience.start_date} - {experience.due_date}
              </p>
            )}
          </div>
          <div className={classes.description_section}>
            <p>{experience.description}</p>
          </div>
        </div>
      ))}
      {formState.educations.map((education, index) => (
        <div key={index} className={classes.experience_container}>
          {eduTouched && (
            <h1 className={classes.experience_header}>განათლება</h1>
          )}

          {education.institute && (
            <p className={classes.experience_section}>
              {education.institute},
              {education.degree_id === "1" && " საშუალო სკოლის დიპლომი"}
              {education.degree_id === "2" && " ზოგადსაგანმანათლებლო დიპლომი"}
              {education.degree_id === "3" && " ბაკალავრი"}
              {education.degree_id === "4" && " მაგისტრი"}
              {education.degree_id === "5" && " დოქტორი"}
              {education.degree_id === "6" && " ასოცირებული ხარისხი"}
              {education.degree_id === "7" && " სტუდენტი"}
              {education.degree_id === "8" && " კოლეჯი(ხარისიხს გარეშე)"}
              {education.degree_id === "9" && " სხვა"}
            </p>
          )}
          <div className={classes.date_section}>
            {showEduEndDate && <p>{education.due_date}</p>}
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
