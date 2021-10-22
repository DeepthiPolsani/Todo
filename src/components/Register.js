import React, { Component } from 'react'
import axios from 'axios';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            Regist:[],
            firstid:null,
            lastid:null,
            userid:null,
            email:null,
            password:null,
            cnfpassword:null,
            id:null,
            errors:{
                firstid:'',
                lastid:'',
                userid:'',
                email:'',
                password:'',
                cnfpassword:'',
                
            }
        }
    }
    componentDidMount=async()=>{
        try{
        const URL="http://localhost:3001/Login"
        const res=await axios.get(URL);
        this.setState({Regist:res.data})
    }
    catch(err){
        console.log(err)
    }
}
        handler=(event)=>{
            const {id,value}=event.target;
            let errors=this.state.errors;
            switch(id){
                case 'firstid':
                    errors.firstid=value.length<3?'firstid is not valid':'';
                    break;
                case 'lastid':
                    errors.lastid=value.length<2?'lastid is not valid':'';
                    break;
                case 'userid':
                    errors.userid=value.length<5?'enter userid correctly':'';
                    break;    
                case 'email':
                    errors.email=regForEmail.test(value)?'':'Email is not valid';
                    break;
                case 'password':
                        errors.password=value.length<8?'Password must me 8 chanrater long':'';
                        break;
                case 'cnfpassword':
                        errors.cnfpassword=value!==this.state.password?'Password is not matched':'';
                        break;
                
                default:        
                    break;
            }
            this.setState({errors,[id]:value},()=>{
                console.log(errors)
            })
        }
        add=async(event)=>{
            event.preventDefault();
            let formData={firstid:this.state.firstid, lastid:this.state.lastid,
            userid:this.state.userid, email:this.state.email,password:this.state.password,cnfpassword:this.state.cnfpassword};
            try{
            const URL="http://localhost:3001/Login";
               const resData=await axios.post(URL,formData)
                const res=await axios.get(URL)
                this.setState({Regist:res.data,firstid:'', lastid:'',userid:'',email:'',password:'',cnfpassword:''})
                alert("Registered sucessfully")
                this.props.history.push("/login");
            }
            catch(err){
                console.log(err)
            }
        }
       
    render() {
        const {errors}=this.state;
        return (
            
            <div className="d1" style={{backgroundColor:"darkgray",height:700}}>
            <div className="con container jumbotron " >
            <h2 style={{color:'brown'}}>Registration Form</h2>
                <form onSubmit={this.add} style={{padding:"10px"}} validate>
                   <div className="row" style={{padding:"10px"}}>
                <label className=" col-lg-2">    Firstid : </label> 
            <input type="text" id="firstid" className="col-lg-2" onChange={this.handler} required/> 
            {errors.firstid.length>0 && 
            <span style={{color:'red'}}>{errors.firstid}</span>}</div>
             <label className="col-lg-2">    Lastid : </label> 
            <input type="text" id="lastid" className="col-lg-2" onChange={this.handler} required/> 
            {errors.lastid.length>0 && 
            <span style={{color:'red'}}>{errors.lastid}</span>}<br/> 
            <div className="row " style={{padding:"10px"}}>
             <label className=" col-lg-2">  Userid :</label> 
            <input type="text" id="userid" className="col-lg-2  " onChange={this.handler} required/> 
            {errors.userid.length>0 && 
            <span style={{color:'red'}}>{errors.userid}</span>}
            </div>
                       <div className="row " style={{padding:"10px"}}>
            <label  className=" col-lg-2">   Email  : </label>
           <input type="text" id="email" className="col-lg-2"  onChange={this.handler} required/> {errors.email.length>0 && 
            <span style={{color:'red'}}>{errors.email}</span>}
           
           </div>
                       <div className="row" style={{padding:"10px"}}>
            <label  className=" col-lg-2">Password   : </label>
            <input type="password" id="password"  className="col-lg-2" onChange={this.handler} required/>
            {errors.password.length>0 && 
            <span style={{color:'red'}}>{errors.password}</span>}</div>
              <div className="row" style={{padding:"10px"}}>
            <label  className=" col-lg-2"> ConfirmPassword:</label>
            <input type="password" id="cnfpassword" className=" col-lg-2" onChange={this.handler} required/>
            {errors.cnfpassword.length>0 && 
            <span style={{color:'red'}}>{errors.cnfpassword}</span>}<br/></div>
                       
            <input type="submit" value="Register" className=" btn btn-primary col-md-3  d2"/>
           
            </form>
                
            </div>
           
            </div>
        )
    }
}

export default Register
