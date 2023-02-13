import classes from "./Forms.module.css";
import Resume from "./Resume";
import Button from "../shared-components/Button";
import FormInput from "../shared-components/FormInput";
import FormTextArea from "../shared-components/FormTextArea";
import { Fragment, useReducer, useState, useEffect } from "react";
import { initialExperience, initialEducation } from "../helper/initialState";
import axios from "axios";
import { convertToFile } from "../helper/helperFunctions";

const initialState = {
  name: "",
  surname: "",
  email: "",
  phone_number: "",
  experiences: [initialExperience],
  educations: [initialEducation],
  image: null,
  about_me: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "updateName":
      return { ...state, name: action.payload };
    case "updateSurname":
      return { ...state, surname: action.payload };
    case "updateUploading":
      return { ...state, image: action.payload };
    case "updateEmail":
      return { ...state, email: action.payload };
    case "updateMobile":
      return { ...state, phone_number: action.payload };
    case "updateAbout":
      return { ...state, about_me: action.payload };
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
        educations: state.educations.map((edu, i) =>
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
        educations: [...state.educations, action.payload],
      };

    default:
      return state;
  }
};

const initialValidationState = {
  name: { value: "", isValid: null },
  surname: { value: "", isValid: null },
  image: { value: null, isValid: null },
  email: { value: "", isValid: null },
  mobile: { value: "", isValid: null },
  about: { value: "", isValid: null },
  experiences: [
    {
      position: { value: "", isValid: null },
      employer: { value: "", isValid: null },
      start_date: { value: "", isValid: null },
      due_date: { value: "", isValid: null },
      description: { value: "", isValid: null },
    },
  ],
  education: [
    {
      institute: { value: "", isValid: null },
      endCollegeDate: { value: "", isValid: null },
      collegeDescription: { value: "", isValid: null },
      degree: { value: "", isValid: null },
    },
  ],
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case "updateNameValidation":
      return { ...state, name: action.payload };
    case "updateSurnameValidation":
      return { ...state, surname: action.payload };
    case "updateEmailValidation":
      return { ...state, email: action.payload };
    case "updateImageValidation":
      return { ...state, image: action.payload };
    case "updateMobileValidation":
      return { ...state, mobile: action.payload };
    case "updateAboutValidation":
      return { ...state, about: action.payload };
    case "updateExperienceValidation":
      return {
        ...state,
        experiences: state.experiences.map((exp, i) =>
          i === action.payload.index
            ? { ...exp, ...action.payload.experience }
            : exp
        ),
      };
    case "updateEducationValidation":
      return {
        ...state,
        education: state.education.map((exp, i) =>
          i === action.payload.index
            ? { ...exp, ...action.payload.education }
            : exp
        ),
      };

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
  const [showEduEndDate, setShowEduEndDate] = useState(false);
  const [expTouched, setExpTouched] = useState(false);
  const [eduTouched, setEduTouched] = useState(false);
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

  // FIRST PAGE

  // Validations

  const nameChangeHandler = (e) => {
    dispatch({ type: "updateName", payload: e.target.value });
    localStorage.setItem("name", e.target.value);

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
    localStorage.setItem("surname", e.target.value);

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
    let isValid = false;
    if (formState.image) {
      isValid = true;
      dispatchValidation({
        type: "updateImageValidation",
        payload: { value: e.target.value, isValid },
      });
    }

    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      localStorage.setItem("image", reader.result);

      dispatch({
        type: "updateUploading",
        payload: URL.createObjectURL(e.target.files[0]),
      });
    };
  };

  const emailChangeHandler = (e) => {
    dispatch({ type: "updateEmail", payload: e.target.value });
    localStorage.setItem("email", e.target.value);
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
    localStorage.setItem("mobile", e.target.value);

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
    localStorage.setItem("about", e.target.value);
  };

  const updateExperience = (index, experience) => ({
    type: "updateExperience",
    payload: { index, experience },
  });

  const updateEducation = (index, education) => ({
    type: "updateEducation",
    payload: { index, education },
  });

  // SECOND PAGE

  const positionChangeHandler = (index) => (e) => {
    localStorage.setItem("position", e.target.value);
    dispatch({
      type: "updateExperience",
      payload: { index, experience: { position: e.target.value } },
    });

    if (e.target.value.length > 0) {
      setExpTouched(true);
    } else {
      setExpTouched(false);
    }

    let isValid = true;
    if (e.target.value.length < 2) {
      isValid = false;
    }

    dispatchValidation({
      type: "updateExperienceValidation",
      payload: {
        index,
        experience: {
          position: { value: e.target.value, isValid },
        },
      },
    });
  };

  const employeerChangeHandler = (index) => (e) => {
    localStorage.setItem("employer", e.target.value);
    if (e.target.value.length > 0) {
      setExpTouched(true);
    } else {
      setExpTouched(false);
    }

    dispatch({
      type: "updateExperience",
      payload: { index, experience: { employer: e.target.value } },
    });

    let isValid = true;
    if (e.target.value.length < 2) {
      isValid = false;
    }

    dispatchValidation({
      type: "updateExperienceValidation",
      payload: {
        index,
        experience: {
          employer: { value: e.target.value, isValid },
        },
      },
    });
  };

  const startDateChangeHandler = (index) => (e) => {
    localStorage.setItem("startDate", e.target.value);
    dispatch(
      updateExperience(index, {
        ...formState.experiences[index],
        start_date: e.target.value,
      })
    );
    setStartShowDate(true);
    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateExperienceValidation",
      payload: {
        index,
        experience: {
          start_date: { value: e.target.value, isValid },
        },
      },
    });
  };

  const endDateChangeHandler = (index) => (e) => {
    localStorage.setItem("endDate", e.target.value);

    dispatch(
      updateExperience(index, {
        ...formState.experiences[index],
        due_date: e.target.value,
      })
    );

    setEndShowDate(true);

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateExperienceValidation",
      payload: {
        index,
        experience: {
          due_date: { value: e.target.value, isValid },
        },
      },
    });
  };

  const collegeChangeHandler = (index) => (e) => {
    localStorage.setItem("institute", e.target.value);

    if (e.target.value.length > 0) {
      setEduTouched(true);
    } else {
      setEduTouched(false);
    }
    dispatch({
      type: "updateEducation",
      payload: { index, education: { institute: e.target.value } },
    });

    let isValid = true;
    if (e.target.value.length < 2) {
      isValid = false;
    }

    dispatchValidation({
      type: "updateEducationValidation",
      payload: {
        index,
        education: {
          institute: { value: e.target.value, isValid },
        },
      },
    });
  };

  const degreeChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateEducation",
      payload: { index, education: { degree_id: e.target.value } },
    });
    localStorage.setItem("degree", e.target.value);

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateEducationValidation",
      payload: {
        index,
        education: {
          degree: { value: e.target.value, isValid },
        },
      },
    });
  };

  const uniEndDateChangeHandler = (index) => (e) => {
    localStorage.setItem("eduEndDate", e.target.value);
    dispatch(
      updateEducation(index, {
        ...formState.educations[index],
        due_date: e.target.value,
      })
    );
    setShowEduEndDate(true);

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateEducationValidation",
      payload: {
        index,
        education: {
          endCollegeDate: { value: e.target.value, isValid },
        },
      },
    });
  };

  const descriptionChangeHandler = (index) => (e) => {
    localStorage.setItem("description", e.target.value);
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
      type: "updateExperienceValidation",
      payload: {
        index,
        experience: {
          description: { value: e.target.value, isValid },
        },
      },
    });
  };

  const eduDescriptionChangeHandler = (index) => (e) => {
    localStorage.setItem("eduDescription", e.target.value);
    dispatch(
      updateEducation(index, {
        ...formState.educations[index],
        description: e.target.value,
      })
    );

    let isValid = true;
    if (e.target.value === "") {
      isValid = false;
    }

    dispatchValidation({
      type: "updateEducationValidation",
      payload: {
        index,
        education: {
          collegeDescription: { value: e.target.value, isValid },
        },
      },
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

  const submitHandler = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setFormPart((prevState) => {
      return prevState + 1;
    });

    const fileFromURL = await convertToFile(formState.image);
    const payload = { ...formState, image: fileFromURL };
    console.log("image", fileFromURL);
    console.log("payload", payload);
    axios
      .post("https://resume.redberryinternship.ge/api/cvs", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
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
        {formPart === 3 && (
          <Fragment>
            <div className={classes.header}>
              <p className={classes.page_name}>განათლება</p>
              <p className={classes.pagination}>3/3</p>
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
                    value={formState.name || localStorage.getItem("name")}
                    onChange={nameChangeHandler}
                    styling={
                      validationState.name.isValid === null
                        ? ""
                        : validationState.name.isValid
                        ? "valid"
                        : "invalid"
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
                    value={formState.surname || localStorage.getItem("surname")}
                    onChange={surnameChangeHandler}
                    styling={
                      validationState.surname.isValid === null
                        ? ""
                        : validationState.surname.isValid
                        ? "valid"
                        : "invalid"
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
                  styling={
                    validationState.image.isValid === null
                      ? ""
                      : validationState.image.isValid
                      ? "valid"
                      : "invalid"
                  }
                />
              </div>
              <div className={classes.about_container}>
                <FormTextArea
                  label="ჩემს შესახებ (არასავალდებულო)"
                  id="about-me"
                  placeholder="ზოგადი ინფორმაცია შენს შესახებ"
                  value={formState.about || localStorage.getItem("about")}
                  onChange={aboutChangeHandler}
                />
              </div>
              <div className={classes.email}>
                <FormInput
                  label="ელ.ფოსტა"
                  type="text"
                  placeholder="მაგ: namesurname@redberry.ge"
                  id="email"
                  value={formState.email || localStorage.getItem("email")}
                  onChange={emailChangeHandler}
                  styling={
                    validationState.email.isValid === null
                      ? ""
                      : validationState.email.isValid
                      ? "valid"
                      : "invalid"
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
                  value={formState.mobile || localStorage.getItem("mobile")}
                  onChange={mobileChangeHandler}
                  styling={
                    validationState.mobile.isValid === null
                      ? ""
                      : validationState.mobile.isValid
                      ? "valid"
                      : "invalid"
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
                    value={
                      experience.position || localStorage.getItem("position")
                    }
                    onChange={positionChangeHandler(index)}
                    styling={
                      validationState.experiences[index].position.isValid ===
                      null
                        ? ""
                        : validationState.experiences[index].position.isValid
                        ? "valid"
                        : "invalid"
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
                    value={
                      experience.employer || localStorage.getItem("employer")
                    }
                    onChange={employeerChangeHandler(index)}
                    styling={
                      validationState.experiences[index].employer.isValid ===
                      null
                        ? ""
                        : validationState.experiences[index].employer.isValid
                        ? "valid"
                        : "invalid"
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
                      value={
                        experience.startDate ||
                        localStorage.getItem("startDate")
                      }
                      styling={
                        validationState.experiences[index].start_date
                          .isValid === null
                          ? ""
                          : validationState.experiences[index].start_date
                              .isValid
                          ? "valid"
                          : "invalid"
                      }
                    />
                  </div>
                  <div>
                    <FormInput
                      label="დამთავრების რიცხვი"
                      type="date"
                      onChange={endDateChangeHandler(index)}
                      value={
                        experience.endDate || localStorage.getItem("endDate")
                      }
                      styling={
                        validationState.experiences[index].due_date.isValid ===
                        null
                          ? ""
                          : validationState.experiences[index].due_date.isValid
                          ? "valid"
                          : "invalid"
                      }
                    />
                  </div>
                </div>
                <div className={classes.description_container}>
                  <FormTextArea
                    label="აღწერა"
                    id="description"
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    value={
                      experience.description ||
                      localStorage.getItem("description")
                    }
                    onChange={descriptionChangeHandler(index)}
                    styling={
                      validationState.experiences[index].description.isValid ===
                      null
                        ? ""
                        : validationState.experiences[index].description.isValid
                        ? "valid"
                        : "invalid"
                    }
                  />
                </div>
              </Fragment>
            ))}
          {formPart === 3 &&
            formState.educations.map((education, index) => (
              <Fragment key={index}>
                <div className={classes.position}>
                  <FormInput
                    label="სასწავლებელი"
                    type="text"
                    placeholder="სასწავლებელი"
                    id="college"
                    value={
                      education.institute || localStorage.getItem("institute")
                    }
                    onChange={collegeChangeHandler(index)}
                    styling={
                      validationState.education[index].institute.isValid ===
                      null
                        ? ""
                        : validationState.education[index].institute.isValid
                        ? "valid"
                        : "invalid"
                    }
                  />
                  <span>მინიმუმ 2 სიმბოლო</span>
                </div>
                <div className={classes.date}>
                  <div>
                    <label
                      className={`${classes.label} ${
                        validationState.education[index].degree.isValid === true
                          ? classes.valid
                          : validationState.education[index].degree.isValid ===
                            false
                          ? classes.invalid
                          : ""
                      }`}
                    >
                      ხარისხი
                    </label>
                    <select
                      value={education.degree || localStorage.getItem("degree")}
                      onChange={degreeChangeHandler(index)}
                    >
                      {selectData.map((option) => (
                        <option key={option.id} value={option.id}>
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
                      value={
                        education.endDate || localStorage.getItem("eduEndDate")
                      }
                      styling={
                        validationState.education[index].endCollegeDate
                          .isValid === null
                          ? ""
                          : validationState.education[index].endCollegeDate
                              .isValid
                          ? "valid"
                          : "invalid"
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
                      validationState.education[index].collegeDescription
                        .isValid === null
                        ? ""
                        : validationState.education[index].collegeDescription
                            .isValid
                        ? "valid"
                        : "invalid"
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
            <div className={classes.addButton_container}>
              <Button
                buttonType="button"
                styling="add"
                onClickHanlder={addExperienceHandler}
              >
                მეტი გამოცდილების დამატება
              </Button>
            </div>
          )}
          {formPart === 3 && (
            <div className={classes.addButton_container}>
              <Button
                buttonType="button"
                styling="add"
                onClickHanlder={addEducationHandler}
              >
                სხვა სასწავლებლის დამატება
              </Button>
            </div>
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
          showEduEndDate={showEduEndDate}
          expTouched={expTouched}
          eduTouched={eduTouched}
        />
      </div>
    </main>
  );
};

export default Forms;
