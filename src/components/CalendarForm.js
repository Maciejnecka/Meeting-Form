import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class CalendarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
      error: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      return;
    }
    const id = uuidv4();
    const newMeeting = {
      id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      date: this.state.date,
      time: this.state.time,
    };

    this.props.onSubmit(newMeeting);

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
      error: '',
    });
  };

  validateForm = () => {
    // temp
    return true;
  };

  render() {
    return (
      <div className="form">
        <h1 className="form__title">Meeting Form</h1>
        <form className="form__container" onSubmit={this.handleSubmit}>
          <label className="form__label">
            First Name
            <input
              className="form__input"
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="form__label">
            Last Name
            <input
              className="form__input"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="form__label">
            Email{' '}
            <input
              className="form__input"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="form__label">
            Date{' '}
            <input
              className="form__input"
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
            />
          </label>
          <label className="form__label">
            Time{' '}
            <input
              className="form__input"
              type="time"
              name="time"
              value={this.state.time}
              onChange={this.handleInputChange}
            />
          </label>
          <button className="form__button" type="submit">
            Submit
          </button>
        </form>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
      </div>
    );
  }
}
export default CalendarForm;
