import { useEffect } from "react";
import { Alert } from "@mui/material";

export function Notification({ notification, resetMessage }) {
  const textColor = notification?.status === "success" ? "green" : "red";

  const style = {
    margin: "1em",
    color: textColor,
  };

  useEffect(() => {
    setTimeout(() => {
      resetMessage();
    }, 5000);
  }, [notification, resetMessage]);

  if (!notification) return null;

  return (
    <div className={"status-message-container"}>
      <Alert data-testid="alert" sx={style}>
        {notification.message}
      </Alert>
    </div>
  );
}
