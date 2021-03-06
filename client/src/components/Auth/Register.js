import React,{useState,useContext,useEffect} from "react" ; 
import AlertContext from "../../context/alert/alertContext" ;
import AuthContext from "../../context/auth/authContext" ;

const Register = props =>{
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext) ;
    const {setAlert}  = alertContext ;
    const {register,error , clearErrors,isAuthenticate} = authContext ;

    useEffect(()=>{
        if(isAuthenticate){
            props.history.push("/") ;
        }

        if(error === "user already exists"){ 
            setAlert(error,"danger"); 
            clearErrors() ;
        }
        // eslint-disable-next-line 
    },[error,isAuthenticate,props.history])

    const[user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    })

    const{name,email,password,password2} = user ;

    const onChange = (e) => {
        setUser({...user , [e.target.name] : e.target.value})
    }


    const onSubmit= e =>{
        e.preventDefault();
        if(name === "" || email==="" || password === ""){
            setAlert("Please enter all fields","danger")
        }else if(password !== password2){
            setAlert("Password don't match","danger")
        }else{
            register({
                name,
                email,
                password
            });
            setUser({
                name:"",
                email:"",
                password:"",
                password2:""
            })
        }
        
    }

 return(
     <div className="form-container">
         <h1 className="register">Account Register</h1>
         <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input name="name" value={name} onChange={onChange} type="text"  className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input name="email" value={email} onChange={onChange} type="email"  className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input name="password" value={password} onChange={onChange} type="password"  className="form-control" required minLength="6"/>
            </div>
            <div className="form-group">
                <label htmlFor="password2">Comfirm Password</label>
                <input name="password2" value={password2} onChange={onChange} type="password"  className="form-control" required minLength="6"/>
            </div>
            <input type="submit" value="Submit" className="btn btn-primary btn-block" />
         </form>

     </div>
 )
}

export default Register ;