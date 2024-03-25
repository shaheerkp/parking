import logo from "./logo.svg";
import "./App.css";
import SocketChat from "./SocketChat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/book" element={<div className="App">
          <SocketChat />
        </div>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
