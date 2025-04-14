import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import {axiosInstance} from '../lib/axios.js';


export const useAuthStore=create((set)=>({
    user:null,
    isSigningUp:false,
    isLoggingIn:false,
    isLoggingOut:false,
    isCheckingAuth:true,

    signup:async(data)=>{
        set({isSigningUp:true});
        try{
            const res=await axiosInstance.post('/auth/signup',data);
            set({user:res.data.user});
            toast.success("Account created successfully");
        }catch(e){
            toast.error(e.response.data.message || 'Signup Failed');
        }finally{
            set({isSigningUp:false})
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true});
        try{
            const res=await axiosInstance.post('/auth/login',data);
            set({user:res.data.user});
            toast.success("Logged in successfully");
        }catch(e){
            toast.error(e.response.data.message || 'Login Failed');
        }finally{
            set({isLoggingIn:false});
        }
    },

    logout:async()=>{
        set({isLoggingOut:true});
        try{
            await axiosInstance.post('/auth/logout');
            set({user:null})
            toast.success("Logged out successfully");
        }catch(e){
            toast.error(e.response.data.message || "Logout Failed")
        }finally{
            set({isLoggingOut:false});
        }
    },

    authCheck:async()=>{
        set({isCheckingAuth:true})
        try{
            const res=await axiosInstance.get('/auth/me');
            set({user:res.data.user});
        }catch(e){
            set({user:null})
            console.log(e)
        }finally{
            set({isCheckingAuth:false});
        }
    }

}))