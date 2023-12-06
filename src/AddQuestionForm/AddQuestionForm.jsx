import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function AddQuestionForm(props) {
    const { subjectId } = useParams();
    const [questionFormDtofirst, setquestionFormDtofirst] = useState({
        questionText: "",
        choices: "",
        rightAnswer: "",
      });
      
      const getData = (e) => {
        const updatedData = { ...questionFormDtofirst, [e.target.name]: e.target.value };
        setquestionFormDtofirst(updatedData);
      };
      
      const getUpdatedQuestionFormDto = () => {
        const choicesArray = questionFormDtofirst.choices.split(",").map((choice) => choice.trim());
        const correctAnswerIndex = choicesArray.indexOf(questionFormDtofirst.rightAnswer.trim());
      
        return {
          questionText: questionFormDtofirst.questionText,
          choices: choicesArray,
          correctAnswerIndex: correctAnswerIndex >= 0 ? correctAnswerIndex : 0,
        };
      };
      
      const [questionFormDto, setquestionFormDto] = useState({});
      
      useEffect(() => {
        const updatedDto = getUpdatedQuestionFormDto();
        setquestionFormDto(updatedDto);
      }, [questionFormDtofirst]); 


    


      const accessToken = props.usertoken;
    const baseUrl =   `http://localhost:5108/api`;
    const AuthAxios = axios.create({
      baseURL:baseUrl,
      headers:{
          Authorization: `Bearer ${accessToken}`
      }
    });
    const GreateQuestionandAnswer = async () => {
        try {
            const {data} = await AuthAxios.post(`/Question/questionForm?subjectId=${subjectId}`,questionFormDto);
            alert(data)
        } catch (error) {
            console.error('Error fetching subjects:', error);
            alert(error)
        }
    };

    const submitQAForm =(e)=>{
        e.preventDefault();
         GreateQuestionandAnswer();
    }

    return (
      <>
 <div className='py-5 text-black'>
    <section id="setting">

<div className="bg-white overflow-auto w-50 m-auto shadow-lg  rounded-lg">
    <h1 className="text-center text-spec py-5 bg-light border-bottom"> Adding Question and Answer</h1>
    <div className="p-4">
        <div className="form-group">
        <form onSubmit={submitQAForm} >

        <label htmlFor="question" className="text-spec py-2">Question</label>
<input onChange={getData} name='questionText' type='text' id='question' className='form-control my-2 ' />
<label htmlFor="choices" className="text-spec py-2">Choices</label>
<input onChange={getData} name='choices' type='text' id='choices' className='form-control my-2 '/>
<label htmlFor="rightAnswer" className="text-spec py-2"> Right Answer</label>
<input onChange={getData} name='rightAnswer' type='text' id='rightAnswer' className='form-control my-2 '/>
<button  id="startBtn"  className="btn btn-info float-right py-2 px-4 bg-spec rounded-pill text-black my-4">Send</button>   
   </form>

        </div>
       
     
   
    </div>
</div>
</section>
</div>

      </>
    );
}
