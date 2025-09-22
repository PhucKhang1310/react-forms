import styles from "../styles/loginInput.module.css"

interface LoginInputProps {
    label: string;
    type: string;
    placeholder: string;
}


const LoginInput = ({ label, type, placeholder }: LoginInputProps) => {
  return (
    <div className={styles.input}>
        <label>{label}</label>
        <input type={type} placeholder={placeholder} />
    </div>
  );
}
export default LoginInput