import React from 'react';

class CalendarListItem extends React.Component {
  render() {
    const { meeting } = this.props;
    const meetingDateTime = new Date(`${meeting.date} ${meeting.time}`);

    return (
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
            <span className="calendar-list__icon" role="img" aria-label="Clock">
              🕒
            </span>
            {meeting.time}
          </span>
        </div>
        {this.props.renderCountdown(meetingDateTime)}
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
            <span className="calendar-list__icon" role="img" aria-label="Email">
              ✉️
            </span>
            {meeting.email}
          </span>
          <br />
        </div>
        <button
          onClick={() => this.props.onDeleteMeeting(this.props.meeting.id)}
          className="calendar-list__delete-button"
        >
          Remove meeting
        </button>
      </li>
    );
  }
}

export default CalendarListItem;
