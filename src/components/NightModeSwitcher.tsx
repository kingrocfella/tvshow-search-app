import React from "react";
import Switch from "@material-ui/core/Switch";
import { IToggle } from "../interfaces/index";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function NightModeToggle(switchState: IToggle) {
  const [state, setState] = React.useState({
    switchCTRL: switchState.initMode,
    handler: switchState.modeHandler,
    text: switchState.text
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
    state.handler();
  };

  return (
    <FormControlLabel
      checked={state.switchCTRL}
      control={
        <Switch onChange={handleChange} name="switchCTRL" style={{color: "green"}} />
      }
      label={state.text}
    />
  );
}
