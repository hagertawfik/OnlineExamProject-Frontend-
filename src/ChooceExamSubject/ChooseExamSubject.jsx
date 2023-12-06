import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ChooseExamSubject(props) {


    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [newSubjectName, setNewSubjectName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        GetAllSubjects();
    }, []);

    const accessToken = props.usertoken;
    const baseUrl =   `http://localhost:5108/api`;
    const AuthAxios = axios.create({
      baseURL:baseUrl,
      headers:{
          Authorization: `Bearer ${accessToken}`
      }
    });

    const GetAllSubjects = async () => {
        try {
            const {data} = await AuthAxios.get(`/Subject/getallsubjects`);
            setSubjects(data)
        } catch (error) {
            console.error('Error fetching subjects:', error);
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
            navigate(`/AddQuestionForm/${selectedSubject}`);
      }

      const addNewSubject = async () => {
        try {
            const response = await AuthAxios.post('/Subject/addSubject', {
              Name: newSubjectName,
            });
            console.log(response);
        
            if (response.status === 200) {
              GetAllSubjects(); 
              setNewSubjectName(''); 
              alert(response.data.message)
            } else {
              console.error("Failed to add subject", response.statusText);
              alert("Failed to add subject")
            }
          } catch (error) {
            console.error('Error adding subject', error);
            alert("Error adding subject")
          }
};




  return (
    <>
    <div className='py-5 text-black'>
    <section id="setting">

<div className="bg-white overflow-auto w-50 m-auto shadow-lg  rounded-lg">
    <h1 className="text-center text-spec py-5 bg-light border-bottom"> Subject Selection</h1>
    <div className="p-4">
        <div className="form-group">
            <label htmlFor="Subject" className="text-spec py-2">Select Subject To Add Questions</label>
            <select className="form-select " id="Subject" name="Subject" onChange={mangeSubjectSelection} value={selectedSubject}>
            <option value="" selected>Choose...</option>
      {subjects.length > 0 ? (
        subjects.map((subject, index) => (
          <option key={index} value={subject.subjectId}>{subject.name}</option>
        ))
      ) : (
        <option disabled>No subjects available</option>
      )}
    </select>

        </div>
       
    <button onClick={GetSubjectId} id="startBtn"  className="btn btn-info float-right py-2 px-4 bg-spec rounded-pill text-black my-4">Start
        </button>

        <div className="form-group mt-3">
      <label htmlFor="newSubject" className="text-spec py-2">Add New Subject</label>
      <input type="text" className="form-control"  id="newSubject"  value={newSubjectName}  onChange={(e) => setNewSubjectName(e.target.value)}/>
    </div>
    <button onClick={addNewSubject} className="btn btn-info float-right py-2 px-4 bg-spec rounded-pill text-black my-4">
      Add New Subject
    </button>
    </div>
    
</div>
</section>
</div>
    </>
  )
}
