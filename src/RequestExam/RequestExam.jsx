import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function RequestExam(props) {
    const [studentsubjects, setStudentsubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        GetstudentSubjects();
    }, []);

    const accessToken = props.usertoken;
    const baseUrl =   `http://localhost:5108/api`;
    const AuthAxios = axios.create({
      baseURL:baseUrl,
      headers:{
          Authorization: `Bearer ${accessToken}`
      }
    });
    
    const GetstudentSubjects = async () => {
        try {
            const {data} = await AuthAxios.get(`/StudentSubject/getStudentSubjects`);
            setStudentsubjects(data)
        } catch (error) {
            console.error('Error fetching subjects:', error);
            // alert('Error fetching subjects:')
        }
    };

    const mangeSubjectSelection = (e) => {
        setSelectedSubject(e.target.value);
       console.log(selectedSubject);
      };

      const GetSubjectId = ()=>{
        if (selectedSubject <=0) 
            alert("there is no subject with this name")
        else
            navigate(`/Exampage/${selectedSubject}`);
      }


  return (
    <>
    <div className='py-5 text-black'>
    <section id="setting">

<div className="bg-white overflow-auto w-50 m-auto shadow-lg  rounded-lg">
    <h1 className="text-center text-spec py-5 bg-light border-bottom"> Setting your Exam</h1>
    <div className="p-4">
        <div className="form-group">
            <label htmlFor="Subject" className="text-spec py-2"> Subject </label>
            <select className="form-select " id="Subject" name="Subject" onChange={mangeSubjectSelection} value={selectedSubject}>
            <option value="" selected>Choose...</option>
      {studentsubjects.length > 0 ? (
        studentsubjects.map((subject, index) => (
          <option key={index} value={subject.subjectId}>{subject.name}</option>
        ))
      ) : (
        <option disabled>No subjects available</option>
      )}
    </select>

        </div>
       
    <button onClick={GetSubjectId} id="startBtn"  className="btn btn-info float-right py-2 px-4 bg-spec rounded-pill text-black my-4">Start
        </button>

    </div>
    
</div>
</section>
</div>
    </>
  )
}
