import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-1/2 w-1/5 flex-col items-center justify-center gap-5 rounded-sm border border-[#DCD7C9] bg-white shadow-md">
        <h2 className="text-xl font-semibold">Đăng ký</h2>
        <RegisterForm />
      </div>
    </div>
  );
};
export default Register;
