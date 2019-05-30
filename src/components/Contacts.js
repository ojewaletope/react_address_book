import React from  'react';

const Contacts = ({contacts, className, getContactForEdit, deleteContact}) => {
 if (contacts ) {
   return (
     contacts.map((contact) => {
       return (
         <div key={contact.id} className={className}>
           <div className="details_wrapper" onClick={() => getContactForEdit(contact)}>
             <div >Name: {contact.name}</div>
             <div>Phone Number: {contact.phone_number}</div>
             <div>Email: {contact.email}</div>
           </div>
           <i className="del_icon" onClick={() => deleteContact(contact.id)}>&#10006;</i>
         </div>
       )
     })
   )
 } else {
   return (<div>No contacts</div>)
 }
}
export default Contacts