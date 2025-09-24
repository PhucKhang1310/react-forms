import Login from "./components/Login";
import Management from "./components/Management";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";

const App = () => {
  return (
    <div>
      
      <Management />
    </div>
    
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Register />} />
    //     <Route path="/management" element={<Management />} />
    //   </Routes>
    // </BrowserRouter>
  );
};
export default App;
