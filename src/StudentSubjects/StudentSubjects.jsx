import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function StudentSubjects(props) {


    const [subjects, setSubjects] = useState([]);
    const [Inrolesubjects, setInroleSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(0);

    useEffect(() => {
        GetstudentSubjects();
        GetInrolestudentSubjects();
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
            setSubjects(data)
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };
    const GetInrolestudentSubjects = async () => {
        try {
            const {data} = await AuthAxios.get(`/StudentSubject/getanotherSubjects`);
            setInroleSubjects(data)
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const mangeSubjectSelection = (e) => {
        setSelectedSubject(e.target.value);
        console.log(selectedSubject);
      };
    
      const removeSelectedSubjectFromOptions = () => {
        const updatedInRoleSubjects = Inrolesubjects.filter(subject => subject.subjectId !== selectedSubject);
        setInroleSubjects(updatedInRoleSubjects);
         setSelectedSubject(''); 
      };
      const addSubject =async () =>{
        if (selectedSubject) {
            try {
              await AuthAxios.post(`/StudentSubject/addnewStudentSubject/${selectedSubject}`);
              alert('Subject added successfully!');
              GetstudentSubjects(); 
              removeSelectedSubjectFromOptions();
            } catch (error) {
              console.error('Error adding subject:', error);
              alert('Failed to add subject.');
            }
          } else {
            alert('Please select a subject.');
          }

        }

      


    return (
        <>
           <div className='py-5 text-black'>
    <section id="setting">

<div className="bg-white overflow-auto w-50 m-auto shadow-lg  rounded-lg">
    <h1 className="text-center text-spec py-5 bg-light border-bottom"> Student Subjects</h1>
    <div className="p-4">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Subjects</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='mt-5'>
          <h5 >Assign to new Subject</h5>
<div className='row justify-content-center'>
  <div className="input-group mb-3">
    <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
    <select className="form-select " id="inputGroupSelect01" onChange={mangeSubjectSelection} value={selectedSubject}>
      <option  selected>Choose...</option>
      {Inrolesubjects.length > 0 ? (
        Inrolesubjects.map((subject, index) => (
          <option key={index} value={subject.subjectId}>{subject.name}</option>
        ))
      ) : (
        <option disabled>No subjects available</option>
      )}
    </select>
    <button className=' btn btn-info' onClick={addSubject}>Add Subject</button>
  </div>
</div>
          </div>
        </div>
      </div>
</section>
</div>


      </>
    )
      }  
