import { BrowserRouter, Route, Routes } from "react-router-dom";
import Management from "./components/Management";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/management" element={<Management />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
