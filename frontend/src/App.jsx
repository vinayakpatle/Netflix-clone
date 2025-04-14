import {Routes,Route,Navigate} from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Footer from "./component/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";


function App() {
  const {user,isCheckingAuth,authCheck}=useAuthStore();

  useEffect(()=>{
    authCheck();
  },[authCheck])

  if(isCheckingAuth){
    return <div className="h-screen">
      <div className="flex items-center justify-center bg-black text-red-500 h-full">
        <Loader className="size-10 animate-spin" />
      </div>
    </div>
  }

  
  return <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
      <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={'/'} />} />
    </Routes>
    <Footer />
    <Toaster />
  </>
}

export default App
