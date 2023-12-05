import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SubjectContainer from './SubjectContainer';
import Header from './Header';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useRef } from 'react';

const Main = () => {
    const [data,setData] = useState([]);
    const [classToggle,setClassToggle] = useState(false);
    const addSubjectRef = useRef();
    const navigate = useNavigate();
    const handleChildCallback = ()=>{
        setClassToggle(!classToggle);
    }

    const addSubject = async (e)=>{
        e.preventDefault();
        const subject = addSubjectRef.current.value;
        const data = await fetch("https://attendace-app-esh.onrender.com/subject/add",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({subjectName:subject})
        });
        const res = await data.json();
        alert(res.message)

        console.log(res.message);
        addSubjectRef.current.value = "";
        setClassToggle(!classToggle);
    }
    const getData = async ()=>{
        const data = await fetch("https://attendace-app-esh.onrender.com/subject/list",{
            method:"GET",
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            }
        })

        const res = await data.json();
        setData(res.data)
    }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signin");
        }else{
            getData();
        }
    },[classToggle])
  return (
    <div>
        <Header/>
        {data.map(item=>(
            <SubjectContainer key={item._id} id={item._id} name={item.name} attendance={item.attendance} totalClass={item.totalClass} percentage={item.percentage} parentCallback={handleChildCallback}/>
        ))}
        <div className='addsubject-container'>
            <input ref={addSubjectRef} className='addsubject-input' type="text" placeholder='E.g Maths'/>
            <MDBBtn onClick={addSubject} className='me-1 addsubject-button' color='secondary'>
                Add Subject
            </MDBBtn>
        </div>
    </div>
  )
}

export default Main