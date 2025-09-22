import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import styles from "../styles/login.module.css";
import LoginInput from "./LoginInput";
const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch({ type: "account/login", payload: { username, email } });
  };
  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.login}`}>
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
