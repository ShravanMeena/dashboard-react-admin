import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    marginBottom: 50,
  },
  textField: {
    width: "100%",
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();

  const [timeSlots, setTimeSlots] = useState({});

  const [slot, setSlot] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const [timeSlots1, setTimeSlots1] = useState([]);
  const [timeSlots2, setTimeSlots2] = useState([]);
  const [timeSlots3, setTimeSlots3] = useState([]);
  const [timeSlots4, setTimeSlots4] = useState([]);

  const [time, setTime] = useState();
  const [size, setSize] = useState();
  const [winners, setWinners] = useState();

  //   add object
  const save = () => {
    if (!time && !size && !winners) {
      alert("Please fill object all values");
      return;
    }

    var arr = [];
    if (slot === 1) {
      arr = [...timeSlots1];
    }
    if (slot === 2) {
      arr = [...timeSlots2];
    }
    if (slot === 3) {
      arr = [...timeSlots3];
    }
    if (slot === 4) {
      arr = [...timeSlots4];
    }

    var obj = {};
    obj["time"] = time;
    obj["size"] = size;
    obj["winners"] = winners;

    arr.push(obj);

    if (slot === 1) {
      setTimeSlots1(arr);
      setIsAdded(true);
    }
    if (slot === 2) {
      setTimeSlots2(arr);
      setIsAdded(true);
    }
    if (slot === 3) {
      setTimeSlots3(arr);
      setIsAdded(true);
    }
    if (slot === 4) {
      setTimeSlots4(arr);
      setIsAdded(true);
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const reset = () => {
    setTimeSlots([]);
    setTimeSlots1([]);
    setTimeSlots2([]);
    setTimeSlots3([]);
    setTimeSlots4([]);
  };

  const next = () => {
    if (slot <= 4) {
      alert(
        `Don't click Next again Jab Tak Ki Aap Poorane me kuch bhar  na de..! -- -- Slot ${slot} is completed`
      );
      setSlot(slot + 1);
    } else {
      alert("You can't add more than 4 array");
    }
  };

  // for showing final output or view
  const viewOutput = () => {
    var arr = {};
    if (slot === 1) {
      arr = { 1: timeSlots1 };
    }
    if (slot === 2) {
      arr = { 1: timeSlots1, 2: timeSlots2 };
    }
    if (slot === 3) {
      arr = { 1: timeSlots1, 2: timeSlots2, 3: timeSlots3 };
    }
    if (slot >= 4) {
      arr = { 1: timeSlots1, 2: timeSlots2, 3: timeSlots3, 4: timeSlots4 };
    }

    // set time slot for get in custom provider
    localStorage.setItem("time_slots", JSON.stringify(arr));
    setTimeSlots(arr);
  };

  return (
    <div className={classes.root}>
      <span>
        {isAdded ? (
          <p style={{ color: "green", lineHeight: "20px" }}>
            Added object of {slot}
          </p>
        ) : (
          <p style={{ lineHeight: "20px" }} />
        )}
        {/* <p style={{ color: "red", lineHeight: "20px" }}>
          Please Next Jane se Pehle Confrim Kar Len Ki Poorana Slot bhra Hain Ki
          Nahi....Or Agr Galti Ho Jati hain to please RELOAD Karen
        </p> */}

        <TextField
          id="time"
          label="Time"
          type="datetime-local"
          //   defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="size"
          label="Size"
          name="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="winners"
          label="Winners"
          name="winners"
          value={winners}
          onChange={(e) => setWinners(e.target.value)}
        />
        <Button
          style={{ marginTop: 30, marginRight: 20 }}
          variant="outlined"
          onClick={save}
        >
          Add
        </Button>
        <Button
          style={{ marginTop: 30, marginRight: 20 }}
          variant="outlined"
          onClick={viewOutput}
        >
          View
        </Button>
        <Button
          style={{ marginTop: 30, marginRight: 20 }}
          variant="outlined"
          onClick={next}
        >
          Next
        </Button>
        <Button
          style={{ marginTop: 30, marginLeft: 150 }}
          variant="outlined"
          onClick={reset}
        >
          Reset
        </Button>
        <br />
        <h1>Output :</h1>
        <p>{JSON.stringify(timeSlots)}</p>
        <br />
      </span>
    </div>
  );
}
