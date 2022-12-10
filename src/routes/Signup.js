import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CodeInput from '../components/CodeInput'
import { createChart } from '../api'
import '../styles.css'
import { toast } from 'react-toastify'
export default function Signup () {
  const [code, setCode] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    document.title = `Create New Chart`
  }, [])

  return (
    <div className='center-screen'>
      <form
        className='row g-3 needs-validation'
        onSubmit={event => {
          event.preventDefault()
          createChart(code).then(response => {
            navigate(`/notes/${code}`)
            toast.success("Successfully created chart")
          })
        }}
      >
        <CodeInput
          header='Enter a new chart code'
          id='code'
          state={code}
          isValid={true}
          onChange={updatedValue => {
            setCode(updatedValue)
          }}
        />
        <Link to='/login' className='card-link'>
          Access a preexisting chart
        </Link>
      </form>
    </div>
  )
}
