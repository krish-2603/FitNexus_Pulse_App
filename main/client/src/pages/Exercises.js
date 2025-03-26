import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default function Exercises() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data); // ✅ Store full user objects
          setUsername(response.data[0].username); // ✅ Default to first user
        }
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setMessage("❌ Please select a user before adding an exercise.");
      return;
    }

    const exercise = {
      username,
      description,
      duration: Number(duration),
      date: new Date(date),
    };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => {
        console.log(res.data);
        setMessage("✅ Exercise added successfully!");
      })
      .catch((error) => {
        console.error(error);
        setMessage("❌ Error adding exercise. Check backend.");
      });

    setDescription("");
    setDuration(0);
    setDate(new Date().toISOString().split("T")[0]);
  };

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

  const useStyles = makeStyles((theme) => ({
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
            Record Fitness Activity
          </Typography>
          <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Select
                  required
                  fullWidth
                  value={username}
                  onChange={onChangeUsername}
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user.username}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  label="Enter the activity name"
                  fullWidth
                  value={description}
                  onChange={onChangeDescription}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  label="Enter duration (in minutes)"
                  fullWidth
                  type="number"
                  value={duration}
                  onChange={onChangeDuration}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date}
                  onChange={onChangeDate}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Add Record
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
