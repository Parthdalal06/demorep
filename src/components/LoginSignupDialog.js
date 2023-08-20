import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { Fragment } from "react";
import { useState } from "react";

function LoginSignupDialog({open, loginSignup}) {
    const[name,setName]=useState("");
    const[userId,setuserId]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[userType,setuserType]=useState("");
    const [isLogin,setIsLogin] = useState(true);

  return (
    <Dialog open={open}>
      <DialogTitle>Login/Register</DialogTitle>
      <DialogContent>
        <ToggleButtonGroup
          value={isLogin}
          exclusive
          onChange={(event, toggleValue) => {
            if (toggleValue != null) {
              setIsLogin(!isLogin);
            }
          }}
          aria-label='Login/Register dialog'
        >
          <ToggleButton value={true} aria-label='Login User'>
            <Typography>Login</Typography>
          </ToggleButton>
          <ToggleButton value={false} aria-label='Register User'>
            <Typography>Register</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <TextField
          autoFocus
          margin='dense'
          id='username'
          label='Username'
          type='text'
          fullWidth
          variant='standard'
          onChange={(event) => {
            setuserId(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          variant='standard'
          onChange={(event) => {
            setpassword(event.target.value);
          }}
        />
        {!isLogin && (
          <Fragment>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
              variant='standard'
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
              variant='standard'
              onChange={(event) => {
                setemail(event.target.value);
              }}
            />

            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label'>
                User Type
              </FormLabel>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='CUSTOMER'
                name='radio-buttons-group'
                onChange={(event) => {
                  setuserType(event.target.value);
                }}
              >
                <FormControlLabel
                  value='CUSTOMER'
                  control={<Radio />}
                  label='Customer'
                />
                <FormControlLabel
                  value='ENGINEER'
                  control={<Radio />}
                  label='Engineer'
                />
              </RadioGroup>
            </FormControl>
          </Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            console.log(name, userId, userType, password, email);
            loginSignup(isLogin, {
              name: name,
              userId: userId,
              email: email,
              password: password,
              userType: userType,
            });
          }}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default LoginSignupDialog;
