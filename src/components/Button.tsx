import styles from "../styles/button.module.css";
interface ButtonProps {
  label: string;
  variant: "solid" | "transparent";
  textAlign?: "left";
}

const Button = ({ label, variant, textAlign }: ButtonProps) => {
  return (
    <div>
      <button className={`${styles.button} ${textAlign ? styles[textAlign] : ""} ${styles[variant]}`}>{label}</button>
    </div>
  );
};
export default Button;
