import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";



function SocketChat() {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data (e.g., send it to a server)
    setConfirm(true);
  };

  const handleLogout=()=>{
    navigate(`/`)
    localStorage.removeItem(`user`)
  }

  const openForm = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const openConfirm = () => {
    setConfirm(true);
  };

  const closeConfirm = () => {
    setConfirm(false);
  };

  const closeForm = () => {
    setOpen(false);
    setIndex(null);
  };

  useEffect(() => {

    let isAuth =localStorage.getItem(`user`)
    if(!isAuth){
      navigate(`/`)
    }
    const soc = io.connect("http://localhost:5000");
    setSocket(soc);
    socket?.on("connect", () => {
      console.log("connected");
      socket.send("User connected!");
    });
    socket?.on("message", (data) => {
      setData(data);
      let target = document.getElementById("messages");
      target.innerHTML = "";
      // data.forEach((element, i) => {
      //   let newDiv = document.createElement("div");
      //   newDiv.id = "newDiv" + i;

      //   newDiv.style.height = "30px";
      //   newDiv.style.width = "30px";
      //   newDiv.style.backgroundColor = `${data[i] === true ? "green" : "red"}`;
      //   newDiv.style.marginRight = "10px";

      //   target.appendChild(newDiv);
      // });
    });
    return () => {
      socket?.disconnect();
    };
  }, [data]);

  const handleSend = () => {
    socket?.send(`${"asdas"}: ${"message"}`);
    setMessage("");
    setData([false]);
  };

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <div
        id="messages"
        style={{ display: "flex", marginBottom: "10px" }}
      ></div>
      <button
        id="sendBtn"
        onClick={handleSend}
        className="btn btn-secondary btn-block " 
        style={{cursor:`pointer`,margin:10}}
      >
        BOOK NOW
      </button>

      <button
        id="sendBtn"
        onClick={handleLogout}
        className="btn btn-secondary btn-block " 
        style={{cursor:`pointer`}}
      >
        LOGOUT
      </button>
      
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 250,
          paddingRight: 250,
          paddingTop: 50,
        }}
      >
        {data.map((ele, i) => {
          return (
            <div
              key={i}
              onClick={() => !ele && openForm(i)}
              style={
                ele
                  ? { width: 50, height: 50, backgroundColor: "red" }
                  : {
                      width: 50,
                      height: 50,
                      backgroundColor: "green",
                      cursor: "pointer",
                    }
              }
            >
              {i}
            </div>
          );
        })}
      </div>

      <Dialog
        open={open}
        onClose={closeForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Book Your slot"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputContainerStyle}>
              <label htmlFor="name" style={labelStyle}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label htmlFor="vehicleNo" style={labelStyle}>
                Vehicle No:
              </label>
              <input
                type="text"
                id="vehicleNo"
                value={vehicleNo}
                required
                onChange={(e) => setVehicleNo(e.target.value)}
                style={inputStyle}
              />
            </div>
            <button type="submit" style={submitButtonStyle}>
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirm}
        onClose={closeConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          Slot Booked
          <h5>Name: {name}</h5>
          <h5>vehicleNo: {vehicleNo}</h5>
          <h5>Slot: {index}</h5>
          <button
            onClick={() => {
              setName("");
              setVehicleNo("");
              setConfirm(false);
              setOpen(false);
            }}
            type="submit"
            style={submitButtonStyle}
          >
            Done
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "300px",
  margin: "0 auto",
};

const inputContainerStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  marginBottom: "5px",
  fontSize: "16px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const submitButtonStyle = {
  padding: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default SocketChat;
