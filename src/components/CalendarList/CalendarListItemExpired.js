import React, { useState } from 'react';

const CalendarListItemExpired = ({ meeting, onDeleteMeeting }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = (confirm) => {
    setShowConfirmation(false);
    if (confirm) {
      onDeleteMeeting(meeting.id);
    }
  };

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
          <span className="calendar-list__icon" role="img" aria-label="Clock">
            🕒
          </span>
          {meeting.time}
        </span>
      </div>
      <div className="calendar-list__details">
        <span className="calendar-list__name">
          {' '}
          <span className="calendar-list__icon" role="img" aria-label="Person">
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
        onClick={() => setShowConfirmation(true)}
        className="calendar-list__delete-button"
      >
        Remove meeting
      </button>
      {showConfirmation && (
        <div className="confirmation-dialog dialog">
          <p className="dialog__text">
            Are you sure you want to remove this meeting?
          </p>
          <button
            className="dialog__button button button--confirm"
            onClick={() => handleConfirmation(true)}
          >
            Confirm
          </button>
          <button
            className="dialog__button button button--cancel"
            onClick={() => handleConfirmation(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </li>
  );
};

export default CalendarListItemExpired;
