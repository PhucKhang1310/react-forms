import { useState, type FormEvent } from "react";
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import { useAppDispatch } from "../app/hooks";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: "account/login", payload: { username, email } });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center justify-center gap-5 px-10"
    >
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
      <LoginButton label="Đăng nhập" />
    </form>
  );
};
export default LoginForm;
