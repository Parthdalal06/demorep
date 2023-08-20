import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";

function ProfileContainer({userDetails}) {
    const[name,setName]=useState(userDetails?.name);
    const[userId,setuserId]=useState(userDetails?.userId);
    const[email,setemail]=useState(userDetails?.email);
    const[userType,setuserType]=useState(userDetails?.userType);

    const navigate = useNavigate();

    useEffect(()=>{
      if(userDetails==null){
        navigate("/nologin")
      }
    },[userDetails])
  return (
    <Box sx={{ padding: "20px" }}>
        <Typography variant="h3">Welcome {userDetails?.name}</Typography>
      <TextField
        autoFocus
        margin='dense'
        id='username'
        label='Username'
        type='text'
        value={userId}
        fullWidth
        variant='standard'
        onChange={(event) => {
          setuserId(event.target.value);
        }}
      />

      <Fragment>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Name'
          type='text'
          fullWidth
          value={name}
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
          value={email}
          variant='standard'
          onChange={(event) => {
            setemail(event.target.value);
          }}
        />

        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>User Type</FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='customer'
            name='radio-buttons-group'
            value={userType}
            onChange={(event) => {
              setuserType(event.target.value);
            }}
          >
            <FormControlLabel
              value='customer'
              control={<Radio />}
              label='Customer'
            />
            <FormControlLabel
              value='engineer'
              control={<Radio />}
              label='Engineer'
            />
          </RadioGroup>
        </FormControl>
      </Fragment>
    </Box>
  );
}
ProfileContainer.defaultProps = {
  userDetails: null,
};
export default ProfileContainer;
