import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTickets } from "../../APIUrlConstants";
import CardList from "../../CardList";
import BasicTabs from "../../components/Tabs";
import TicketDialog from "../../components/TicketDialog";
import { demoTicketsData } from "../../mockData/ticketsData";

function TicketContainer({ userDetails }) {
  const [ticketsData, setTicketsData] = useState(demoTicketsData);
  const [heading, setHeading] = useState("Tickets");
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetch(getAllTickets, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userDetails.accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTicketsData(data);
      });
  }, []);
  const handleTicket = (isCreate, ticketDetails) => {
    console.log(ticketDetails, isCreate);
    setOpen(!open);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails == null) {
      navigate("/nologin");
    }
  }, [userDetails]);
  return (
    <Box sx={{ padding: "20px" }}>
      <TicketDialog
        open={open}
        handleTicket={handleTicket}
        ticketData={selectedTicket}
      />
      <Button
        variant='outlined'
        onClick={() => {
          setOpen(true);
          setSelectedTicket(null);
        }}
      >
        Create Ticket
      </Button>
      {userDetails?.userTypes != "ADMIN" && (
        <CardList
          ticketsListData={ticketsData}
          setSelectedTicket={(ticket) => {
            setSelectedTicket(ticket);
            setOpen(true);
          }}
        />
      )}
      {userDetails?.userTypes == "ADMIN" && <BasicTabs userDetails={userDetails} ticketsListData={ticketsData}/>}
    </Box>
  );
}
export default TicketContainer;
