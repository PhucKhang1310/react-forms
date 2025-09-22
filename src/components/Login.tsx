import styles from "../styles/login.module.css";
import Button from "./Button";
import LoginInput from "./LoginInput";
const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.login}`}>
        <h2>Đăng nhập</h2>
        <form action="">
          <LoginInput label="Tên" type="text" placeholder="placeholder" />
          <LoginInput
            label="Mật khẩu"
            type="password"
            placeholder="placeholder"
          />
        </form>
        <Button label="Đăng nhập" variant="solid" />
      </div>
    </div>
  );
};
export default Login;
