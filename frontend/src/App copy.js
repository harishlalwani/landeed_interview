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
    const [formData, setFormData] = useState({
        pages: []
    });
    const [page, setPage] = useState(0);
    const [showResults, setShowResults] = useState(false);
    var getFormData = async () => {
        const response = await fetch("http://localhost:3001/form/formConfig");
        const data = await response.json();
        console.log('data', data);
        setPage(data.pages[0]);
        return data; 
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCount((count) => count + 1);
    //     }, 1000);
    // });


    // useEffect(async () => {
    //     let formData =  await getFormData();
    //     setFormData(formData);

    // },[]);

    useEffect(() => {
        (async () => {
            let formData =  await getFormData();
            setFormData(formData);
        })();
    }, []);

    const next = () => {
        setPage(page+1);
    };

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
            { formData.pages && formData.pages.length? getPage(formData.pages[page]) : <></>
            }
            <button className="btn btn-primary" onClick={next}>
                Confirm and Continue
            </button>
        </div>
    );
}

export default App;
