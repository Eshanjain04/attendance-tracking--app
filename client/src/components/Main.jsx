import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SubjectContainer from './SubjectContainer';
import Header from './Header';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useRef } from 'react';
import { apiCall } from '../service';

const Main = () => {
    const [data,setData] = useState([]);
    const [classToggle,setClassToggle] = useState(false);
    const addSubjectRef = useRef();
    const navigate = useNavigate();
    const handleChildCallback = ()=>{
        setClassToggle(!classToggle);
    }

    const addSubject =  (e)=>{
        e.preventDefault();
        const subject = addSubjectRef.current.value;
        let url = "https://attendace-app-esh.onrender.com/subject/add";
        apiCall("POST", url,true,JSON.stringify({subjectName:subject}),(res)=>{
            alert(res.message)
        })
        addSubjectRef.current.value = "";
        setClassToggle(!classToggle);
    }
    const getData =  ()=>{
        let url = "https://attendace-app-esh.onrender.com/subject/list";
        apiCall("GET", url,true,{},(res)=>{
            console.log(res);
            setData(res.data)
        })
    }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signin");
        }else{
            getData();
        }
    },[classToggle,data])
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