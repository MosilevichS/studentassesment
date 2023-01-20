import axios from 'axios';
import './App.css';
import {useEffect, useState} from "react";
import Student from "./Student";

function App() {
    const [list, setList] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [inputValueTag, setInputValueTag] = useState('')
    const [inputValueTagSearch, setInputValueTagSearch] = useState('')
    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students')
            .then(res => setList(res.data.students.map(student => ({...student, buttonOpened: false, tag: []}))))
            .catch(err => console.log(err));
    }, [])
    const changeInput = (e) => {
        setInputValue(e.target.value)
        const filteredList = list.filter(
            student =>
                (student.firstName.toUpperCase().includes(inputValue.toUpperCase()) ||
                    student.lastName.toUpperCase().includes(inputValue.toUpperCase()))
        )
        setList(filteredList)
    }
    const changeInputTag = (id, tagValue) => {
        const temp = list.map(student =>
            student.email === id ?
                {...student, tag: [...student.tag, {id: Math.random(), value: tagValue}]} : student)
        setList(temp)
    }
    const changeInputTagSearch = (e) => {
        setInputValueTagSearch(e.target.value)
        const filteredList = list.filter(
             student => student.tag.some(tag =>(tag.value.toUpperCase().includes(imputValueTagSearch.toUpperCase() ))))
                 // && student.tag.filter(tag =>   (tag.value.toUpperCase() === 'A') ))
                 //?
            //     student.tag.filter(tag =>   (tag.value.toUpperCase() === 'A')
            //         // (tag.value.toUpperCase().includes(imputValueTagSearch.toUpperCase()))
            //     ) : null)
        setList(filteredList)
    }
    const changeButton = (id) => {
        const temp = list.map(student =>
            student.email === id ? {...student, buttonOpened: !student.buttonOpened} : student)
        setList(temp)
    }

    return (
        <div className="App">
            <div className="container">
                <div>
                    <input className="student-input" placeholder="Search by name"
                           type='text' onChange={(e) => changeInput(e)}
                           value={inputValue}
                    />
                </div>
                <div>
                    <input className="student-input"
                           placeholder="Search by tag"
                           type='text'
                           onChange={(e) => changeInputTagSearch(e)}
                           value={inputValueTagSearch}
                    />
                </div>
                {list ? list.map(student => <Student
                    key={student.id}
                    student={student}
                    changeButton={changeButton}
                    imputValueTag={inputValueTag}
                    changeInputTag={changeInputTag}
                />) : null}
            </div>
        </div>
    );
}

export default App;
