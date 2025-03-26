import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

export default function User() {
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Fitkit
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(""); // New state for success/error message

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setMessage("Username cannot be empty!");
      return;
    }

    const user = { username };

    try {
      const res = await axios.post("http://localhost:5000/users/add", user);
      setMessage("✅ User created successfully!");
      console.log(res.data);
    } catch (error) {
      setMessage("❌ Error creating user. Check backend logs.");
      console.error(error);
    }

    setUsername(""); // Clear input field
  };

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Create User
          </Typography>
          <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="username"
                  name="username"
                  label="Enter username"
                  fullWidth
                  autoComplete="off"
                  value={username}
                  onChange={handleChange}
                />
              </Grid>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className={classes.button}
              >
                Create User
              </Button>
            </Grid>
          </form>
          {message && (
            <Typography variant="body2" style={{ marginTop: "10px", color: "red" }}>
              {message}
            </Typography>
          )}
        </Paper>
      </main>
      <Copyright />
    </React.Fragment>
  );
}

