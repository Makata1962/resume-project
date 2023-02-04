import classes from "./Forms.module.css";
import Resume from "./Resume";
import { useReducer } from "react";

const initialState = {
  name: "",
  surname: "",
  email: "",
  mobile: "",
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
    default:
      return state;
  }
};

const Forms = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

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

  return (
    <main>
      <div className={classes.container}>
        <div className={classes.header}>
          <p className={classes.page_name}>პირადი ინფო</p>
          <p className={classes.pagination}>1/3</p>
        </div>
        <p className={classes.underlined}></p>
        <form>
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
            <button>ატვირთვა</button>
          </div>
          <div className={classes.about_container}>
            <label for="about-me">ჩემს შესახებ (არასავალდებულო)</label>
            <textarea id="about-me" />
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
              <small>უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს</small>
            </label>
          </div>
          <div className={classes.next}>
            <button>შემდეგი</button>
          </div>
        </form>
      </div>
      <div className={classes.resume_container}>
        <Resume
          name={formState.name}
          surname={formState.surname}
          email={formState.email}
          mobile={formState.mobile}
        />
      </div>
    </main>
  );
};

export default Forms;
