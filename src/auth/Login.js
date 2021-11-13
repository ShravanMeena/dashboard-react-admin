import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useNotify, useRedirect, Loading } from "react-admin";
import { AuthProvider } from "../provider/AuthProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formContainer: {
    paddingTop: 120,
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function MyLoginPage() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  const devicetoken = Math.random().toString(36).substr(2);
  const devicetype = "desktop_web";

  const notify = useNotify();
  const redirect = useRedirect();

  const submit = (e) => {
    e.preventDefault();

    if (username.length !== 10) {
      alert("Please enter your OTP");
      return;
    }

    setLoading(true);

    if (username.length === 10) {
      AuthProvider.login({ username, devicetoken, devicetype })
        .then((res) => {
          setIsSubmit(true);
          setLoading(false);
          return;
        })
        .catch(() => notify("Invalid Mobile Number"));
    } else {
      alert("Provide correct MOBILE NUMBER");
    }
  };

  const submitOtp = (e) => {
    setLoading(true);

    e.preventDefault();
    AuthProvider.login({
      username,
      devicetoken,
      devicetype,
      otpCode,
    })
      .then((res) => {
        redirect("/");
        setLoading(false);
        return;
      })
      .catch(() => notify("Invalid OTP"));
  };

  if (loading) return <Loading />;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        className={classes.formContainer}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <form className={classes.form} noValidate>
            {!isSubmit ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Mobile Number"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="otpCode"
                label="Enter your OTP"
                type="text"
                id="otpCode"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={isSubmit ? submitOtp : submit}
            >
              {isSubmit ? "VERIFY" : "Sign In"}
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
