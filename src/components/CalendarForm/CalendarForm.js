import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Api from '../../providers/calendarProvider';
import CalendarFormRender from './CalendarFormRender';
import { validateFormFields } from '../../helpers/ValidateForm';

class CalendarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
      },
      errors: {},
      suggestions: {
        firstName: [],
        lastName: [],
        email: [],
      },
    };
    this.api = new Api();
  }

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));

    if (name === 'firstName' || name === 'lastName' || name === 'email') {
      try {
        const suggestions = await this.api.filter(name, value);
        this.setState((prevState) => ({
          suggestions: {
            ...prevState.suggestions,
            [`${name}Suggestions`]: suggestions,
          },
        }));
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
        firstName: this.state.form.firstName,
        lastName: this.state.form.lastName,
        email: this.state.form.email,
        date: this.state.form.date,
        time: this.state.form.time,
      };

      this.props.onSubmit(newMeeting);

      this.setState({
        form: {
          firstName: '',
          lastName: '',
          email: '',
          date: '',
          time: '',
        },
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
        form={this.state.form}
        errors={this.state.errors}
        suggestions={{
          firstName: this.state.suggestions.firstName,
          lastName: this.state.suggestions.lastName,
          email: this.state.suggestions.email,
        }}
        handleInputChange={this.handleInputChange}
        handleSuggestionClick={this.handleSuggestionClick}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
export default CalendarForm;
