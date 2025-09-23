import { useState } from "react";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

interface FormPopupProps {
  defaultValues?: {
    name: string;
    email: string;
  };
  buttonLabel?: string;
  handleSubmit: (e: React.FormEvent, account: any) => void;
}

const FormPopup = ({ defaultValues = {name: "", email: ""}, buttonLabel = "Create account", handleSubmit }: FormPopupProps) => {
  const [account, setAccount] = useState({
    ...defaultValues
  })

  return (
    <div className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="flex h-1/3 w-1/5 flex-col items-center justify-center rounded-sm border border-[#DCD7C9] bg-white">
      <h1 className="font-semibold mb-10">Add new account</h1>
        <form className="flex flex-col items-start gap-3" onSubmit={(e) => handleSubmit(e, account)}>
          <LoginInput
            label="Name"
            type="text"
            placeholder="Name"
            value={account.name}
            onChange={(e) => {
              setAccount({ ...account, name: e.target.value });
            }}
          />
          <LoginInput
            label="Email"
            type="text"
            placeholder="Email"
            value={account.email}
            onChange={(e) => {
              setAccount({ ...account, email: e.target.value });
            }}
          />
          <LoginButton label={buttonLabel} />
        </form>
      </div>
    </div>
  );
};
export default FormPopup;
