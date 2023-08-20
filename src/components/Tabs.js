import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardList from '../CardList';
import { CardActions, Card, Button, CardContent } from '@mui/material';
import { getAllUsers } from '../APIUrlConstants';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ticketsListData,userDetails}) {
  const [ticketsData, setTicketsData] = React.useState(ticketsListData);
  const [value, setValue] = React.useState(0);
  const [userList,setUserList] = React.useState([]);
  React.useEffect(()=>{
    setTicketsData(ticketsListData);
  },[ticketsListData])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(()=>{
    fetch(getAllUsers, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userDetails.accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserList(data);
      });
  }, []);

  const handleApproval = (user,approval) =>{
    fetch(`${getAllUsers}${user.userId}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userDetails.accessToken,
      },
      body:JSON.stringify({...user,userStatus:approval})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tickets" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <CardList
          ticketsListData={ticketsData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
      {userList.map((user)=>{
        return (
          <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {user.email} : {user.userTypes}
         <br></br>
         status:{user.userStatus}
        </Typography>
      </CardContent>
      {user.userStatus=="PENDING" && <CardActions>
        <Button size="small" onClick={()=>handleApproval(user,"APPROVED")}>Approve</Button>
        <Button size="small"onClick={()=>handleApproval(user,"REJECTED")}>Reject</Button>
      </CardActions>}
    </Card>
        )
      }) }
      </TabPanel>
    </Box>
  );
}