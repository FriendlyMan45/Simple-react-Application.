import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import style from '../componentsStyle/dashborad.module.css';
import DataContext from '../context/DataContext';

function LoginRegister(){
    const {setLoggedStatus} = useContext(DataContext);
    const nagivate = useNavigate();
    const [status,setStatus] = useState('login');
    const [formData,setFormData] = useState({
        email:'',
        password:'',
        confirmPassword:''
    });

    useEffect(()=>{
      setLoggedStatus(false);
    },[setLoggedStatus])

   const handleChange = (e)=>{
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(status);

        if(status === 'login'){
          const response = api.post("/api/CampaignDB/user",formData);
          nagivate('/dashboard');
        }
        else if(status === 'Register'){
           if(formData.password !== formData.confirmPassword){
           return alert('Enter password is not  matching');
           }
        else {
          const response = api.post("/api/CampaignDB/userPost",formData);
          setStatus("Login");
          setFormData({
            email:'',
            password:'',
            confirmPassword:''
          })
        }
    }
  }

    return(
    <>
        <form onSubmit={handleSubmit} className={style.form}>
        <h1>Welcome to FashionTv</h1>
        <h2>{status==='login'? 'Login' : 'Register'}</h2>
            <input 
              type='email'
              name='email'
              value={formData.email}
              placeholder='Email'
              onChange={handleChange}
            />

            <input 
              type='password'
              name='password'
              value={formData.password}
              placeholder='Password'
              onChange={handleChange}
            />

             {status === 'Register' && (
                <input 
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                placeholder='Confirm Password'
                onChange={handleChange}
                />)
             }

             <button type='submit'>{status === 'login'? 'Login' : 'Register'}</button>
             <button type='button' onClick={()=> setStatus(status==='login'?'Register':'login')}>
                {status === 'login' ? 'Register' : 'Login'}</button>

        </form>
    </>
    );
}

export default LoginRegister;