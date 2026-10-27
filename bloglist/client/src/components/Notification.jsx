import { useEffect } from "react";
import { Alert } from "@mui/material";
import {
  useNotification,
  useNotificationControls,
} from "../stores/notificationStore.js";

export function Notification() {
  const notification = useNotification();
  const { resetNotification } = useNotificationControls();
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
