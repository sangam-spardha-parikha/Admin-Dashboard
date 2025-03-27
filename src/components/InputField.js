export const InputField = ({ label, type, name, value, onChange, errors = {}, options = [], required = false }) => {
  switch (type) {
    case "select":
      return (
        <div className="text-left">
          <label className="form-label">{label}</label>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="form-control mb-3 w-full"
            style={{ borderRadius: "25px", padding: "12px" }}
            required={required}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[name] && <span style={{ color: "red" }}>{errors[name]}</span>}
        </div>
      );

    case "radio":
      return (
        <div className="text-left">
          <label className="form-label">{label}</label>
          <div>
            {options.map((option, index) => (
              <div key={index} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  required={required}
                />
                <label className="form-check-label">{option.label}</label>
              </div>
            ))}
          </div>
          {errors[name] && <span style={{ color: "red" }}>{errors[name]}</span>}
        </div>
      );

    case "checkbox":
      return (
        <div className="text-left">
          <div>
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              className="form-check-input"
              required={required}
            />
            <label className="form-check-label">{label}</label>
          </div>
          {errors[name] && <span style={{ color: "red" }}>{errors[name]}</span>}
        </div>
      );

    case "textarea":
      return (
        <div className="text-left">
          <label className="form-label">{label}</label>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="form-control mb-3 w-100"
            style={{ borderRadius: "25px", padding: "12px" }}
            required={required}
          />
          {errors[name] && <span style={{ color: "red" }}>{errors[name]}</span>}
        </div>
      );

    default:
      return (
        <div className="text-left">
          <label className="form-label">{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="form-control mb-3 w-full"
            style={{ borderRadius: "25px", padding: "12px" }}
            required={required}
          />
          {errors[name] && <span style={{ color: "red" }}>{errors[name]}</span>}
        </div>
      );
  }
};
