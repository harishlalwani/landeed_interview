import React, {useReducer} from 'react';
import { useState, useEffect } from "react";
import Progress from './components/Progress';
import Question from './components/Question';
import Page from './components/Page';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';
import FormContext from './context/FormContext.js';



import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';

import './App.css';

function App() {

    const initialState = {
        pages,
        currentPage: 0,
        currentAnswer: '',
        answers: [],
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);
    const {currentQuestion, currentAnswer, answers} = state;

    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages ] = useState([]);
    const [formData, setFormData] = useState({
        pages: []
    });
    const [showResults, setShowResults] = useState(false);
    var getFormData = async () => {
        const response = await fetch("http://localhost:3001/form/formConfig");
        const data = await response.json();
        console.log('data', data);
        return data; 
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCount((count) => count + 1);
    //     }, 1000);
    // });

    useEffect(() => {
        (async () => {
            let formData =  await getFormData();
            if(formData.pages && formData.pages.length) {
                setPages(data.pages);
            }
        })();
    }, []);

    const next = () => {
        setCurrentPage(currentPage+1);
    };

    // const next = () => {
    //     const answer = {questionId: question.id, answer: currentAnswer};

    //     if (!currentAnswer) {
    //         dispatch({type: SET_ERROR, error: 'Please select an option'});
    //         return;
    //     }

    //     answers.push(answer);
    //     dispatch({type: SET_ANSWERS, answers});
    //     dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});

    //     if (currentQuestion + 1 < questions.length) {
    //         dispatch({
    //             type: SET_CURRENT_QUESTION,
    //             currentQuestion: currentQuestion + 1,
    //         });
    //         return;
    //     }

    //     dispatch({type: SET_SHOW_RESULTS, showResults: true});
    // };

    function getPage(page) {
        // console.log('pages', pages);
        // return pages.map((page, index) => {
        //     return <Page page={page} key={index}/>
        // })
        return <Page page={page} key={index}/>;
    }

    return (
        
        <div className="container">
            {
                console.log(formData, 'formData')}
            { pages && pages.length? getPage(pages[currentPage]) : <></>
            }
            <button className="btn btn-primary" onClick={next}>
                Confirm and Continue
            </button>
        </div>
    );
}

export default App;
