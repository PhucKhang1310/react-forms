import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import LoginInput from "./LoginInput";
const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch({ type: "account/login", payload: { username, email } });
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-5 rounded-sm border border-[#DCD7C9] bg-white p-10 shadow-md">
        <h2>Đăng nhập</h2>
        <form action="">
          <LoginInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Tên"
            type="text"
            placeholder="placeholder"
          />
          <LoginInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Mật khẩu"
            type="password"
            placeholder="placeholder"
          />
        </form>
        <button onClick={() => handleLogin()}>Đăng nhập</button>
      </div>
    </div>
  );
};
export default Login;
