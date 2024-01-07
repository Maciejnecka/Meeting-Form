import React from 'react';
import Api from '../../providers/calendarProvider';
import CalendarListItem from './CalendarListItem';
import CalendarListItemExpired from './CalendarListItemExpired';
import { calculateCountdown } from '../../helpers/CalendarListCalculateCountdown';
import { sortByDateTime, parseDateTime } from '../../helpers/sortByDateTime';

const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const UPDATE_INTERVAL = MILLISECONDS_IN_MINUTE;

class CalendarList extends React.Component {
  api = new Api();
  timeoutId = null;
  intervalId = null;

  componentDidMount() {
    this.startUpdateInterval();
  }

  componentWillUnmount() {
    this.clearUpdateInterval();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meetings !== this.props.meetings) {
      this.clearUpdateInterval();
      this.startUpdateInterval();
    }
  }

  startUpdateInterval() {
    const currentDateTime = new Date();
    const millisecondsUntilNextMinute =
      MILLISECONDS_IN_MINUTE -
      currentDateTime.getSeconds() * MILLISECONDS_IN_SECOND -
      currentDateTime.getMilliseconds();

    this.timeoutId = setTimeout(() => {
      this.forceUpdate();

      this.intervalId = setInterval(() => {
        this.forceUpdate();
      }, UPDATE_INTERVAL);
    }, millisecondsUntilNextMinute);
  }

  clearUpdateInterval() {
    clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
  }

  render() {
    const currentDateTime = new Date();

    if (!Array.isArray(this.props.meetings)) {
      return null;
    }

    const filterAndSortMeetings = (meetings, condition) =>
      sortByDateTime(meetings.filter(condition));

    const sortedMeetings = sortByDateTime(this.props.meetings);
    const upcomingMeetings = filterAndSortMeetings(
      sortedMeetings,
      (meeting) => {
        const meetingDateTime = parseDateTime(meeting.date, meeting.time);
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
          {upcomingMeetings.map(
            ({ id, date, time, email, firstName, lastName }) => (
              <CalendarListItem
                key={id}
                meeting={{ id, date, time, firstName, lastName, email }}
                onDeleteMeeting={this.props.onDeleteMeeting}
                renderCountdown={calculateCountdown}
              />
            )
          )}
        </ul>
        {expiredMeetings.length > 0 && (
          <div>
            <h2 className="calendar-list__title">Expired Meetings</h2>
            <ul className="calendar-list__items">
              {expiredMeetings.map(
                ({ id, date, time, email, firstName, lastName }) => (
                  <CalendarListItemExpired
                    key={id}
                    meeting={{ id, date, time, email, firstName, lastName }}
                    onDeleteMeeting={this.props.onDeleteMeeting}
                  />
                )
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default CalendarList;
