import classes from "./Forms.module.css";
import Resume from "./Resume";
import Button from "../shared-components/Button";
import FormInput from "../shared-components/FormInput";
import FormTextArea from "../shared-components/FormTextArea";
import { Fragment, useReducer, useState, useEffect } from "react";
import { initialExperience, initialEducation } from "../helper/initialState";

const initialState = {
  name: "",
  surname: "",
  uploading: null,
  email: "",
  mobile: "",
  about: "",
  experiences: [initialExperience],
  education: [initialEducation],
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
    case "updateEducation":
      return {
        ...state,
        education: state.education.map((edu, i) =>
          i === action.payload.index
            ? { ...edu, ...action.payload.education }
            : edu
        ),
      };
    case "addExperience":
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
      };
    case "addEducation":
      return {
        ...state,
        education: [...state.education, action.payload],
      };
    default:
      return state;
  }
};

const initialValidationState = {
  name: { value: "", isValid: null },
  surname: { value: "", isValid: null },
  email: { value: "", isValid: null },
  mobile: { value: "", isValid: null },
  position: { value: "", isValid: null },
  employer: { value: "", isValid: null },
  startDate: { value: "", isValid: null },
  endDate: { value: "", isValid: null },
  description: { value: "", isValid: null },
  college: { value: "", isValid: null },
  endCollegeDate: { value: "", isValid: null },
  collegeDescription: { value: "", isValid: null },
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case "updateNameValidation":
      return { ...state, name: action.payload };
    case "updateSurnameValidation":
      return { ...state, surname: action.payload };
    case "updateEmailValidation":
      return { ...state, email: action.payload };
    case "updateMobileValidation":
      return { ...state, mobile: action.payload };
    case "updatePositionValidation":
      return { ...state, position: action.payload };
    case "updateEmployerValidation":
      return { ...state, employer: action.payload };
    case "updateStartDateValidation":
      return { ...state, startDate: action.payload };
    case "updateEndDateValidation":
      return { ...state, endDate: action.payload };
    case "updateDescriptionValidation":
      return { ...state, description: action.payload };
    case "updateCollegeValidation":
      return { ...state, description: action.payload };
    case "updateCollegeEndDateValidation":
      return { ...state, description: action.payload };
    case "updateCollegeDescriptionValidation":
      return { ...state, description: action.payload };
    default:
      return state;
  }
};

const options = [];

const Forms = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [formPart, setFormPart] = useState(1);
  const [showStartDate, setStartShowDate] = useState(false);
  const [showEndDate, setEndShowDate] = useState(false);
  const [selectData, setSelectData] = useState(options);
  const [validationState, dispatchValidation] = useReducer(
    validationReducer,
    initialValidationState
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://resume.redberryinternship.ge/api/degrees"
      );
      const data = await response.json();
      setSelectData(data);
    };
    fetchData();
  }, []);

  const nameChangeHandler = (e) => {
    dispatch({ type: "updateName", payload: e.target.value });

    let isValid = true;
    if (e.target.value.length < 2) {
      isValid = false;
    } else {
      let regex = /^[ა-ჰ]+$/;

      if (!regex.test(e.target.value)) {
        isValid = false;
      }
    }

    dispatchValidation({
      type: "updateNameValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const surnameChangeHandler = (e) => {
    dispatch({ type: "updateSurname", payload: e.target.value });

    let isValid = true;
    if (e.target.value.length < 2) {
      isValid = false;
    } else {
      let regex = /^[ა-ჰ]+$/;

      if (!regex.test(e.target.value)) {
        isValid = false;
      }
    }

    dispatchValidation({
      type: "updateSurnameValidation",
      payload: { value: e.target.value, isValid },
    });
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

    let isValid = true;
    if (e.target.value.length === 0) {
      isValid = false;
    } else {
      let regex = /^[A-Za-z0-9._%+-]+@redberry.ge$/;

      if (!regex.test(e.target.value)) {
        isValid = false;
      }
    }
    dispatchValidation({
      type: "updateEmailValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const mobileChangeHandler = (e) => {
    dispatch({ type: "updateMobile", payload: e.target.value });

    let isValid = true;
    if (e.target.value.length === 0) {
      isValid = false;
    } else {
      let regex = /^\+995\d{9}$/;
      if (!regex.test(e.target.value)) {
        isValid = false;
      }
    }
    dispatchValidation({
      type: "updateMobileValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const aboutChangeHandler = (e) => {
    dispatch({ type: "updateAbout", payload: e.target.value });
  };

  const updateExperience = (index, experience) => ({
    type: "updateExperience",
    payload: { index, experience },
  });
  const updateEducation = (index, education) => ({
    type: "updateEducation",
    payload: { index, education },
  });

  const positionChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateExperience",
      payload: { index, experience: { position: e.target.value } },
    });

    let isValid = true;
    if (e.target.value.length < 2) {
      isValid = false;
    }

    dispatchValidation({
      type: "updatePositionValidation",
      payload: { value: e.target.value, isValid },
    });
  };
  const collegeChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateEducation",
      payload: { index, education: { college: e.target.value } },
    });
    let isValid = true;
    if (e.target.value.length < 2) {
      isValid = false;
    }

    dispatchValidation({
      type: "updateCollegeValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const employeerChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateExperience",
      payload: { index, experience: { employeer: e.target.value } },
    });

    let isValid = true;
    if (e.target.value.length < 2) {
      isValid = false;
    }

    dispatchValidation({
      type: "updateEmployerValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const degreeChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateEducation",
      payload: { index, education: { degree: e.target.value } },
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

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateStartDateValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const endDateChangeHandler = (index) => (e) => {
    dispatch(
      updateExperience(index, {
        ...formState.experiences[index],
        endDate: e.target.value,
      })
    );
    setEndShowDate(true);

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateEndDateValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const uniEndDateChangeHandler = (index) => (e) => {
    dispatch(
      updateEducation(index, {
        ...formState.education[index],
        endDate: e.target.value,
      })
    );
    // setEndShowDate(true);

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateCollegeEndDate",
      payload: { value: e.target.value, isValid },
    });
  };

  const descriptionChangeHandler = (index) => (e) => {
    dispatch(
      updateExperience(index, {
        ...formState.experiences[index],
        description: e.target.value,
      })
    );

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateDescriptionValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const eduDescriptionChangeHandler = (index) => (e) => {
    dispatch(
      updateEducation(index, {
        ...formState.education[index],
        description: e.target.value,
      })
    );

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateCollegeDescriptionValidation",
      payload: { value: e.target.value, isValid },
    });
  };

  const addExperienceHandler = () => {
    dispatch({
      type: "addExperience",
      payload: initialExperience,
    });

    // setStartShowDate(false);
    // setEndShowDate(false);
  };
  const addEducationHandler = () => {
    dispatch({
      type: "addEducation",
      payload: initialEducation,
    });

    // setStartShowDate(false);
    // setEndShowDate(false);
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

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(formState);

    fetch("https://resume.redberryinternship.ge/api/cvs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
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
        <form onSubmit={submitHandler}>
          {formPart === 1 && (
            <Fragment>
              <div className={classes.name_container}>
                <div>
                  <FormInput
                    label="სახელი"
                    type="text"
                    required
                    placeholder="სახელი"
                    id="name"
                    value={formState.name}
                    onChange={nameChangeHandler}
                    styling={
                      validationState.name.isValid === true
                        ? "valid"
                        : validationState.name.isValid === false
                        ? "invalid"
                        : ""
                    }
                  />
                  <span>მინიმუმ 2 ასო, ქართული ასოები</span>
                </div>
                <div>
                  <FormInput
                    type="text"
                    label="გვარი"
                    placeholder="გვარი"
                    id="surname"
                    value={formState.surname}
                    onChange={surnameChangeHandler}
                    styling={
                      validationState.surname.isValid === true
                        ? "valid"
                        : validationState.surname.isValid === false
                        ? "invalid"
                        : ""
                    }
                  />
                  <span>მინიმუმ 2 ასო, ქართული ასოები</span>
                </div>
              </div>
              <div className={classes.uploading_container}>
                <p>პირადი ფოტოს ატვირთვა</p>
                <FormInput
                  label="ატვირთვა"
                  type="file"
                  id="uploading"
                  onChange={uploadChangeHandler}
                />
              </div>
              <div className={classes.about_container}>
                <FormTextArea
                  label="ჩემს შესახებ (არასავალდებულო)"
                  id="about-me"
                  placeholder="ზოგადი ინფორმაცია შენს შესახებ"
                  value={formState.about}
                  onChange={aboutChangeHandler}
                />
              </div>
              <div className={classes.email}>
                <FormInput
                  label="ელ.ფოსტა"
                  type="text"
                  placeholder="მაგ: namesurname@redberry.ge"
                  id="email"
                  value={formState.email}
                  onChange={emailChangeHandler}
                  styling={
                    validationState.email.isValid === true
                      ? "valid"
                      : validationState.email.isValid === false
                      ? "invalid"
                      : ""
                  }
                />
                <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
              </div>
              <div className={classes.number}>
                <FormInput
                  label="მობილურის ნომერი"
                  type="text"
                  placeholder="მაგ: +995 551 12 34 56"
                  id="mobile"
                  value={formState.mobile}
                  onChange={mobileChangeHandler}
                  styling={
                    validationState.mobile.isValid === true
                      ? "valid"
                      : validationState.mobile.isValid === false
                      ? "invalid"
                      : ""
                  }
                />
                <span>უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს</span>
              </div>
            </Fragment>
          )}

          {formPart === 2 &&
            formState.experiences.map((experience, index) => (
              <Fragment key={index}>
                <div className={classes.position}>
                  <FormInput
                    label="თანამდებობა"
                    type="text"
                    placeholder="დეველოპერი, დიზაინერი, ა.შ."
                    id="position"
                    value={experience.position}
                    onChange={positionChangeHandler(index)}
                    styling={
                      validationState.position.isValid === true
                        ? "valid"
                        : validationState.position.isValid === false
                        ? "invalid"
                        : ""
                    }
                  />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
                <div className={classes.employeer}>
                  <FormInput
                    label="დამსაქმებელი"
                    type="text"
                    placeholder="დამსაქმებელი"
                    id="employeer"
                    value={experience.employeer}
                    onChange={employeerChangeHandler(index)}
                    styling={
                      validationState.employer.isValid === true
                        ? "valid"
                        : validationState.employer.isValid === false
                        ? "invalid"
                        : ""
                    }
                  />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
                <div className={classes.date}>
                  <div>
                    <FormInput
                      label="დაწყების რიცხვი"
                      type="date"
                      onChange={startDateChangeHandler(index)}
                      value={experience.startDate}
                      styling={
                        validationState.startDate.isValid === true
                          ? "valid"
                          : validationState.startDate.isValid === false
                          ? "invalid"
                          : ""
                      }
                    />
                  </div>
                  <div>
                    <FormInput
                      label="დამთავრების რიცხვი"
                      type="date"
                      onChange={endDateChangeHandler(index)}
                      value={experience.endDate}
                      styling={
                        validationState.endDate.isValid === true
                          ? "valid"
                          : validationState.endDate.isValid === false
                          ? "invalid"
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className={classes.description_container}>
                  <FormTextArea
                    label="აღწერა"
                    id="description"
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    value={experience.description}
                    onChange={descriptionChangeHandler(index)}
                    styling={
                      validationState.description.isValid === true
                        ? "valid"
                        : validationState.description.isValid === false
                        ? "invalid"
                        : ""
                    }
                  />
                </div>
              </Fragment>
            ))}
          {formPart === 3 &&
            formState.education.map((education, index) => (
              <Fragment key={index}>
                <div className={classes.position}>
                  <FormInput
                    label="სასწავლებელი"
                    type="text"
                    placeholder="სასწავლებელი"
                    id="college"
                    value={education.college}
                    onChange={collegeChangeHandler(index)}
                    styling={
                      validationState.isValid === true
                        ? "valid"
                        : validationState.college.isValid === false
                        ? "invalid"
                        : ""
                    }
                  />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
                <div className={classes.date}>
                  <div>
                    <label>ხარისხი</label>
                    <select
                      value={education.degree}
                      onChange={degreeChangeHandler(index)}
                    >
                      {selectData.map((option) => (
                        <option key={option.id} value={option.title}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <FormInput
                      label="დამთავრების რიცხვი"
                      type="date"
                      onChange={uniEndDateChangeHandler(index)}
                      value={education.endDate}
                      styling={
                        validationState.endCollegeDate.isValid === true
                          ? "valid"
                          : validationState.endCollegeDate.isValid === false
                          ? "invalid"
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className={classes.description_container}>
                  <FormTextArea
                    label="აღწერა"
                    id="description"
                    placeholder="განათლების აღწერა"
                    value={education.description}
                    onChange={eduDescriptionChangeHandler(index)}
                    styling={
                      validationState.collegeDescription.isValid === true
                        ? "valid"
                        : validationState.collegeDescription.isValid === false
                        ? "invalid"
                        : ""
                    }
                  />
                </div>
              </Fragment>
            ))}

          {formPart === 1 && (
            <div className={classes.next_button_container}>
              <Button
                type="button"
                styling="next"
                onClickHanlder={moveToNextPageHandler}
              >
                შემდეგი
              </Button>
            </div>
          )}

          {formPart === 2 && (
            <Button
              buttonType="button"
              styling="add"
              onClickHanlder={addExperienceHandler}
            >
              მეტი გამოცდილების დამატება
            </Button>
          )}
          {formPart === 3 && (
            <Button
              buttonType="button"
              styling="add"
              onClickHanlder={addEducationHandler}
            >
              სხვა სასწავლებლის დამატება
            </Button>
          )}
          {formPart === 2 && (
            <div className={classes.button_container}>
              <div>
                <Button
                  styling="back"
                  type="button"
                  onClickHanlder={moveToPreviousPageHandler}
                >
                  უკან
                </Button>
              </div>
              <div className={classes.next_button_container}>
                <Button
                  type="button"
                  styling="next"
                  onClickHanlder={moveToNextPageHandler}
                >
                  შემდეგი
                </Button>
              </div>
            </div>
          )}
          {formPart === 3 && (
            <div className={classes.button_container}>
              <div>
                <Button
                  type="button"
                  styling="back"
                  onClickHanlder={moveToPreviousPageHandler}
                >
                  უკან
                </Button>
              </div>
              <div className={classes.next_button_container}>
                <Button type="submit" styling="next">
                  დასრულება
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className={classes.resume_container}>
        <Resume
          formState={formState}
          showStartDate={showStartDate}
          showEndDate={showEndDate}
        />
      </div>
    </main>
  );
};

export default Forms;
