import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
    SET_CURRENT_PAGE_ANSWERS,
    SET_ERRORS
} from './types.js';

function formReducer(state, action) {
    console.log('action', action);
    switch (action.type) {
        case SET_CURRENT_ANSWER:
            return {
                ...state,
                currentAnswer: action.currentAnswer,
            };
        case SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: action.currentQuestion,
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case SET_SHOW_RESULTS:
            return {
                ...state,
                showResults: action.showResults,
            };
        case SET_ANSWERS:
            return {
                ...state,
                answers: action.answers,
            };
        case RESET_QUIZ:
            return {
                ...state,
                answers: [],
                currentQuestion: 0,
                currentAnswer: '',
                showResults: false,
                error: '',
                currentPageAnswers: [],
                resetForm: state.resetForm + 1
            };
        case SET_CURRENT_PAGE_ANSWERS:
            return {
                ...state,
                currentPageAnswers: action.currentPageAnswers,
            };
        default:
            return state;
    }
}

export default formReducer;
