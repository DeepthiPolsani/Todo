import React from "react";
import axios from "axios";


const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
class Login extends React.Component {
constructor(props) {
super(props);
this.state = { Login:[],email: null, password:null,errors:{
    email:'',
    password:''
} };
}
handle=(event)=> {
    const {id,value}= event.target;
            let errors=this.state.errors;


switch(id){
    case 'email': errors.email = regForEmail.test(value)?'':'Enter Email correctly'
    break;
    case 'password': errors.password = value.length < 8?'Password must contain atleast 8 characters':''
    break;
    default:
        break;
}
this.setState({[id]:value, errors});
}
componentDidMount=async()=>{
    try{
    const URL="http://localhost:3001/Login" 
    const res=await axios.get(URL);
    this.setState({Login:res.data})
}
catch(err){
    console.log(err)
}
}
onSubmit = async(event)=> {
event.preventDefault();
let {Login}=this.state;
if (Login.find(x=>x.email === this.state.email) && Login.find(x=>x.password === this.state.password)) {
    alert('Login successful');
this.props.history.push("/todo");
} else {
alert('Enter valid details');
}
}
render() {
    const {errors} = this.state;
return (
<div className="d1" style={{backgroundColor:"darkgray",height:700}}>
    <div className="container jumbotron mt-5 ">
<form onSubmit={this.onSubmit}>
    <h2 style={{color:'brown'}}>Login Form</h2>
<div className="row " style={{padding:"15px"}}>
            <label  className=" col-lg-2">   Email : </label>
           <input type="text" id="email" className="col-lg-2"  value={this.state.email}
onChange={this.handle.bind()} required /> {errors.email.length>0 && 
            <span style={{color:'red'}}>{errors.email}</span>}
           
           </div>
<div className="row" style={{padding:"15px"}}>
            <label  className=" col-lg-2">Password : </label>
            <input type="password" id="password"  className="col-lg-2" value={this.state.password}
onChange={this.handle.bind()} required/>
            {errors.password.length>0 && 
            <span style={{color:'red'}}>{errors.password}</span>}</div>
            <input type="submit" value="Login" className=" btn btn-primary col-md-3  d2"/>
            </form>
            </div>
</div>
);
}
}
export default Login;