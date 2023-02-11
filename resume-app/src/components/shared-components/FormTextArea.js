import classes from "./FormTextArea.module.css";

const FormTextArea = ({ label, styling, ...otherProps }) => {
  return (
    <div>
      <label
        className={`${classes.label} ${classes[styling]}`}
        htmlFor={otherProps.id}
      >
        {label}
      </label>
      <textarea
        className={`${classes.textarea} ${classes[styling]}`}
        {...otherProps}
      />
    </div>
  );
};

export default FormTextArea;
