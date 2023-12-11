import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faStopCircle } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const timerRef = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  const [inputMinutes, setInputMinutes] = useState("00");

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (endTime) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(
        `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
      );
    }
  };

  const clearTimer = () => {
    setTimer("00:00:00");

    if (timerRef.current) clearInterval(timerRef.current);
  };

  const getDeadline = (minutes) => {
    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + parseInt(minutes, 10));
    return deadline;
  };

  const handleInputChange = (e) => {
    setInputMinutes(e.target.value);
    clearTimer();
  };

  const onClickStart = () => {
    clearTimer();
    const deadline = getDeadline(inputMinutes);
    startTimer(deadline);

    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);

    timerRef.current = id;
  };

  const onClickStop = () => {
    clearTimer();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "rgb(14 14 14 / 90%)", color: "white" }}>
      <h3 style={{ textAlign: "center", width: "300px" ,color:"#0080ffa6"}}>Enter Minutes</h3>
      <div style={{ textAlign: "center", width: "300px" }}>
        <input
          type="number"
          value={inputMinutes}
          onChange={handleInputChange}
          placeholder="Enter time in minutes"
          style={{
            marginBottom: "20px",
            padding: "12px",
            font: "inherit",
            color: "white",
            backgroundColor: "rgb(14 14 14 / 90%)",
            border: "1px solid #555",
            borderRadius: "5px",
            width: "100%",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FontAwesomeIcon icon={faPlayCircle} onClick={onClickStart} style={{ fontSize: "40px", color: "#0080ffa6", cursor: "pointer" }} />
          <FontAwesomeIcon icon={faStopCircle} onClick={onClickStop} style={{ fontSize: "40px", color: "#0080ffa6", cursor: "pointer" }} />
        </div>
        <h1 style={{ color: "#0080ffa6", marginTop: "10px" }}>{timer}</h1>
        </div>
      </div>
    
  );
};

export default App;
