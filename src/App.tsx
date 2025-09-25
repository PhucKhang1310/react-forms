import { BrowserRouter, Route, Routes } from "react-router-dom";
import Management from "./components/Management";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import AntTable from "./components/AntTable";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/management" element={<Management />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />
        <Route path="/test" element={<AntTable />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
