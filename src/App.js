import axios from 'axios';
import './App.css';
import {useEffect, useState} from "react";
import Student from "./Student";

function App() {
    const [students, setStudents] = useState([])
    const [searchName, setSearchName] = useState('')
    const [searchTag, setSearchTag] = useState('')
    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students')
            .then(res => setStudents
            (res.data.students.map(student => ({...student, buttonOpened: false, tags: []}))))
            .catch(err => console.log(err));
    }, [])
    const regExpName = new RegExp(`${searchName}`, "i")
    const regExpTag = new RegExp(`${searchTag}`, "i")
    const searchFilter = (el) => {
        if (searchName === '') return el
        if (regExpName.test(el.firstName) || regExpName.test(el.lastName)) return el
    }
    const searchFilterTag = (el) => {
        if (searchTag === '') return el
        for (let i = 0; i < el.tags.length; i++) {
            if  (el.tags[i].value && regExpTag.test(el.tags[i].value)) return el
        }
    }

    const changeImputeTag = (id, tagValue) => {
        const temp = students.map(student =>
            student.email === id ?
                {...student, tags: [...student.tags, {id: Math.random(), value: tagValue}]} : student)
        setStudents(temp)
    }

    const changeButton = (id) => {
        const temp = students.map(student =>
            student.email === id ? {...student, buttonOpened: !student.buttonOpened} : student)
        setStudents(temp)
    }
    return (
        <div className="App">
            <div className="container">
                <div>
                    <input className="student-input" placeholder="Search by name"
                           type='text' onChange={(e) => setSearchName(e.target.value)}
                           value={searchName}
                    />
                </div>
                <div>
                    <input className="student-input"
                           placeholder="Search by tag"
                           type='text'
                           onChange={(e) => setSearchTag(e.target.value)}
                           value={searchTag}
                    />
                </div>
                {students
                    .filter(searchFilter)
                    .filter(searchFilterTag)
                    .map(student => <div key={student.id}>
                        <Student student={student}
                                 regExpName={regExpName}
                                 regExpTag={regExpTag}
                                 changeButton={changeButton}

                                 changeImputeTag={changeImputeTag}
                        />
                    </div>)}

            </div>
        </div>
    );
}

export default App;
