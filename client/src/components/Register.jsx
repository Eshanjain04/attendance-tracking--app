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

function Register() {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e)=>{
        e.preventDefault();
        const data = await fetch("https://attendance-tracker04.herokuapp.com/register",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({firstName,lastName,email,password})
        })

        const res = await data.json();
        if(res.token){
            localStorage.setItem("token",res.token);
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

              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className="text-white-50 mb-5">Please Create Your Account</p>

              <MDBInput className='text-white' wrapperClass='mb-4 mx-5 w-100' onChange={(e)=>setFirstName(e.target.value)} labelClass='text-white' label='First Name' id='formControlLg' type='text' size="lg" required={true}/>
              <MDBInput className='text-white' wrapperClass='mb-4 mx-5 w-100' onChange={(e)=>setLastName(e.target.value)} labelClass='text-white' label='Last Name' id='formControlLg' type='text' size="lg" required={true}/>
              <MDBInput className='text-white' wrapperClass='mb-4 mx-5 w-100' onChange={(e)=>setEmail(e.target.value)} labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" required={true}/>
              <MDBInput className='text-white' wrapperClass='mb-4 mx-5 w-100' onChange={(e)=>setPassword(e.target.value)} labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" required={true}/>

              
              <MDBBtn onClick={handleRegister} outline className='mb-2 px-5' color='white' size='lg'>
                Sign Up
              </MDBBtn>

              <div>
                <p className="mb-0">Already have an account? <Link to="/signin" className="text-white fw-bold">Sign In</Link></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Register;