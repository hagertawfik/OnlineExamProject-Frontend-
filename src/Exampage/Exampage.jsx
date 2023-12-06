import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Exampage(props) {
    const { subjectId } = useParams();
    const [exam, setExam] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState({});
const navigate = useNavigate()
    const [submitObject, setSubmitObject] = useState({
        ExamId: 0,
        StudentId: "",
        SubjectId: 0,
        SelectedChoices: [],
        StartDateTime: "",
        EndDateTime: "",
    });


    useEffect(() => {
       GetRandomExam();
    }, []);


    const accessToken = props.usertoken;
    const baseUrl = `http://localhost:5108/api`;
    const AuthAxios = axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const GetRandomExam = async () => {
        try {
            const { data } = await AuthAxios.post(`/RequestExam/${subjectId}`);
            setExam(data)
            initializeSelectedAnswers(data.questionsWithChoices);
            // console.log(data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };
    const PublishExaminQueue = async (updatedSubmitObject) => {
        try {
            // console.log(updatedSubmitObject);
             const { data } = await AuthAxios.post(`/SubmitExam`,updatedSubmitObject);
            //  console.log(data);
        } catch (error) {
            console.error('error publishing in queue', error);
            alert("error publishing in queue")
        }
    };

    const initializeSelectedAnswers = (questionsWithChoices) => {
        const initialAnswers = {};
        questionsWithChoices.forEach((question, index) => {
            initialAnswers[`answer${index}`] = null;
        });
        // console.log(initialAnswers);
        setSelectedAnswers(initialAnswers);
    };

    const handleAnswerSelection = (e, questionIndex) => {
        const selectedChoiceId = e.target.value;
        // console.log(selectedChoiceId);
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [`answer${questionIndex}`]: selectedChoiceId,
        }));
    };

    const validateAnswers = () => {
        for (const key in selectedAnswers) {
            if (selectedAnswers[key] === null) {
                return false;
            }
        }
        return true;
    };


    const handleSubmit = () => {
        if (validateAnswers()) {
            constructSubmitObject();
             console.log(submitObject);
        
        } else {
            alert('Please choose an answer for all questions.');
        }
    };

    const constructSubmitObject = () => {
        const choices = [];
        exam.questionsWithChoices.forEach((question, index) => {
            const selectedChoice = selectedAnswers[`answer${index}`];
            // console.log(selectedChoice);
            if (selectedChoice !== null) {
                choices.push({
                    QuestionId: question.questionId,
                    ChoiceId: selectedChoice,
                });
            }
        });
    
        const updatedSubmitObject = {
            ...submitObject,
            ExamId: exam.examId,
            SubjectId: subjectId,
            SelectedChoices: choices,
            StartDateTime: new Date().toISOString(),
            EndDateTime: new Date().toISOString(),
        };
    
        setSubmitObject(updatedSubmitObject);
       PublishExaminQueue(updatedSubmitObject);
       setSelectedAnswers({})
       navigate("/Finshpage")
        // console.log(updatedSubmitObject); 
    };


    const [timeRemaining, settimeRemaining] = useState(2 * 60); 
    const [displayTime, setDisplayTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRemaining > 0) {
                settimeRemaining(prevtimeRemaining => prevtimeRemaining - 1);
            } else {
                clearInterval(timer); 
                if (validateAnswers()) {
                    constructSubmitObject(); 
                }
            }
        }, 1000); 

        return () => clearInterval(timer); 
    }, [timeRemaining]);

    useEffect(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        setDisplayTime(
          `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, [timeRemaining]);





    return <>

        <div className='py-5 text-black'>
            <section id="quiz">
                <div className="bg-white w-50 m-auto shadow-lg rounded-lg overflow-auto">
                    <div className="p-3 bg-light border-bottom">
                        <h1 className="text-spec text-center">Exam</h1>
                    </div>
                    <div className="p-4 text-spec">
                    <p>Time Remaining: {displayTime}</p>
                        {exam.questionsWithChoices && exam.questionsWithChoices.map((question, index) => (
                            <div key={index} className="my-4">
                                <h5 className="my-3">Q{index + 1}: {question.questionText}</h5>
                                <div>
                              
                                    {question.choices && question.choices.map((choice, choiceIndex) => (
                                        <div key={choiceIndex} className="form-check my-2">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name={`answer${index}`} onChange={(e) => handleAnswerSelection(e, index)} value={choice.choiceId} />
                                                {choice.choiceText}
                                            </label>
                                         
                                        </div>

                                    ))}
                                </div>


                            </div>
                        ))}
                        <button onClick={handleSubmit} className="btn btn-info float-right py-2 px-4 bg-spec rounded-pill text-white my-4" id="next">Submit</button>
                    </div>
                </div>
            </section>
        </div>
    </>
}
