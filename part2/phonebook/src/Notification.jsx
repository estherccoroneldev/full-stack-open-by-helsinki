const Notification = ({ message, kind }) => {
  if (!message) {
    return null;
  }

  let color = "red";
  if (kind === "confirm") {
    color = "green";
  }

  return (
    <div className="notification" style={{ color }}>
      <p style={{ color }}>{message}</p>
    </div>
  );
};

export default Notification;
