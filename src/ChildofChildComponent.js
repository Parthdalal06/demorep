function ChildofChildComponent (props){
    return(
            <div style={{border:"1px solid green",margin:"5px"}}>
                this is a child component of child component and my name is {props.myFullName}
            </div>
        )
}
export default ChildofChildComponent;