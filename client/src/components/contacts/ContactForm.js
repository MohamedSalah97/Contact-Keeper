import React,{useState,useContext,useEffect} from "react" ;
import ContactContext from "../../context/contacts/contactContext" ;

const ContactForm = () =>{
    const contactContext = useContext(ContactContext) ;
    const {addContact , current,clearCurrent,updateContact} = contactContext ;

    useEffect(() =>{
        if(current !== null) {
            setContact(current) ;
        }else{
            setContact({
                name:"",
                email:"",
                phone:"",
                type:"personal"
            })
        }
    },[contactContext , current])

    const [contact,setContact] = useState({
        name:"",
        email:"",
        phone:"",
        type:"personal"

    })

    const {name,email,phone,type} = contact ;

    const onChange = (e) => {
        setContact({...contact , [e.target.name] : e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault() ;
        if(current === null){
            addContact(contact) ;
        }else{
            updateContact(contact)
        }
        clearAll();
    }
    
    const clearAll = ()=>{
        clearCurrent() ;
    }

    return(
        <form onSubmit={onSubmit} className="form-group">
            <h3 className="text-primary">{current ? "Update Contact" : "Add Contact"}</h3>
            <input name="name" value={name} onChange={onChange} type="text" placeholder="Name" className="form-control"/>
            <input name="email" value={email} onChange={onChange} type="email" placeholder="Email" className="form-control"/>
            <input name="phone" value={phone} onChange={onChange} type="text" placeholder="Phone" className="form-control"/>
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange}/> Personal{" "}
            <input type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange}/> Professional
            <div style={{margin :"15px 0"}}>
                <input type="submit" value={current ? "Update Contact" : "Add Contact"} className="btn btn-primary btn-block" />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>
                    Clear
                </button>
            </div>}
        </form>
    )
}

export default ContactForm ;