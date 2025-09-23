import { useAppSelector } from "./app/hooks";
import FormPopup from "./components/FormPopup";
import Login from "./components/Login";
import Management from "./components/Management";

const App = () => {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  return (
    <div>
      {/* {!isLoggedIn && <Login />}
      {isLoggedIn && <Management />} */}
      {/* <FormPopup /> */}
      <Management />
    </div>
  );
};
export default App;
