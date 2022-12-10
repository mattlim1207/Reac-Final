import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CodeInput from '../components/CodeInput'
import { checkCode } from '../api'
import '../styles.css'
export default function Portal () {
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const [isValid, setValid] = useState(true)
  useEffect(() => {
    document.title = `Access Chart`
  }, [])

  return (
    <div className='center-screen'>
      <form
        className='row g-3 needs-validation'
        onSubmit={event => {
          event.preventDefault()
          checkCode(code).then(response => {
            if (response.status < 400 && code !== '') {
              navigate(`/notes/${code}`)
            } else {
              setValid(false)
              navigate(`/login`)
            }
          })
        }}
      >
        <CodeInput
          header='Enter a chart code'
          id='code'
          state={code}
          isValid={isValid}
          message='Code does not exist'
          onChange={updatedValue => {
            setCode(updatedValue)
          }}
        />
        <Link to='/signup' className='card-link'>
          Create a new chart
        </Link>
      </form>
    </div>
  )
}
