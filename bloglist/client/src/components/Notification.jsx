import { useEffect } from "react";
import { Alert } from "@mui/material";

export function Notification({ notification, resetNotification }) {
  const textColor = notification?.status === "success" ? "green" : "red";

  const style = {
    margin: "1em",
    color: textColor,
  };

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      resetNotification();
    }, 5000);
    return () => {
      clearTimeout(timeOutID);
    };
  }, [notification, resetNotification]);

  if (!notification) return null;

  return (
    <div className={"status-message-container"}>
      <Alert data-testid="alert" sx={style}>
        {notification.message}
      </Alert>
    </div>
  );
}
