import React, {useContext, useState, useEffect} from 'react';
//import Select from 'react-select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormContext from '../context/FormContext';
import CustomInputSelect from './CustomInputSelect';
import {SET_CURRENT_PAGE_ANSWERS, SET_ERROR, SET_ANSWERS} from '../reducers/types.js';
import { isEmpty } from 'lodash';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: 300,
    },
    
}));

function Page(props) {
    const classes = useStyles();
    const { state, dispatch } = useContext(FormContext);
    const { page, currentPage, answers } = props;
    const [ pageInputsObject, setPageInputsObject] = useState(page);

    const { errors } = state;
    console.log('Page state', state);
    useEffect(() => {
        
    }, []);

    function setCurrentAnswer(event, inputIndex, input = {}) {
        let ans = answers;

        if(ans) {
            if(!ans[currentPage]) {
                ans[currentPage] = [];
            }
        }
        else {
            ans = []
        }
        
        console.log('ans', ans);
        if(input.type == 'multiSelect') {

            console.log('event.target', event.target);
            const options  = event.target.value;
            const value = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                value.push(options[i]);
            }

            if(ans[currentPage]) {
                ans[currentPage][inputIndex] = value;
            }
            else {
                ans[currentPage] = [];
                ans[currentPage][inputIndex] = value;
            }

        }
        else {
            // if(input.type == 'select' && input.customInput) {
            //     // console.log(event.target.value, inputIndex, input,  'inputIndex');
            //     // console.log(event.target.value, inputIndex,  'inputIndex');
            //     if(event.target.value == input.values[input.values.length -1]) {
            //         //console.log(Object.keys(page)[inputIndex],  'Object.keys(page)[inputIndex]');
            //         let key = Object.keys(page)[inputIndex];
            //         page[key].allowCustomInput = true; 
            //         setPageInputsObject(page);
            //         return ;
            //     }
                
            // }
            

            if(ans[currentPage]) {
                ans[currentPage][inputIndex] = event.target.value;
            }
            else {
                ans[currentPage] = [];
                ans[currentPage][inputIndex] = event.target.value;
            }
        }
        console.log('answeeee', ans);
        dispatch({type: SET_ANSWERS, answers:ans});
        
    }

    function getPageInput(pageInputs) {
        return Object.keys(pageInputs).map((value, index) => {
            //console.log('pageInputs', pageInputs, index, inputAnswers);
            return getInput(pageInputs[value], index);
        })
    }

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    //   ]
    
    function getInput(input, inputIndex) {
        let ans = (answers && answers[currentPage])? answers[currentPage]: [];
        let _errors = (errors && errors[currentPage])? errors[currentPage]: [];

        console.log('answers _errors', answers, _errors, input);
        switch (input.type) {
            case "text":
              return (
                <div className="block" key={inputIndex}>
                    <FormControl className={classes.formControl}>
                        <TextField 
                            label={input.label} 
                            error={_errors[inputIndex] && isEmpty(_errors[inputIndex] != '') ? true : false}
                            helperText={_errors[inputIndex] ? _errors[inputIndex] : ''}
                            type="text" 
                            name={input.name} 
                            value={ans[inputIndex] ? ans[inputIndex] : ""} 
                            onChange={(e) => setCurrentAnswer(e, inputIndex)}
                        />
                    </FormControl>
                    
                </div>
              );
            case "radio": {
                return (
                    <div className="block" key={inputIndex}>
                        <FormControl className={classes.formControl}>
                        <FormLabel component="legend">{input.label}</FormLabel>
                            <RadioGroup aria-label={input.name} name={input.name} onChange={(e) => setCurrentAnswer(e, inputIndex)} value={ans[inputIndex] ? ans[inputIndex] : ""}>
                                {input.values.map((value, index) => (
                                    <FormControlLabel key={index} value={value} control={<Radio />} label={value} />  
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div> 
                );
            }
            case "checkbox": {
                return (
                    <div className="block" key={inputIndex}>
                        <FormLabel className={classes.formControl}>
                            <InputLabel>{input.label}</InputLabel>
                            {input.values.map((value, index) => (
                                <label>
                                    <Input type="checkbox" name={input.name} value={value} onChange={(e) => setCurrentAnswer(e, inputIndex)} />
                                    {value}
                                </label>
                            ))}
                        </FormLabel>
                    </div>
                );
            }
            case "select" : {
                return (
                    <div className="block" key={inputIndex}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>{input.label}</InputLabel>
                            <Select
                                error={_errors[inputIndex] ? true : false}
                                helperText={_errors[inputIndex] ? _errors[inputIndex] : ''}
                                onChange={(e) => setCurrentAnswer(e, inputIndex, input)}
                                value={ans[inputIndex] ? ans[inputIndex] : ""}
                                name={input.name}
                                MenuProps={MenuProps}
                            >
                                {input.values.map((value, index) => (
                                    <MenuItem key={index} value={value} >
                                    {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
              );
            }

            case "customInputSelect": {
                return (
                    <div className="block" key={inputIndex}>
                        <FormControl className={classes.formControl}>
                            {/* <InputLabel>{input.label}</InputLabel>
                            <div></div> */}
                            <CustomInputSelect
                                options={input.values}
                                error={errors[inputIndex] ? true : false}
                                helperText={errors[inputIndex] ? errors[inputIndex] : ''}
                                multiple
                                name={input.name}
                                setCurrentAnswer={(e) => setCurrentAnswer(e, inputIndex, input)}
                                value={ans[inputIndex] ? ans[inputIndex] : [] }
                                input={<Input />}
                            />
                        </FormControl>
                    </div>
                );
                
            }
            
            case "multiSelect": {
                if(input.customInput) {
                    return (
                        <div className="block" key={inputIndex}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>{input.label}</InputLabel>
                                    <Select
                                        error={errors[inputIndex] ? true : false}
                                        helperText={errors[inputIndex] ? errors[inputIndex] : ''}
                                        multiple
                                        name={input.name}
                                        onChange={(e) => setCurrentAnswer(e, inputIndex, input)}
                                        value={ans[inputIndex] ? ans[inputIndex] : [] }
                                        input={<Input />}
                                        MenuProps={MenuProps}
                                    >

                                    {input.values.map((value, index) => (
                                        <MenuItem key={index} value={value} >
                                        {value}
                                        </MenuItem>
                                    ))}

                                    {/* {input.values.map((value, index) => (
                                        <option key={value} value={value}>
                                        {value}
                                        </option>
                                    ))} */}
                                </Select>
                            </FormControl>
                        </div>
                    );
                }
                return (
                  <div className="block" key={inputIndex}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>{input.label}</InputLabel>
                            <Select
                                error={errors[inputIndex] ? true : false}
                                helperText={errors[inputIndex] ? errors[inputIndex] : ''}
                                multiple
                                name={input.name}
                                onChange={(e) => setCurrentAnswer(e, inputIndex, input)}
                                value={ans[inputIndex] ? ans[inputIndex] : [] }
                                input={<Input />}
                                MenuProps={MenuProps}
                            >

                            {input.values.map((value, index) => (
                                <MenuItem key={index} value={value} >
                                {value}
                                </MenuItem>
                            ))}

                            {/* {input.values.map((value, index) => (
                                <option key={value} value={value}>
                                {value}
                                </option>
                            ))} */}
                        </Select>
                    </FormControl>
                  </div>
                );
            }
            case "number":
              return (
                <div className="block" key={inputIndex}>
                    <FormControl className={classes.formControl}>
                        <TextField 
                            label={input.label}
                            error={_errors[inputIndex] && isEmpty(_errors[inputIndex] != '') ? true : false}
                            helperText={_errors[inputIndex] ? _errors[inputIndex] : ''}
                            type="number" name={input.name} 
                            value={ans[inputIndex] ? ans[inputIndex] : ""} onChange={(e) => setCurrentAnswer(e, inputIndex)}/>
                    </FormControl>
                     
                </div>
              );
            default:
                return (
                    <div className="block" key={inputIndex}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>{input.label}</InputLabel>
                            <Input 
                                error={errors[inputIndex] ? true : false}
                                helperText={errors[inputIndex] ? errors[inputIndex] : ''}
                                name={input.name} 
                                value={ans[inputIndex] ? ans[inputIndex] : ""} 
                                onChange={(e) => setCurrentAnswer(e, inputIndex)}
                            />
                        </FormControl>
                    </div>
                );
          }
        
    }

    return (
        <>  
            {
                getPageInput(pageInputsObject)
            }
        </>
        
    ); 
}

export default Page;
