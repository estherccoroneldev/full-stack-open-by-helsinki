import React from "react";

const Header = (props) => {
  return (
    <div>
      <h2>{props.courseName}</h2>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.partName} {props.numberOfExercises}
      </p>
    </div>
  );
};

const Content = (props) =>
  props?.parts?.map((part) => (
    <Part
      key={part.id}
      partName={part.name}
      numberOfExercises={part.exercises}
    />
  ));

const getTotal = (items) =>
  [...(items ?? [])]
    .map((item) => item.exercises)
    .reduce((acummulator, currentValue) => acummulator + currentValue, 0);

const Total = ({ parts }) => {
  return (
    <div>
      <h4>Number of exercises {getTotal(parts)}</h4>
    </div>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <>
      <Header courseName={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default Course;
