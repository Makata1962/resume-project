import classes from "./Forms.module.css";
import Resume from "./Resume";
import { Fragment, useReducer, useState } from "react";

const initialState = {
  name: "",
  surname: "",
  email: "",
  mobile: "",
  about: "",
  position: "",
  employeer: "",
  uploading: null,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "updateName":
      return { ...state, name: action.payload };
    case "updateSurname":
      return { ...state, surname: action.payload };
    case "updateEmail":
      return { ...state, email: action.payload };
    case "updateMobile":
      return { ...state, mobile: action.payload };
    case "updateAbout":
      return { ...state, about: action.payload };
    case "updatePosition":
      return { ...state, position: action.payload };
    case "updateEmployeer":
      return { ...state, employeer: action.payload };
    case "updateUploading":
      return { ...state, uploading: action.payload };
    default:
      return state;
  }
};

const Forms = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [formPart, setFormPart] = useState(1);

  const nameChangeHandler = (e) => {
    dispatch({ type: "updateName", payload: e.target.value });
  };

  const surnameChangeHandler = (e) => {
    dispatch({ type: "updateSurname", payload: e.target.value });
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

  const positionChangeHandler = (e) => {
    dispatch({ type: "updatePosition", payload: e.target.value });
  };
  const employeerChangeHandler = (e) => {
    dispatch({ type: "updateEmployeer", payload: e.target.value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    dispatch({
      type: "updateUploading",
      payload: URL.createObjectURL(e.target.files[0]),
    });
    console.log(formState.uploading);
  };

  const changeForm = (e) => {
    e.preventDefault();
    setFormPart((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <main>
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
                  <input type="file" id="uploading" onChange={handleUpload} />
                </label>
              </div>
              <div className={classes.about_container}>
                <label htmlFor="about-me">ჩემს შესახებ (არასავალდებულო)</label>
                <textarea
                  id="about-me"
                  value={formState.about}
                  onChange={aboutChangeHandler}
                />
              </div>
              <div className={classes.email}>
                <label htmlFor="email">
                  ელ.ფოსტა
                  <input
                    type="text"
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
          {formPart === 2 && (
            <Fragment>
              <div className={classes.position}>
                <label htmlFor="position">
                  თანამდებობა
                  <input
                    type="text"
                    id="position"
                    value={formState.position}
                    onChange={positionChangeHandler}
                  />
                  <small>მინიმუმ 2 სიმბოლო</small>
                </label>
              </div>
              <div className={classes.employeer}>
                <label htmlFor="employeer">
                  დამსაქმებელი
                  <input
                    type="text"
                    id="employeer"
                    value={formState.employeer}
                    onChange={employeerChangeHandler}
                  />
                  <small>მინიმუმ 2 სიმბოლო</small>
                </label>
              </div>
            </Fragment>
          )}
          {(formPart === 1 || formPart === 2) && (
            <div className={classes.next}>
              <button onClick={changeForm}>შემდეგი</button>
            </div>
          )}
          {formPart === 3 && (
            <div className={classes.next}>
              <button>დასრულება</button>
            </div>
          )}
        </form>
      </div>
      <div className={classes.resume_container}>
        <Resume
          name={formState.name}
          surname={formState.surname}
          email={formState.email}
          mobile={formState.mobile}
          about={formState.about}
          position={formState.position}
          employeer={formState.employeer}
          uploading={formState.uploading}
        />
      </div>
    </main>
  );
};

export default Forms;
