import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.partName} {props.numberOfExercises}
      </p>
    </div>
  )
}

const Content = (props) => props?.parts?.map(part => <Part key={part.exercises} partName={part.name} numberOfExercises={part.exercises} />)

const getTotal = (items) => [...(items ?? [])].map(item => item.exercises).reduce((acummulator, currentValue) => acummulator + currentValue, 0);

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {getTotal(props.parts)}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
    ]
  }

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App