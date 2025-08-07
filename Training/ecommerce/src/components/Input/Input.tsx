import { type FC, type JSX } from "react";
import style from "./Input.module.scss";

export interface InputProps {
  type: "text" | "number" | "date";
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
}): JSX.Element => {
  return (
    <div style={style}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
