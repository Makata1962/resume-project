const FormTextArea = ({ label, ...otherProps }) => {
  return (
    <div>
      <label htmlFor={otherProps.id}>{label}</label>
      <textarea {...otherProps} />
    </div>
  );
};

export default FormTextArea;
