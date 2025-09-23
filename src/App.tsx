import { useAppSelector } from "./app/hooks";
import FormPopup from "./components/PopupForm";
import Login from "./components/Login";
import Management from "./components/Management";

const App = () => {
  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn);
  return (
    <div>
      <Management />
    </div>
  );
};
export default App;
