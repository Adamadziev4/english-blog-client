import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Single } from "./pages/Single";
import { Write } from "./pages/Write";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/post/:id" element={<Single />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/write" element={<Write />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
