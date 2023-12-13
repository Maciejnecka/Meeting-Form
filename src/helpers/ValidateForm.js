export const validateFormFields = (state) => {
  const errors = {};
  const fields = [
    {
      name: 'firstName',
      label: 'First name',
      required: true,
      minLength: 2,
    },
    {
      name: 'lastName',
      label: 'Last name',
      required: true,
      minLength: 2,
    },
    {
      name: 'email',
      label: 'Email',
      required: true,
      pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
    },
    {
      name: 'date',
      label: 'Date',
      required: true,
      pattern: /^\d{4}-\d{2}-\d{2}$/,
    },
    {
      name: 'time',
      label: 'Time',
      required: true,
      pattern: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  ];

  fields.forEach((field) => {
    const value = state.form[field.name];

    if (field.required && value.trim() === '') {
      errors[field.name] = `${field.label} is required.`;
    }

    if (field.minLength && value.length < field.minLength) {
      errors[
        field.name
      ] = `${field.label} should be at least ${field.minLength} characters long.`;
    }

    if (field.pattern && !new RegExp(field.pattern).test(value)) {
      errors[field.name] = `${field.label} is not in the correct format.`;
    }
  });

  return errors;
};
