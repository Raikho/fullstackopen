const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => (
  <h4>
    Total of {parts.reduce((prev, curr) => curr.exercises + prev, 0)} exercises
  </h4>
)

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      (
        <Part part={part} key={part.id} />
      )
    )}
  </>

const Course = (props) => {
  const { name, parts } = props.course;
  return (
    <div>
      <Header course={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default Course