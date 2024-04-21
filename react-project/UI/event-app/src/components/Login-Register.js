import { useContext, useEffect, useState } from 'react';
import api from '../service/api';
import style from '../componentsStyle/dashborad.module.css';
import DataContext from '../context/DataContext';

function LoginRegister(){
    const {setLoggedStatus, nagivate} = useContext(DataContext);
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

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(status);
        if (status === 'login') {
          try {
              const response = await api.post("/api/CampaignDB/user", formData);
              console.log(response);
              sessionStorage.setItem("isLoggedIn", true);
              nagivate('/dashboard'); 
          } catch (error) {
              alert(error.response ? error.response.data : "No response data");
          }
      } else if (status === 'Register') {
          if (formData.password !== formData.confirmPassword) {
              alert('Entered passwords do not match');
          }
          if (formData.email.length !== 0 && formData.password.length !== 0) {
              try {
                  const response = await api.post("/api/CampaignDB/userPost", formData);
                  alert('Please login now');
                  setStatus("Login");
                  setFormData({
                      email: '',
                      password: '',
                      confirmPassword: ''
                  });
              } catch (error) {
                  console.error("Registration error:", error.response ? error.response.data : "No response data");
              }
          } else {
              alert('Please fill in all fields');
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