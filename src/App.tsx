import { BrowserRouter, Route, Routes } from "react-router-dom";
import Management from "./components/Management";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./components/Error";
import ItemManagement from "./components/ItemManagement";
import ItemForm from "./components/ItemForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="management" element={<Management />} />
          <Route path="items" element={<ItemManagement />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<ItemForm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
