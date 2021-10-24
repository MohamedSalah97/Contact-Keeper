import React,{useState,useContext,useEffect} from "react" ; 
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props =>{
    const authContext = useContext(AuthContext) ;
    const alertContext = useContext(AlertContext) ;

    const {login,error,clearErrors,isAuthenticated} = authContext ;
    const {setAlert} = alertContext ;

    useEffect(()=>{
        if(isAuthenticate){
            props.history.push("/") ;
        }

        if(error === "invalid credintials"){ 
            setAlert(error,"danger");
            clearErrors() ;
        }
        // eslint-disable-next-line 
    },[error,isAuthenticate,props.history])

    const[user,setUser] = useState({
        email:"",
        password:"" 
    })

    const{name,email,password,password2} = user ;

    const onChange = (e) => {
        setUser({...user , [e.target.name] : e.target.value})
    }


    const onSubmit= e =>{
        e.preventDefault();
        if(email ==="" || password ===""){
            setAlert("Please fill all fields" , "danger")
        } else{
            login({
                email,
                password
            })
        }
        
    }

 return(
     <div className="form-container">
         <h1 className="register">Account Login</h1>
         <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input name="email" value={email} onChange={onChange} type="email"  className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input name="password" value={password} onChange={onChange} type="password"  className="form-control"/>
            </div>
            <input type="submit" value="Login" className="btn btn-primary btn-block" />
         </form>

     </div>
 )
}

export default Login 