import React ,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'

const SignupPage = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");

    const handleSignup=(e)=>{
        e.preventDefault();
        console.log(email,password,username);
    }

  return (
    <div className='h-screen w-full hero-bg'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 '>
            <Link to={"/"}>
                <img src="/netflix-logo.png" alt='logo' className='w-52' />
            </Link>
        </header>
        <div className='flex items-center justify-center mt-20 mx-3'>
            <div className='w-full max-w-md bg-black/60 space-y-6 rounded-lg shadow-md p-8'>
                <h1 className='text-center text-white font-bold text-2xl mb-4'>
                    Sign Up
                </h1>
                <form onSubmit={handleSignup} className='space-y-4' >
                    <div>
                        <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                            Email
                        </label>
                        <input
                            type='email'
                            className='w-full mt-1 py-2 px-3 rounded-md border border-gray-700 bg-transparent text-white focus:outline-none focus:ring'
                            placeholder='you@example.com'
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            id='email'
                        />
                    </div>
                    <div>
                        <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
                            Username
                        </label>
                        <input
                            type='text'
                            className='w-full mt-1 py-2 px-3 rounded-md border border-gray-700 bg-transparent text-white focus:outline-none focus:ring'
                            placeholder='vinayak patle'
                            value={username}
                            onChange={e=>setUsername(e.target.value)}
                            id='username'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                            Password
                        </label>
                        <input
                            type='password'
                            className='w-full mt-1 py-2 px-3 rounded-md border border-gray-700 bg-transparent text-white focus:outline-none focus:ring'
                            placeholder='••••••••'
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            id='password'
                        />
                    </div>

                    <button disabled={false} className='w-full bg-red-600 text-white font-semibold rounded-md py-2 hover:bg-red-700 focus:ring'>
                        Sign Up
                    </button>
                </form>
                <div className='text-gray-400 text-center'>
                    Already a member?{" "}
                    <Link to="/login" className='text-red-500 hover:underline'>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignupPage;