import React , {useReducer} from 'react' ;
import axios from "axios" ;
import AuthContext from "./authContext";
import authReaducer from "./authReducer" ;
import setAuthToken from "../../utils/setTokenAuth";
import {REGISTER_SUCCESS,REGISTER_FAILED,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAILED,LOGOUT,CLEAR_ERRORS} from "../types" ;

const AuthState = props =>{
    
    const initialState = {
        token : localStorage.getItem("token") ,
        isAuthenticated : null,
        loading:true,
        error:null,
        user: null
    }

    const[state,dispatch] = useReducer(authReaducer,initialState) ;

    // load user
    const loadUser = async () =>{
        if(localStorage.token){
            setAuthToken(localStorage.token) ;
        }

        try {
            const res = await axios.get("/api/auth") ;
            dispatch({type: USER_LOADED , payload: res.data})
        } catch (err) {
            dispatch({type : AUTH_ERROR}) 
        }
    }

    //register user 
    const register = async (formData) =>{
        const config ={
            headers:{
                "content-type" : "application/json" 
            }
        }

        try {
            const res = await axios.post("/api/users",formData,config) ;

            dispatch({
                type: REGISTER_SUCCESS,
                payload : res.data
            })
            
            loadUser() ;

        } catch (err) {
            dispatch({
                type: LOGIN_FAILED,
                payload : err.response.data.msg
            })
        }
    }

    // clear errors  
    const clearErrors = () => {
        dispatch({type : CLEAR_ERRORS})
    }

    // login user
    const login = async formData =>{
        const config ={
            headers:{
                "content-type" : "application/json" 
            }
        }

        try {
            const res = await axios.post("/api/auth",formData,config) ;

            dispatch({
                type: LOGIN_SUCCESS,
                payload : res.data
            })
            
            loadUser() ;

        } catch (err) {
            dispatch({
                type: REGISTER_FAILED,
                payload : err.response.data.msg
            })
        }
    }

    // logout
    const logout = () => {
        dispatch({
            type:LOGOUT
        })
    }

   
    return(
        <AuthContext.Provider
            value={{
                token : state.token ,
                isAuthenticated : state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
                register,clearErrors,
                loadUser,login,logout
            }}
        >  
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState ;