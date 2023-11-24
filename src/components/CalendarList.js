import React from 'react';
import Api from '../providers/calendarProvider';

class CalendarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting: [],
    };
  }
  api = new Api();

  async handleDeleteMeeting(meetingId) {
    const isConfirmed = window.confirm(
      `Are you sure you want to remove this meeting?`
    );
    if (isConfirmed) {
      try {
        await this.api.delete(meetingId);
        const updatedMeetings = this.state.meeting.filter(
          (meeting) => meeting.id !== meetingId
        );
        this.setState(
          {
            meeting: updatedMeetings,
          },
          () => {
            window.location.reload();
          }
        );
      } catch (error) {
        console.error('Error deleting meeting: ', error);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meetings !== this.props.meetings) {
      const updatedMeetings = this.props.meetings.slice();
      this.setState({ meeting: updatedMeetings });
    }
  }

  render() {
    const currentDateTime = new Date();

    const sortedMeetings = this.state.meeting.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    const upcomingMeetings = sortedMeetings.filter((meeting) => {
      const meetingDateTime = new Date(`${meeting.date} ${meeting.time}`);
      return meetingDateTime > currentDateTime;
    });

    const expiredMeetings = sortedMeetings.filter((meeting) => {
      const meetingDateTime = new Date(`${meeting.date} ${meeting.time}`);
      return meetingDateTime <= currentDateTime;
    });

    return (
      <div className="calendar-list">
        <h1 className="calendar-list__title">Meeting List</h1>
        <ul className="calendar-list__items">
          {upcomingMeetings.map((meeting) => (
            <li key={meeting.id} className="calendar-list__item">
              <div className="calendar-list__header">
                <span className="calendar-list__date">
                  <span
                    className="calendar-list__icon"
                    role="img"
                    aria-label="Calendar"
                  >
                    📅
                  </span>
                  {meeting.date}
                </span>
                <br />
                <span className="calendar-list__time">
                  <span
                    className="calendar-list__icon"
                    role="img"
                    aria-label="Clock"
                  >
                    🕒
                  </span>
                  {meeting.time}
                </span>
              </div>
              <div className="calendar-list__details">
                <span className="calendar-list__name">
                  {' '}
                  <span
                    className="calendar-list__icon"
                    role="img"
                    aria-label="Person"
                  >
                    👤
                  </span>
                  {meeting.firstName} {meeting.lastName}
                </span>
                <br />
                <span className="calendar-list__email">
                  <span
                    className="calendar-list__icon"
                    role="img"
                    aria-label="Email"
                  >
                    ✉️
                  </span>
                  {meeting.email}
                </span>
                <br />
              </div>
              <button
                onClick={() => this.handleDeleteMeeting(meeting.id)}
                className="calendar-list__delete-button"
              >
                Remove meeting
              </button>
            </li>
          ))}
        </ul>
        {expiredMeetings.length > 0 && (
          <div>
            <h2 className="calendar-list__title">Expired Meetings</h2>
            <ul className="calendar-list__items">
              {expiredMeetings.map((meeting) => (
                <li key={meeting.id} className="calendar-list__item expired">
                  <div className="calendar-list__header">
                    <span className="calendar-list__date">
                      <span
                        className="calendar-list__icon"
                        role="img"
                        aria-label="Calendar"
                      >
                        📅
                      </span>
                      {meeting.date}
                    </span>
                    <br />
                    <span className="calendar-list__time">
                      <span
                        className="calendar-list__icon"
                        role="img"
                        aria-label="Clock"
                      >
                        🕒
                      </span>
                      {meeting.time}
                    </span>
                  </div>
                  <div className="calendar-list__details">
                    <span className="calendar-list__name">
                      {' '}
                      <span
                        className="calendar-list__icon"
                        role="img"
                        aria-label="Person"
                      >
                        👤
                      </span>
                      {meeting.firstName} {meeting.lastName}
                    </span>
                    <br />
                    <span className="calendar-list__email">
                      <span
                        className="calendar-list__icon"
                        role="img"
                        aria-label="Email"
                      >
                        ✉️
                      </span>
                      {meeting.email}
                    </span>
                    <br />
                  </div>
                  <button
                    onClick={() => this.handleDeleteMeeting(meeting.id)}
                    className="calendar-list__delete-button"
                  >
                    Remove meeting
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default CalendarList;
