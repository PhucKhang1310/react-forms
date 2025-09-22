import styles from "../styles/loginInput.module.css"

interface LoginInputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const LoginInput = ({ label, type, placeholder, value, onChange }: LoginInputProps) => {
  return (
    <div className={styles.input}>
        <label>{label}</label>
        <input value={value} onChange={onChange} type={type} placeholder={placeholder} />
    </div>
  );
}
export default LoginInput