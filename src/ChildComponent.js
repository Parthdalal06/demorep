import { Component } from "react";
import ChildofChildComponent from "./ChildofChildComponent";

class ChildComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            fullName:`${this.props.name} ${this.props.surname}`
        }
    }
    render(){
        return(
            <div style={{border:"1px solid red",margin:"5px"}}>
                <p>this is a child component of app component and my name is {this.state.fullName}{this.props.name}{this.props.surname}</p>
                <ChildofChildComponent myFullName={`${this.props.name} ${this.props.surname}`} />
            </div>
           
        )
    }
}
export default ChildComponent;