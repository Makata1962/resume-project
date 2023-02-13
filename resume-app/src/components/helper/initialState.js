export const initialExperience = {
  position: "",
  employer: "",
  start_date: new Date().toISOString(),
  due_date: new Date().toISOString(),
  description: "",
};

export const initialEducation = {
  institute: "",
  degree_id: null,
  due_date: new Date().toISOString(),
  description: "",
};

export const initialValidationExperience = {
  position: { value: "", isValid: null },
  employer: { value: "", isValid: null },
  start_date: { value: "", isValid: null },
  due_date: { value: "", isValid: null },
  description: { value: "", isValid: null },
};

export const initialValidationEducation = {
  institute: { value: "", isValid: null },
  endCollegeDate: { value: "", isValid: null },
  collegeDescription: { value: "", isValid: null },
  degree: { value: "", isValid: null },
};
