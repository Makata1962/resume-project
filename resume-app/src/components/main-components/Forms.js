import classes from "./Forms.module.css";
import Resume from "./Resume";
import { Fragment, useReducer, useState } from "react";

const initialExperience = {
  position: "",
  employeer: "",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  description: "",
};

const initialState = {
  name: "",
  surname: "",
  uploading: null,
  email: "",
  mobile: "",
  about: "",
  experiences: [initialExperience],
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "updateName":
      return { ...state, name: action.payload };
    case "updateSurname":
      return { ...state, surname: action.payload };
    case "updateUploading":
      return { ...state, uploading: action.payload };
    case "updateEmail":
      return { ...state, email: action.payload };
    case "updateMobile":
      return { ...state, mobile: action.payload };
    case "updateAbout":
      return { ...state, about: action.payload };
    case "updateExperience":
      return {
        ...state,
        experiences: state.experiences.map((exp, i) =>
          i === action.payload.index
            ? { ...exp, ...action.payload.experience }
            : exp
        ),
      };
    case "addExperience":
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
      };
    default:
      return state;
  }
};

const Forms = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [formPart, setFormPart] = useState(1);
  const [showStartDate, setStartShowDate] = useState(false);
  const [showEndDate, setEndShowDate] = useState(false);

  const nameChangeHandler = (e) => {
    dispatch({ type: "updateName", payload: e.target.value });
  };

  const surnameChangeHandler = (e) => {
    dispatch({ type: "updateSurname", payload: e.target.value });
  };

  const uploadChangeHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "updateUploading",
      payload: URL.createObjectURL(e.target.files[0]),
    });
  };

  const emailChangeHandler = (e) => {
    dispatch({ type: "updateEmail", payload: e.target.value });
  };

  const mobileChangeHandler = (e) => {
    dispatch({ type: "updateMobile", payload: e.target.value });
  };

  const aboutChangeHandler = (e) => {
    dispatch({ type: "updateAbout", payload: e.target.value });
  };

  const updateExperience = (index, experience) => ({
    type: "updateExperience",
    payload: { index, experience },
  });

  const positionChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateExperience",
      payload: { index, experience: { position: e.target.value } },
    });
  };

  const employeerChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateExperience",
      payload: { index, experience: { employeer: e.target.value } },
    });
  };

  const startDateChangeHandler = (index) => (e) => {
    dispatch(
      updateExperience(index, {
        ...formState.experiences[index],
        startDate: e.target.value,
      })
    );
    setStartShowDate(true);
  };

  const endDateChangeHandler = (index) => (e) => {
    dispatch(
      updateExperience(index, {
        ...formState.experiences[index],
        endDate: e.target.value,
      })
    );
    setEndShowDate(true);
  };

  const descriptionChangeHandler = (index) => (e) => {
    dispatch(
      updateExperience(index, {
        ...formState.experiences[index],
        description: e.target.value,
      })
    );
  };

  const addExperienceHandler = () => {
    dispatch({
      type: "addExperience",
      payload: initialExperience,
    });
  };

  const moveToNextPageHandler = (e) => {
    e.preventDefault();
    setFormPart((prevState) => {
      return prevState + 1;
    });
  };
  const moveToPreviousPageHandler = (e) => {
    e.preventDefault();
    setFormPart((prevState) => {
      return prevState - 1;
    });
  };

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        {formPart === 1 && (
          <Fragment>
            <div className={classes.header}>
              <p className={classes.page_name}>პირადი ინფო</p>
              <p className={classes.pagination}>1/3</p>
            </div>
            <p className={classes.underlined}></p>
          </Fragment>
        )}
        {formPart === 2 && (
          <Fragment>
            <div className={classes.header}>
              <p className={classes.page_name}>გამოცდილება</p>
              <p className={classes.pagination}>2/3</p>
            </div>
            <p className={classes.underlined}></p>
          </Fragment>
        )}
        <form>
          {formPart === 1 && (
            <Fragment>
              <div className={classes.name_container}>
                <label htmlFor="name">
                  სახელი
                  <input
                    type="text"
                    placeholder="სახელი"
                    id="name"
                    value={formState.name}
                    onChange={nameChangeHandler}
                  />
                  <small>მინიმუმ 2 ასო, ქართული ასოები</small>
                </label>
                <label htmlFor="surname">
                  გვარი
                  <input
                    type="text"
                    placeholder="გვარი"
                    id="surname"
                    value={formState.surname}
                    onChange={surnameChangeHandler}
                  />
                  <small>მინიმუმ 2 ასო, ქართული ასოები</small>
                </label>
              </div>
              <div className={classes.uploading_container}>
                <p>პირადი ფოტოს ატვირთვა</p>
                <label htmlFor="uploading">
                  ატვირთვა
                  <input
                    type="file"
                    id="uploading"
                    onChange={uploadChangeHandler}
                  />
                </label>
              </div>
              <div className={classes.about_container}>
                <label htmlFor="about-me">ჩემს შესახებ (არასავალდებულო)</label>
                <textarea
                  id="about-me"
                  placeholder="ზოგადი ინფორმაცია შენს შესახებ"
                  value={formState.about}
                  onChange={aboutChangeHandler}
                />
              </div>
              <div className={classes.email}>
                <label htmlFor="email">
                  ელ.ფოსტა
                  <input
                    type="text"
                    placeholder="მაგ: namesurname@redberry.ge"
                    id="email"
                    value={formState.email}
                    onChange={emailChangeHandler}
                  />
                  <small>უნდა მთავრდებოდეს @redberry.ge-ით</small>
                </label>
              </div>
              <div className={classes.number}>
                <label htmlFor="mobile">
                  მობილურის ნომერი
                  <input
                    type="number"
                    placeholder="მაგ: +995 551 12 34 56"
                    id="mobile"
                    value={formState.mobile}
                    onChange={mobileChangeHandler}
                  />
                  <small>
                    უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს
                  </small>
                </label>
              </div>
            </Fragment>
          )}

          {formPart === 2 &&
            formState.experiences.map((experience, index) => (
              <Fragment key={index}>
                <div className={classes.position}>
                  <label htmlFor="position">
                    თანამდებობა
                    <input
                      type="text"
                      placeholder="დეველოპერი, დიზაინერი, ა.შ."
                      id="position"
                      value={experience.position}
                      onChange={positionChangeHandler(index)}
                    />
                    <small>მინიმუმ 2 სიმბოლო</small>
                  </label>
                </div>
                <div className={classes.employeer}>
                  <label htmlFor="employeer">
                    დამსაქმებელი
                    <input
                      type="text"
                      placeholder="დამსაქმებელი"
                      id="employeer"
                      value={experience.employeer}
                      onChange={employeerChangeHandler(index)}
                    />
                    <small>მინიმუმ 2 სიმბოლო</small>
                  </label>
                </div>
                <div className={classes.date}>
                  <div>
                    <input
                      type="date"
                      onChange={startDateChangeHandler(index)}
                      value={experience.startDate}
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      onChange={endDateChangeHandler(index)}
                      value={experience.endDate}
                    />
                  </div>
                </div>
                <div className={classes.description_container}>
                  <label htmlFor="description">აღწერა</label>
                  <textarea
                    id="description"
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    value={experience.description}
                    onChange={descriptionChangeHandler(index)}
                  />
                </div>
              </Fragment>
            ))}

          {formPart === 2 && (
            <button type="button" onClick={addExperienceHandler}>
              Add one more form
            </button>
          )}

          {formPart === 1 && (
            <div className={classes.next}>
              <button onClick={moveToNextPageHandler}>შემდეგი</button>
            </div>
          )}
          {(formPart === 2 || formPart === 3) && (
            <div className={classes.button_container}>
              <div className={classes.back}>
                <button onClick={moveToPreviousPageHandler}>უკან</button>
              </div>
              <div className={classes.next}>
                <button onClick={moveToNextPageHandler}>შემდეგი</button>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className={classes.resume_container}>
        <Resume
          name={formState.name}
          surname={formState.surname}
          uploading={formState.uploading}
          email={formState.email}
          mobile={formState.mobile}
          about={formState.about}
          showStartDate={formState.showStartDate}
          showEndDate={formState.showEndDate}
          formState={formState}
        />
      </div>
    </main>
  );
};

export default Forms;
