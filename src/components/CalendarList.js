import React from 'react';

class CalendarList extends React.Component {
  render() {
    return (
      <div>
        <h1>Meeting List</h1>
        <ul>
          {this.props.meetings.map((meeting, index) => (
            <li key={index}>
              {meeting.date} - {meeting.firstName} {meeting.lastName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CalendarList;
