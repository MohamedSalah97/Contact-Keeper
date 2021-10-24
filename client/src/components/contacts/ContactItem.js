import React,{useContext} from "react" ;
import PropTypes from"prop-types";
import ContactContext from "../../context/contacts/contactContext" ;

const ContactItem = ({contact}) =>{
    const contactContext = useContext(ContactContext);
    const {name ,_id,email,phone,type} = contact ;

    const onDelete = e => {
        e.preventDefault();
        contactContext.deleteContact(_id);
        contactContext.clearCurrent();
    }

    return(
        <div className="card bg-light">
            <div className="body">
                <h4 className="text-primary text left">
                    {name}{" "}<span style={{float : 'right'}} className={"badge " + (type === "professional" ? "badge-success" : "badge-primary") }> 
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                </h4>
                <ul className="list">
                    {email && (
                        <li><i className="fas fa-envelope-open"/> {email}</li>
                    )}
                    {phone && (
                        <li><i className="fas fa-phone"/> {phone}</li>
                    )}
                </ul>
                <p>
                    <button className="btn btn-dark btn-small" onClick={() => contactContext.setCurrent(contact)}>Edit</button> {"  "}
                    <button className="btn btn-danger btn-small" onClick={onDelete}>Delete</button>
                </p>
            </div>
        </div>
    )
}

ContactItem.propTypes={
    contact: PropTypes.object.isRequired 
}

export default ContactItem ;