import { type FC, type JSX, type ReactNode } from "react";
import style from "./Button.module.scss";

export interface ButtonProp {
  children: ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProp> = ({ children, onClick }): JSX.Element => {
  return (
    <button className={style.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
