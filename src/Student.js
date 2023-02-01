import React, {useState} from 'react';
import {Grid} from 'gridjs-react';

const Student = (props) => {
      const [initialValue, setInitialValue] = useState('')
    const {student} = props


    const countAverageGrades = () => {
        const sum = student.grades.reduce((ps, a) => ps + parseInt(a), 0);
        return sum / 8;
    }


    return (

        <div className="student">
            <div className="student__text-wrapper">
                <div className="student-img">
                    <img src={student.pic} alt="Italian Trulli"/>
                </div>
                <div className="student-description">
                    <div className="student-name"> {student.firstName} {student.lastName}</div>
                    <div className="student-description-inner">
                        <div className="student-description-inner-line"> Email: {student.email} </div>
                        <div className="student-description-inner-line"> Company: {student.company} </div>
                        <div className="student-description-inner-line"> Skill: {student.skill} </div>
                        <div className="student-description-inner-line"> Average: {countAverageGrades()}%</div>
                        {student.tag.length > 0?
                            student.tag.map(tag => <button key = {tag.id}>{tag.value}</button>
                            ):null
                        }
                        <div><input className="student-add-tag"
                                    onChange={(e) => setInitialValue(e.target.value)}
                                    type="Text"
                                    placeholder={"Add a tag"}
                                    id={student.email}
                                    value={initialValue}
                                    onDoubleClick={initialValue !==""?()=>props.changeImputeTag(student.email,initialValue):null}
                        >
                        </input>
                        </div>
                    </div>
                    {student.buttonOpened === true ?
                        student.grades.map((test, index) =>
                            <div className="student-grades">Test {index}  &nbsp;&nbsp;&nbsp;   {test}%
                            </div>
                        ) : null
                    }
                </div>
                <div>
                    <input className="student-button"
                           onClick={() => props.changeButton(student.email)}
                           type="button"
                           value={student.buttonOpened === true ? "-" : '+'}
                           id={student.email}
                    >
                    </input>
                </div>
            </div>

        </div>


    );
};

export default Student;
