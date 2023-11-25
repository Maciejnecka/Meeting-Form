import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Api from '../../providers/calendarProvider';
import CalendarFormRender from './CalendarFormRender';
import { validateFormFields } from '../../helpers/ValidateForm';

class CalendarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
      errors: {},
      firstNameSuggestions: [],
      lastNameSuggestions: [],
      emailSuggestions: [],
    };
    this.api = new Api();
  }

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === 'firstName' || name === 'lastName' || name === 'email') {
      try {
        const suggestions = await this.api.filter(name, value);
        this.setState({ [`${name}Suggestions`]: suggestions });
      } catch (error) {
        console.error('Error fetching suggestions: ', error);
      }
    }
  };

  handleSuggestionClick = (name, suggestion) => {
    this.setState({ [name]: suggestion, [`${name}Suggestions`]: [] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    if (Object.keys(errors).length === 0) {
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
        errors: {},
      });
    } else {
      this.setState({ errors });
    }
  };

  validateForm = () => {
    return validateFormFields(this.state);
  };

  render() {
    return (
      <CalendarFormRender
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleSuggestionClick={this.handleSuggestionClick}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
export default CalendarForm;
