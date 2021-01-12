import React from "react"

const Header = (props) => {
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  );
};

const Content = ( {parts} ) => {
  return (
    <div>
      { parts.map( value => <p> {value.name} {value.exercises} </p>) }
    </div>
  );
};

const Total = ( {parts} ) => {
  
  return (
    <b>
      Number of exercises {
        parts.reduce((accum, value) => accum + value.exercises, 0)
      }
    </b>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
  );
};

export default Course
