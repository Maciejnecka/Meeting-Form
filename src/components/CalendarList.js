import React from 'react';
import Api from '../providers/calendarProvider';
import CalendarListItem from './CalendarListItem';
import { calculateCountdown } from '../helpers/CalendarListCalculateCountdown';

class CalendarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting: [],
    };
    this.api = new Api();
  }

  componentDidMount() {
    this.updateMeetings();

    const currentDateTime = new Date();
    const millisecondsUntilNextMinute =
      60000 -
      currentDateTime.getSeconds() * 1000 -
      currentDateTime.getMilliseconds();

    this.timeoutId = setTimeout(() => {
      this.forceUpdate();

      this.intervalId = setInterval(() => {
        this.forceUpdate();
      }, 60000);
    }, millisecondsUntilNextMinute);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meetings !== this.props.meetings) {
      this.updateMeetings();
    }
  }

  updateMeetings() {
    const updatedMeetings = Array.isArray(this.props.meetings)
      ? this.props.meetings.slice()
      : [];
    this.setState({ meeting: updatedMeetings });
  }

  render() {
    const currentDateTime = new Date();

    const sortByDateTime = (meetings) =>
      meetings.sort(
        (a, b) =>
          new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
      );

    const filterAndSortMeetings = (meetings, condition) =>
      sortByDateTime(meetings.filter(condition));

    const sortedMeetings = sortByDateTime(this.state.meeting);
    const upcomingMeetings = filterAndSortMeetings(
      sortedMeetings,
      (meeting) => {
        const meetingDateTime = new Date(`${meeting.date} ${meeting.time}`);
        return meetingDateTime > currentDateTime;
      }
    );

    const expiredMeetings = filterAndSortMeetings(sortedMeetings, (meeting) => {
      const meetingDateTime = new Date(`${meeting.date} ${meeting.time}`);
      return meetingDateTime <= currentDateTime;
    });

    expiredMeetings.reverse();

    return (
      <div className="calendar-list">
        <h1 className="calendar-list__title">Meeting List</h1>
        <ul className="calendar-list__items">
          {upcomingMeetings.map((meeting) => (
            <CalendarListItem
              key={meeting.id}
              meeting={meeting}
              onDeleteMeeting={this.props.onDeleteMeeting}
              renderCountdown={calculateCountdown}
            />
          ))}
        </ul>
        {expiredMeetings.length > 0 && (
          <div>
            <h2 className="calendar-list__title">Expired Meetings</h2>
            <ul className="calendar-list__items">
              {expiredMeetings.map((meeting) => {
                return (
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
                      onClick={() => this.props.onDeleteMeeting(meeting.id)}
                      className="calendar-list__delete-button"
                    >
                      Remove meeting
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default CalendarList;
