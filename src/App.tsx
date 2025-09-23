import Login from "./components/Login";
import Management from "./components/Management";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
