
import React, { Component } from 'react'
import { Form,option } from 'react-bootstrap';
import '../App.css'
export class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {item:[
            { title:"Have a nice day !"},
            { title:"My name is Deepthi" }
        ],
         title: ' ',
        isUpdate: false,
        isDone: false
    };
        
        
    }
    

    handler = (event) =>{
        let{name, value} = event.target;
        this.setState({ [name] : value})
    }
//calling the function,append the data using spread operator,then calling the id making it empty
    additem = () =>{
        let item = this.state.title;
       
        
        let ap_item = { title: item};
        this.setState({ item: [...this.state.item, ap_item],isDone:false })
        document.getElementById('title').value = "";
        }
        //deleting the item by passing index and splice operation then assigning to items
    deleteitem=(index)=>{
       let items=this.state.item;
       items.splice(index,1);
       this.setState({
           item:items
       });
        
    }

    strike=(index)=>{
        let items=this.state.item;
       items[index].isDone = true;
      this.setState({item:items});
    }

    render() {

        return (
            <div className="container" style={{backgroundColor:"darkgray",height:700}}>
                <h2 style={{fontSize:"50px",color:'brown'}} className='d1'>Todo item</h2>
                
                
                 <Form className='d1'>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label className="text-dark"> Add Todo</Form.Label>
    <Form.Control type="text" name="title"   id="title" placeholder="Add new todo"   onChange={this.handler}/>
  </Form.Group><br/>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label className="text-dark">Prorities</Form.Label>
    <Form.Control as="select">
    <option>1-Lowest</option>
      <option>2-Low</option>
      <option>3-Average</option>
      <option>4-High</option>
      <option>5-Highest</option>
    </Form.Control>
  </Form.Group>
</Form><br/>
              <div className='d1'>
              <button  className='d2' onClick={this.additem.bind(this)}>Submit</button> 
             
              </div>
             
              <br/>
                <table align="center" className="tab" border='1'>
                   
                <tbody>
                {this.state.item.map((item,ind)=>
                <tr key={item.title}>
                  
                    <td style={{color:"black"}}  className={item.isDone?"strick":''}>{item.title}</td>
                   
                    <td><button onClick={this.deleteitem.bind(this,ind)}><img src="b3.jpg"   heigth="25px" width="25px" /></button> 
                    <button onClick={this.strike.bind(this,ind)}>
    <img src="b4.jpg"   heigth="25px" width="25px" />
                   </button></td>
                    </tr>)}</tbody>
            </table>
            </div>
        )
    }
}

export default Todo;