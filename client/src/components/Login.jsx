import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import "../CSS/Login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();
        if(email==="" || password===""){
            return alert("Input Field Empty");
        }
        const data = await fetch("https://attendance-tracker04.herokuapp.com/login",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        })

        const res = await data.json();
        console.log(res);
        if(res.token){
            localStorage.setItem("token",res.token);
            console.log(res.token);
            navigate("/");
        }else{
            return alert(res.message);
        }
    }
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput className='text-white' wrapperClass='mb-4 mx-5 w-100' onChange={(e)=>setEmail(e.target.value)} labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput className='text-white' wrapperClass='mb-4 mx-5 w-100' onChange={(e)=>setPassword(e.target.value)} labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

              
              <MDBBtn onClick={handleLogin} outline className='mb-2 px-5' color='white' size='lg'>
                Login
              </MDBBtn>

              <div>
                <p className="mb-0">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;