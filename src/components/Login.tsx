import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-1/3 w-1/5 flex-col items-center justify-center gap-5 rounded-lg border border-[#DCD7C9] bg-white shadow-md">
        <h2 className="text-xl font-semibold">Đăng nhập</h2>
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
