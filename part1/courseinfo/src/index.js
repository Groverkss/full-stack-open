import React from "react"
import ReactDOM from "react-dom"

const Header = (props) => {
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  );
};

const Content = (props) => {
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    ); 
  };

  return (
    <div>
      <Part part={props.parts[0]}/> 
      <Part part={props.parts[1]}/> 
      <Part part={props.parts[2]}/> 
    </div>
  );
};

const Total = (props) => {
  console.log(props.parts);
  let num = props.parts.reduce((accum, value) => accum + value.exercises, 0);
  return (
    <p>
      Number of exercises {num}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));
