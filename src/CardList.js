import { Button, Card, CardContent, Typography,ToggleButton,ToggleButtonGroup } from "@mui/material";
import { Component, Fragment, useEffect, useState } from "react";

function CardList({ticketsListData,setSelectedTicket}) {
    const [listData,setListData] = useState(ticketsListData);
    const [filterStatus,setFilterStatus] = useState("OPEN")
  const handlefilterStatus = (event, newFilterStatus) =>{
    setFilterStatus(newFilterStatus)
  }
  useEffect(()=>{
setListData(ticketsListData);
  },[ticketsListData])
    return (
        <Fragment>
             <ToggleButtonGroup
      value={filterStatus}
      exclusive
      onChange={handlefilterStatus}
      aria-label="tickets status"
    >
      <ToggleButton value="OPEN" aria-label="open tickets">
        <Typography>OPEN</Typography>
      </ToggleButton>
      <ToggleButton value="CLOSED" aria-label="closed tickets">
      <Typography>CLOSED</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
          {listData.filter((data)=>data.status == filterStatus).map((ticket) => {
            return (
              <Card key={ticket.id} variant='outlined' onClick={()=>{setSelectedTicket(ticket)}}>
                <CardContent className="cardContent">
                  <Typography variant='h5' component='div'>
                    {ticket.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    Reported By:{ticket.reportedBy} Assignee:{ticket.assignee}
                  </Typography>
                  <Typography variant='body2'>
                    {ticket.description}
                    <br />
                  </Typography>
                  <Typography variant='body2'>
                    Status: {ticket.status}
                  
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Fragment>
      );
  
}
export default CardList;
