import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./layout/DashBoard";
import Home from "./Pages/Home";
import DataInfo from "./Pages/DataInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashBoard />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/searched-info" element={<DataInfo />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
