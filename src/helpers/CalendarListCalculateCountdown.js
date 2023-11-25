export const calculateCountdown = (meetingDateTime) => {
  const currentDateTime = new Date();
  const timeDifference = meetingDateTime - currentDateTime;

  if (timeDifference <= 24 * 60 * 60 * 1000) {
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
    );

    return (
      <div className="calendar-list__countdown">
        Time remaining
        <br /> {hours} hour{hours !== 1 ? 's' : ''} {minutes} minute
        {minutes !== 1 ? 's' : ''}
      </div>
    );
  } else {
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    return (
      <div className="calendar-list__countdown">
        Time remaining
        <br /> More than {days} day{days !== 1 ? 's' : ''}
      </div>
    );
  }
};
