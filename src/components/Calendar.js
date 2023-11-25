import React from 'react';
import Api from '../providers/calendarProvider.js';
import CalendarList from './CalendarList';
import CalendarForm from './CalendarForm';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.api = new Api();
    this.state = {
      meetings: {},
    };
  }

  componentDidMount() {
    this.api.load().then((meetings) => {
      this.setState({ meetings });
    });
  }

  handleFormSubmit = (formData) => {
    const updateMeetings = [...this.state.meetings, formData];
    this.setState({ meetings: updateMeetings });

    this.api.update(formData);
  };

  handleDeleteMeeting = async (meetingId) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to remove this meeting?`
    );
    if (isConfirmed) {
      try {
        await this.api.delete(meetingId);
        const updatedMeetings = this.state.meetings.filter(
          (meeting) => meeting.id !== meetingId
        );
        this.setState({ meetings: updatedMeetings });
      } catch (error) {
        console.error('Error deleting meeting: ', error);
      }
    }
  };

  render() {
    return (
      <div className="calendar-container">
        <div className="calendar-list-container">
          <CalendarForm onSubmit={this.handleFormSubmit} />
        </div>
        <div className="calendar-form-container">
          <CalendarList
            meetings={this.state.meetings}
            onDeleteMeeting={this.handleDeleteMeeting}
          />
        </div>
      </div>
    );
  }
}
export default Calendar;
