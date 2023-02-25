import React from 'react'
import { useState } from 'react'
import {RiDeleteBin3Line} from "react-icons/ri"
import "../CSS/subjectcontainer.css"

const SubjectContainer = ({id,name,attendance,totalClass,percentage,parentCallback}) => {
  const [classToggle,setClassToggle] = useState(false);
  const missed = async()=>{
    await fetch(`https://attendance-tracker04.herokuapp.com/missed/${id}`,{
      method:"POST"
    })
    setClassToggle(!classToggle);
    parentCallback()

  }

  const attended = async()=>{
    await fetch(`https://attendance-tracker04.herokuapp.com/attend/${id}`,{
      method:"POST"
    })

    setClassToggle(classToggle);
    parentCallback()
  }

  const deleteSubject = async()=>{
    await fetch(`https://attendance-tracker04.herokuapp.com/subject/${id}/delete`,{
      method:"DELETE"
    })
    parentCallback()
  }
  return (
    <div className='subject-container-wrapper'>
        <div className="subject-container" style={{background: parseInt(percentage.split("%")[0])>60 ? `-webkit-linear-gradient(left, #4abd7e ${percentage} , #ffffff 0%`: `-webkit-linear-gradient(left, #fc9403 ${percentage} , #ffffff 0%`}}>
            <button onClick={missed} className='btns'>-</button>
            <label>{name}</label>
            <label>{percentage}</label>
            <div className='class-details'>
                <label>Total Classes - {totalClass}</label>
                <label>Attended - {attendance}</label>
            </div>
            <button onClick={attended} className='btns'>+</button>
        </div>
        <div onClick={deleteSubject} className='delete-button btns'>
            <RiDeleteBin3Line/>
        </div>
    </div>
  )
}

export default SubjectContainer