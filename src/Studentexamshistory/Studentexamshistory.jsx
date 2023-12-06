import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Studentexamshistory(props) {
    const [ExamsResult, setExamsResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        GetExamsResult();
      }, [currentPage]);


    const accessToken = props.usertoken;
    const baseUrl =   `http://localhost:5108/api`;
    const AuthAxios = axios.create({
      baseURL:baseUrl,
      headers:{
          Authorization: `Bearer ${accessToken}`
      }
    });
  
    const GetExamsResult = async () => {
        try {
          const {data} = await AuthAxios.get(`/ExamHistory/StudentExamHistory?page=${currentPage}&pageSize=${pageSize}`);
          setExamsResult(data)
        } catch (error) {
          console.error('Error fetching stats:', error);
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

<div className="bg-white overflow-auto w-75 m-auto shadow-lg  rounded-lg">
    <h1 className="text-center text-spec py-5 bg-light border-bottom"> Exams Result History</h1>
    <div className="p-4">
   
        <table className="table ">
          <thead>
            <tr>
             
              <th className="col">Subject Name</th>
              <th className="col">Exam Score</th>
              <th className="col">ExamDateTime</th>
              {/* <th className="col">EndDateTime</th> */}
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
           {ExamsResult.map((result,index)=> (
           <tr key={index}>
                <td>{result.subjectName}</td>
                <td>{result.grade}</td>
                <td>{result.startTime}</td>
                {/* <td>{result.endTime}</td> */}

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
  
    <li className="page-item"><button className="page-link" onClick={goToNextPage} disabled={ExamsResult.length === 1}>Next</button></li>
  </ul>
</nav>

      </div>
  )
}
