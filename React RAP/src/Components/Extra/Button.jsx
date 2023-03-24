import { Button } from "@mui/material";
import "../styles/components/Button.scss";

export const LinkButton = (props) => {
  return (
    <Button
      className={`linkbutton${props.dense ? "-dense" : ""} ${props.className}`}
      variant="text"
      disableRipple={true}
      href={props.url}
    >
      {props.children}
    </Button>
  );
};

export const CustomButton = (props) => {
  return (
    <Button
      className={`custombutton ${props.className}`}
      type={props.type ? props.type : ""}
      disableRipple={true}
      variant="contained"
      onClick={props.onClick}
      style={props.style ? props.style : ""}
      size={props.size ? props.size : ""}
      href={props.url}
    >
      {props.children}
    </Button>
  );
};
