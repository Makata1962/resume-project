import classes from "./FormInput.module.css";

const FormInput = ({ label, styling, ...otherProps }) => {
  return (
    <div>
      <label htmlFor={otherProps.id}  className={`${classes.label} ${classes[styling]}`}>
        {label}
      </label>
      <input
        className={`${classes.input} ${classes[styling]}`}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
