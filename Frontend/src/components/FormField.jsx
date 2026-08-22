const FormField = ({ label, ...props }) => (
  <label className="form-field">
    <span>{label}</span>
    <input {...props} />
  </label>
)

export default FormField
