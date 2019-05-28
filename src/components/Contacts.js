import React from  'react';

const Contacts = ({contacts, className, getContactForEdit, deleteContact}) => {
  return (
    contacts.map((contact, index) => {
      return (
        <div key={index} className={className} onClick={() => getContactForEdit(contact)}>
         <div className="details_wrapper">
           <div >Name: {contact.name}</div>
           <div>Phone Number: {contact.phone_number}</div>
           <div>Email: {contact.email}</div>
         </div>
          <i className="del_icon" onClick={() => deleteContact(index)}>&#10006;</i>
        </div>
      )
    })
  )
}
export default Contacts