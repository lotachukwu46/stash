import React, { useState } from "react";
import { useField, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./formField.scss";

const FormField = ({ control, label, name, type, placeholder, options }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name}>
        {({ field, form }) => (
          <div className="input-wrapper">
            {control === "select" ? (
              <select {...field} placeholder={placeholder}>
                <option value="">{placeholder}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                ))}
              </select>
            ) : control === "textarea" ? (
              <textarea {...field} placeholder={placeholder} />
            ) : control === "file" ? (
              <input
                {...field}
                type="file"
                placeholder={placeholder}
                onChange={(e) =>
                  form.setFieldValue(name, e.currentTarget.files[0])
                }
              />
            ) : control === "radio" ? (
              options.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  {option.key}
                </label>
              ))
            ) : (
              <input
                {...field}
                type={showPassword && type === "password" ? "text" : type}
                placeholder={placeholder}
                className={meta.touched && meta.error ? "input-error" : ""}
              />
            )}
            {type === "password" && (
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            )}
          </div>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default FormField;
