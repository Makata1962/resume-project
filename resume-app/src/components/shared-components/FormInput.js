import classes from "./FormInput.module.css";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div>
      <label htmlFor={otherProps.id} className={classes.label}>
        {label}
      </label>
      <input {...otherProps} />
    </div>
  );
};

export default FormInput;
