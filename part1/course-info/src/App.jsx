const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => {return (
        <Part 
          name={part.name} 
          exercises={part.exercises} 
          key={index}
        />
      )})}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts.reduce((prev, cur) => cur.exercises + prev, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of react',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ]
  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
}

export default App
