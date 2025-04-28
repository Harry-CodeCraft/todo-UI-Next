import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { handleLogout } from "../dashboardContainer/utils";

const useStyles = makeStyles({
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    borderRadius: "8px",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  bodyText: {
    color: "#555",
    marginBottom: "24px",
  },
  countdownText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: "16px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  staySignedInButton: {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  signOutButton: {
    borderColor: "#d32f2f",
    color: "#d32f2f",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#f8d7da",
      borderColor: "#c62828",
    },
  },
});

const SessionTimeoutModal: React.FC<{
  onStaySignedIn: () => void;
  onSignOut: () => void;
  isOpen: boolean;
}> = ({ onStaySignedIn, onSignOut, isOpen }) => {
  // const [open, setOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const classes = useStyles();

  useEffect(() => {
    if (timeLeft <= 0) {
      handleLogout();
      alert("Session expired. Please login again.");
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [timeLeft, onSignOut]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Modal open={isOpen}>
      <Box className={classes.modalBox}>
        <Typography variant="h6" component="h2" className={classes.title}>
          Session Expiring
        </Typography>
        <Typography variant="body1" className={classes.bodyText}>
          Your session is about to expire. Do you want to stay signed in?
        </Typography>
        <Typography className={classes.countdownText}>
          Time left: {formatTime(timeLeft)}
        </Typography>
        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            className={classes.staySignedInButton}
            onClick={() => {
              onStaySignedIn();
              setTimeLeft(300); // Reset the timer to 5 minutes
            }}
          >
            Stay Signed In
          </Button>
          <Button
            variant="outlined"
            className={classes.signOutButton}
            onClick={onSignOut}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SessionTimeoutModal;
