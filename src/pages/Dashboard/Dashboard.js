import { Box, Typography,Card,CardActionArea,CardMedia,CardContent } from "@mui/material";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Dashboard({user}){
  const navigate = useNavigate();
  useEffect(()=>{
    if(user==null){
      navigate("/nologin")
    }
  },[user])
    return (
        <Box sx={{padding:"20px"}}>
           <Typography variant="h4">
            Dashboard
           </Typography>
           <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          component="div"
          sx={{background:"radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);",height:'10px'}}
        />
        <CardContent>
          <Link to="/tickets"> <Typography gutterBottom variant="h5" component="div">
            Open Requests
          </Typography></Link>
          <Typography variant="body2" color="text.secondary">
            12
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card variant="outlined" >
      <CardActionArea>
        <CardMedia
          component="div"
          sx={{background:"radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);",height:'10px'}}
        />
        <CardContent>
        <Link to="/tickets"> <Typography gutterBottom variant="h5" component="div">
            Closed Requests
          </Typography></Link>
          <Typography variant="body2" color="text.secondary">
           34
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </Box>
    )
}
export default Dashboard;