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

const options = [];

const Forms = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [formPart, setFormPart] = useState(1);
  const [showStartDate, setStartShowDate] = useState(false);
  const [showEndDate, setEndShowDate] = useState(false);

  const [selectData, setSelectData] = useState(options);

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

  console.log(selectData);

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
  const updateEducation = (index, education) => ({
    type: "updateEducation",
    payload: { index, education },
  });

  const positionChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateExperience",
      payload: { index, experience: { position: e.target.value } },
    });
  };
  const collegeChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateEducation",
      payload: { index, education: { college: e.target.value } },
    });
  };

  const employeerChangeHandler = (index) => (e) => {
    dispatch({
      type: "updateExperience",
      payload: { index, experience: { employeer: e.target.value } },
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

  const uniEndDateChangeHandler = (index) => (e) => {
    dispatch(
      updateEducation(index, {
        ...formState.education[index],
        endDate: e.target.value,
      })
    );
    // setEndShowDate(true);
  };

  const descriptionChangeHandler = (index) => (e) => {
    dispatch(
      updateExperience(index, {
        ...formState.experiences[index],
        description: e.target.value,
      })
    );
  };

  const eduDescriptionChangeHandler = (index) => (e) => {
    dispatch(
      updateEducation(index, {
        ...formState.education[index],
        description: e.target.value,
      })
    );
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
    console.log(formState);

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
                  />
                  <small>მინიმუმ 2 ასო, ქართული ასოები</small>
                </div>
                <div>
                  <FormInput
                    type="text"
                    label="გვარი"
                    placeholder="გვარი"
                    id="surname"
                    value={formState.surname}
                    onChange={surnameChangeHandler}
                  />
                  <small>მინიმუმ 2 ასო, ქართული ასოები</small>
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
                />
                <small>უნდა მთავრდებოდეს @redberry.ge-ით</small>
              </div>
              <div className={classes.number}>
                <FormInput
                  label="მობილურის ნომერი"
                  type="text"
                  placeholder="მაგ: +995 551 12 34 56"
                  id="mobile"
                  value={formState.mobile}
                  onChange={mobileChangeHandler}
                />
                <small>
                  უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს
                </small>
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
                  />
                  <small>მინიმუმ 2 სიმბოლო</small>
                </div>
                <div className={classes.employeer}>
                  <FormInput
                    label="დამსაქმებელი"
                    type="text"
                    placeholder="დამსაქმებელი"
                    id="employeer"
                    value={experience.employeer}
                    onChange={employeerChangeHandler(index)}
                  />
                  <small>მინიმუმ 2 სიმბოლო</small>
                </div>
                <div className={classes.date}>
                  <div>
                    <FormInput
                      label="დაწყების რიცხვი"
                      type="date"
                      onChange={startDateChangeHandler(index)}
                      value={experience.startDate}
                    />
                  </div>
                  <div>
                    <FormInput
                      label="დამთავრების რიცხვი"
                      type="date"
                      onChange={endDateChangeHandler(index)}
                      value={experience.endDate}
                    />
                  </div>
                </div>
                <div className={classes.description_container}>
                  <FormTextArea
                    label="description"
                    id="description"
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    value={experience.description}
                    onChange={descriptionChangeHandler(index)}
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
                  />
                  <small>მინიმუმ 2 სიმბოლო</small>
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
