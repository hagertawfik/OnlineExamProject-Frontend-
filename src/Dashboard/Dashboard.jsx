import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Dashboard(props) {

    const [stats, setStats] = useState({
      totalStudents: 0,
      totalExams: 0,
        completedExams: 0,
        passedExams: 0,
        failedExams: 0,
      });

      useEffect(() => {
        Getstats();
      }, []);

      const accessToken = props.usertoken;
      const baseUrl =   `http://localhost:5108/api`;
      const AuthAxios = axios.create({
        baseURL:baseUrl,
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
      });

      const Getstats = async () => {
        try {
          const {data} = await AuthAxios.get(`/Dashboard`);
          setStats(data);
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      };


      return (
        <div className='py-5 text-black'>
    <section id="setting">

<div className="bg-white overflow-auto w-75 m-auto shadow-lg  rounded-lg">
    <h1 className="text-center text-spec py-5 bg-light border-bottom"> Dashboard</h1>
    <div className="p-4">
        <table className="table">
          <thead>
            <tr>
             
              <th className="col">Total Students</th>
              <th className="col">Total Exams</th>
              <th className="col">Exams Completed</th>
              <th className="col">Exams Passed</th>
              <th className="col">Exams Failed</th>
            </tr>
          </thead>
          <tbody className="table-group-divider ">
           
              <tr >
            
                <td> {stats.totalStudents}</td>
                <td>{stats.totalExams}</td>
                <td>{stats.completedExams}</td>
                <td>{stats.passedExams}</td>
                <td>{stats.failedExams}</td>
              </tr>
          
          </tbody>
        </table>
      </div>
      </div>
      </section>
      </div>
    );


    }





