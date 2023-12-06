import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Studentsadmin(props) {

    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        GetStudents();
      }, [currentPage]);

      const accessToken = props.usertoken;
      const baseUrl =   `http://localhost:5108/api`;
      const AuthAxios = axios.create({
        baseURL:baseUrl,
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
      });
   
      const GetStudents = async () => {
        try {
          const {data} = await AuthAxios.get(`/Student/getallstudents?page=${currentPage}&pageSize=${pageSize}`);
          setStudents(data);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };


      const toggleStudentStatus = async (studentId, currentStatus) => {
        try {
          const updatedStatus = !currentStatus;
          await AuthAxios.patch(`/Student/updateIsActive/${studentId}/${updatedStatus}`);
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.id === studentId ? { ...student, isActive: updatedStatus } : student
            )
          );
        } catch (error) {
          console.error('Error updating student status:', error);
        }
      };

      const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
      };
    
      const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
      };
      
  return (
    <div className='py-5 text-black'>
    <section id="setting">

<div className="bg-white overflow-auto m-auto shadow-lg  rounded-lg">
    <h1 className="text-center text-spec py-5 bg-light border-bottom"> Students</h1>
    <div className="p-4">
        <table className="table">
          <thead>
            <tr>
             
              <th className="col">ID</th>
              <th className="col">Student Name</th>
              <th className="col">Student Email</th>
              <th className="col">Gender</th>
              <th colSpan={2} className="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
           {students.map((student)=> (<tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.stname}</td>
                <td>{student.email}</td>
                <td>{student.gender}</td>
                <td>{student.isActive ? 'Enabled' : 'Disabled'}</td>
              <td>
                <button className='btn btn-info' onClick={() => toggleStudentStatus(student.id, student.isActive)}>
                  {student.isActive ? 'Disable' : 'Enable'}
                </button>
              </td>

           </tr>) )}
          
          </tbody>
        </table>
</div>
</div>
</section>
        <nav aria-label="Page navigation example " className='row mt-5'>
     <ul className="pagination col align-items-center justify-content-center">
    <li className="page-item"><button className="page-link" onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button></li>
    <li className="page-item"><span className="page-link" >{currentPage}</span></li>
  
    <li className="page-item"><button className="page-link" onClick={goToNextPage} disabled={students.length === 1}>Next</button></li>
  </ul>
</nav>

      </div>
  )
}
