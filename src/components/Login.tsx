import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-5 rounded-sm border border-[#DCD7C9] bg-white w-1/5 h-1/3 shadow-md">
        <h2 className="text-xl font-semibold">Đăng nhập</h2>
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
