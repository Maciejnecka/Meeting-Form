const CalendarFormRender = ({
  form: { firstName, lastName, email, date, time },
  errors,
  suggestions: { firstNameSuggestions, lastNameSuggestions, emailSuggestions },
  handleInputChange,
  handleSuggestionClick,
  handleSubmit,
}) => {
  return (
    <div className="form">
      <h1 className="form__title">Meeting Form</h1>
      <form className="form__container" onSubmit={handleSubmit}>
        <label className="form__label">
          <input
            placeholder="First name"
            className="form__input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
            list="firstNameSuggestions"
          />
          <datalist id="firstNameSuggestions">
            {firstNameSuggestions &&
              firstNameSuggestions.map((suggestion) => (
                <option
                  key={suggestion.id}
                  value={suggestion.firstName}
                  onClick={() =>
                    handleSuggestionClick('firstName', suggestion.firstName)
                  }
                />
              ))}
          </datalist>
          {errors.firstName && (
            <p className="form__error">{errors.firstName}</p>
          )}
        </label>
        <label className="form__label">
          <input
            placeholder="Last name"
            className="form__input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
            list="lastNameSuggestions"
          />
          <datalist id="lastNameSuggestions">
            {lastNameSuggestions &&
              lastNameSuggestions.map((suggestion) => (
                <option
                  key={suggestion.id}
                  value={suggestion.lastName}
                  onClick={() =>
                    handleSuggestionClick('lastName', suggestion.lastName)
                  }
                />
              ))}
          </datalist>
          {errors.lastName && <p className="form__error">{errors.lastName}</p>}
        </label>
        <label className="form__label">
          <input
            placeholder="Email"
            className="form__input"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            list="emailSuggestions"
          />
          <datalist id="emailSuggestions">
            {emailSuggestions &&
              emailSuggestions.map((suggestion) => (
                <option
                  key={suggestion.id}
                  value={suggestion.email}
                  onClick={() =>
                    handleSuggestionClick('email', suggestion.email)
                  }
                />
              ))}
          </datalist>
          {errors.email && <p className="form__error">{errors.email}</p>}
        </label>
        <label className="form__label">
          <input
            className="form__input"
            type="date"
            name="date"
            value={date}
            onChange={handleInputChange}
          />
          {errors.date && <p className="form__error">{errors.date}</p>}
        </label>
        <label className="form__label">
          <input
            className="form__input"
            type="time"
            name="time"
            value={time}
            onChange={handleInputChange}
          />
          {errors.time && <p className="form__error">{errors.time}</p>}
        </label>
        <button className="form__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CalendarFormRender;
