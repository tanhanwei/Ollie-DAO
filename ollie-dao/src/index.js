import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./routes/create";
import Explore from "./routes/explore";
import Dao from "./routes/dao";
import Proposal from "./routes/proposal";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/explore" element={<Explore />}></Route>
      <Route path="/dao/:daoAddress" element={<Dao />}></Route>
      <Route path="/dao/:daoAddress/:proposalId" element={<Proposal />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
