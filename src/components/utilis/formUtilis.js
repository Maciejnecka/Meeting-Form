import { validateFormFields } from '../../helpers/ValidateForm';

export const renderFormFields = (form, errors, touched) => {
  const fields = validateFormFields(form);

  return fields.map((field) => {
    const { name, label } = field;
    const showError = touched[name] && errors[name];

    return (
      <div key={name}>
        <label htmlFor={name}>{label}</label>
        <input
          type={field.name === 'email' ? 'email' : 'text'}
          id={name}
          name={name}
          value={form[name]}
          onChange={this.handleInputChange}
        />
        {showError && <span>{errors[name]}</span>}
      </div>
    );
  });
};
