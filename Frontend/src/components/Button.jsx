const Button = ({ children, type = 'button', variant = 'primary', ...props }) => (
  <button className={`button button-${variant}`} type={type} {...props}>
    {children}
  </button>
)

export default Button
