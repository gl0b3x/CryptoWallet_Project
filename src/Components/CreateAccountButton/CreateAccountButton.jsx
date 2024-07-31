import classes from "./CreateAccountButton.module.css";
import { ReactTyped } from "react-typed";

const CreateAccountButton = ({ text, style, loop, speed = 150 }) => {
  return (
    <button className={classes.createAccount} style={style}>
      <ReactTyped
        strings={[text]}
        typeSpeed={speed}
        showCursor={false}
        loop={!!loop}
      />
    </button>
  );
};

export default CreateAccountButton;
