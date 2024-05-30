import React, {useReducer} from 'react';
import { useState, useEffect } from "react";
import Progress from './components/Progress';
import Question from './components/Question';
import Page from './components/Page';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';
import FormContext from './context/FormContext.js';
import CountDownTimer from "./components/CountDownTimer";



import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
    SET_CURRENT_PAGE_ANSWERS,
    SET_ERRORS
} from './reducers/types.js';
import formReducer from './reducers/FormReducer';

import './App.css';

function App() {

    const initialState = {
        currentPage: 0,
        currentAnswer: '',
        answers: [],
        currentPageAnswers: 0,
        showResults: false,
        resetForm: 0,
        errors: []
    };

    const [state, dispatch] = useReducer(formReducer, initialState);
    const {currentQuestion, currentAnswer, answers, showResults, errors} = state;
    const [formTimeout, setFormTimeout] =  useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages ] = useState([]);
    const [formData, setFormData] = useState({
        pages: []
    });

    var getFormData = async () => {
        const response = await fetch("http://localhost:3001/form/formConfig");
        const data = await response.json();
        //console.log('data', data);
        return data; 
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCount((count) => count + 1);
    //     }, 1000);
    // });

    useEffect(() => {
        let pageloadtime = new Date().getTime();
        
        (async () => {
            let formData =  await getFormData();
            if(formData.pages && formData.pages.length > 0) {
                setPages(formData.pages);
                console.log('formData.pages', formData.pages);
                let timeOut = formData.timeout * 60 ;
                setFormTimeout(timeOut);
                // setTimeout(function () {
                //     restart();
                // }, timeOutInMilliSeconds);
                
            }
        })();
    }, []);

    const next = () => {
        //console.log(state);
        // const currentAnswers = state.currentPageAnswers;
        let ans = state.answers;
        // ans[currentPage] = currentAnswers;
        //dispatch({type: SET_ANSWERS, answers});
        if(ans[currentPage] == undefined)
        {
            ans[currentPage] = [];
        }
        console.log('', pages);
        let errors = [];
        errors[currentPage] = [];
        let inputs = pages[currentPage];
        Object.keys(inputs).forEach((input, inputIndex) => {
            console.log(input, 'input');
            let _input = inputs[input] ? inputs[input] : [];
            let _answer = ans[currentPage][inputIndex];
            if(_input.required && (_answer == '' || _answer == undefined )) {
                errors[currentPage][inputIndex] = "required field";
                console.log("required field", errors);
                
            }
        })

        if(errors[currentPage].length > 0) {
            console.log("errors", errors)
            dispatch({type: SET_ERRORS, errors});
            return;
        }
        
        if (currentPage + 1 < pages.length) {
            setCurrentPage(currentPage+1);
            return;
        }

        submitAnswers(ans);
    };

    const submitAnswers = async (ans) => {

        //console.log(ans, 'ansdsfsf');
        let formInputData = {};

        pages.forEach((inputs, pageIndex) => {
            Object.keys(inputs).forEach((input, inputIndex) => {
                //formInputData.append(input, ans[pageIndex][inputIndex]);
                formInputData[input] = ans[pageIndex][inputIndex];
            })
        })
        
        try {
            //console.log(formInputData, 'formInputData');
            (async () => {
                const rawResponse = await fetch('http://localhost:3001/form/formSubmit', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formInputData)
                });
                const content = await rawResponse.json();
                
                //console.log(content);
            })();
            //console.log(formInputData, 'formInputData');
            

            dispatch({type: SET_SHOW_RESULTS, showResults: true});
        }
        catch(error) {
            dispatch({type: SET_ERROR, error: 'Please select an option'});
        }
        
        
        
    }

    const back = () => {
        if(currentPage > 0) {
            setCurrentPage(currentPage-1);
        }
    };

    const restart = () => {
        dispatch({type: RESET_QUIZ});
        window.location.reload();
        setCurrentPage(0);
    };


    function getPage(page) {
        return <Page page={page} currentPage={currentPage} key={currentPage} answers={answers} />;
    }

    function handleOnComplete() {
        restart();
    }

    return (
        <FormContext.Provider value={{state, dispatch}}>
            {
                showResults && (
                    <div className="container results">
                        <h2>Form Submitted Successfully</h2>
                        <button className="btn btn-primary" onClick={restart}>
                            Restart
                        </button>
                    </div>
                )
            }
            <div className="container" ans={answers}>
                {
                (formTimeout > 0) && 
                    <CountDownTimer
                    duration={formTimeout}
                    colors={["#ff9248", "#a20000"]}
                    colorValues={[20, 10]}
                    onComplete={() => handleOnComplete()}
                />
                }
                
                {
                    console.log(formData, 'formData')}
                { pages && pages.length? getPage(pages[currentPage]) : <></>
                }
                <button className="btn btn-primary" onClick={next}>
                    Confirm and Continue
                </button>
                <button className="btn btn-primary" onClick={restart}>
                    Restart
                </button>
                { 
                    currentPage > 0 &&
                    (
                        <button className="btn btn-primary" onClick={back}>
                            Back
                        </button>
                    ) 
                }
            </div>
        </FormContext.Provider>
    );
}

export default App;
