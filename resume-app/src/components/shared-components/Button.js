import classes from "./Button.module.css";

const BUTTON_CLASSES = {
  next: "next",
  back: "back",
  add: "add",
};

const Button = ({ children, buttonType, styling, onClickHanlder }) => {
  console.log(BUTTON_CLASSES[styling]);
  return (
    <button
      type={buttonType}
      className={`${classes[BUTTON_CLASSES[styling]]}`}
      onClick={onClickHanlder}
    >
      {children}
    </button>
  );
};

export default Button;
