import React, {Component} from "react";
import "./App.css";
import FormInput          from "./components/FornInput";
import toastr             from 'toastr';
import 'toastr/build/toastr.min.css';
import Contacts           from "./components/Contacts";

class App extends Component{
  state = {
    name: "",
    phone_number: "",
    email: "",
    loading: false,
    contacts: [],
    edit: false,
    id: 0,
  };
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  onSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      return toastr.error('Name is required');
    }
    if (!this.state.email) {
      return toastr.error('Email is required');
    }
    if (!this.validateEmail(this.state.email)) {
      console.log(this.state.loading);
      return toastr.error('Email address is not valid');
    }
    if (!this.state.phone_number) {
      return toastr.error('Phone number is required');
    }
    if (isNaN(this.state.phone_number)) {
      return toastr.error('Enter a valid phone number')
    }
    if (this.state.phone_number.length < 11) {
      return toastr.error('Phone number cannot be less than 11 digits')
    }
    this.setState(prevState => {
      return {
        loading: true,
        id: prevState.id + 1
      }
    });
    const user_detail = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone_number
    };
    // check if localstorage is empty;
   let user_contacts;
    if (localStorage.getItem('user_contacts') === null) {
      // set user_details to empty array
      user_contacts = [];
    } else {
      // if not empty, get the user details
      user_contacts = JSON.parse(localStorage.getItem('user_contacts'));
    }
    // add the new user details to the array
    user_contacts.push(user_detail);
    // save in the local storage
    localStorage.setItem('user_contacts', JSON.stringify(user_contacts));
    this.setState({
      contacts: user_contacts,
      loading:false,
      name: '',
      email: '',
      phone_number: ''
    });
    return toastr.success('Details saved successfully');
  };
  getContacts() {
    let contacts = JSON.parse(localStorage.getItem('user_contacts'))
    this.setState({contacts}, () => {
    });
  }
  getContactForEdit = (contact) => {
    this.setState({
      name: contact.name,
      email: contact.email,
      phone_number: contact.phone_number,
      edit: true,
      id: contact.id
    })
  };
  updateContact = (e, index) => {
    e.preventDefault();
    const edited_contact = {
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone_number
    };
    this.state.contacts.splice(index, 1, edited_contact );
    localStorage.setItem('user_contacts', JSON.stringify(this.state.contacts));
    this.setState({
      name: '',
      email: '',
      phone_number: '',
      edit: false
    })
  };
  deleteContact = (i, ) => {
   this.state.contacts.splice(i, 1,);
   localStorage.setItem('user_contacts', JSON.stringify(this.state.contacts));
   this.setState({contacts: this.state.contacts})
  };
  componentDidMount() {
    this.getContacts();
  }
  render() {
    const { name, email, phone_number, loading, contacts, edit, id} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h3>My Address Book</h3>
        </header>
       <div className='form_wrapper'>
         <form>
           <FormInput type='text' placeholder='Enter the name of your contact' value={name} onChange={this.onChange} name="name" className='form_input'/>
           <FormInput type='email' placeholder='Enter the email of your contact' name="email" value={email} onChange={this.onChange} className='form_input'/>
           <FormInput type='tel' placeholder='Enter the number of your contact' name="phone_number" value={phone_number} onChange={this.onChange}  className='form_input'/>
           {!edit ? <button className='form_input form_btn' disabled={loading} onClick={this.onSubmit}>Add</button>:  <button className='form_input form_btn' disabled={loading} onClick={(e)=>this.updateContact(e,id)}>Update</button>}
         </form>
         <Contacts contacts={contacts} className="contacts" getContactForEdit={this.getContactForEdit} deleteContact={this.deleteContact}/>
       </div>
      </div>
    );
  }
}

export default App;
