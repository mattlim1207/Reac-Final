// Landing page for notes, with notes index side drawer and main note
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Checkbox from '../components/Checkbox'
import { deleteNotes, getNotes } from '../api'
import { toast } from 'react-toastify'

export default function Index (props) {
  const [notes, setNotes] = useState([])
  const [isChecked, setIsChecked] = useState([])

  useEffect(() => {
    document.title = `Admin Page`
    getNotes().then(notes => {
      setNotes(notes)
    })
  }, [notes])

  return (
    <div className='index-page'>
      <h1>All Notes</h1>
      <Checkbox
        label='All'
        isIndeterminate={
          isChecked.length !== 0 && isChecked.length !== notes.length
        }
        checked={isChecked.length === notes.length}
        onChange={() => {
          if (isChecked.length === notes.length) {
            setIsChecked([])
          } else {
            setIsChecked(notes.map(note => note.id))
          }
        }}
      />
      Select All
      <br />
      <ul className='list-group'>
        {notes.map(note => {
          return (
            <li className='list-group-item' key={note.id}>
              <Checkbox
                label={note.id}
                isIndeterminate={false}
                checked={isChecked.includes(note.id)}
                onChange={checked => {
                  setIsChecked([...isChecked, note.id])
                  if (!checked) {
                    setIsChecked(isChecked.filter(id => id !== note.id))
                  }
                }}
              />
              {' ' + note.name}
            </li>
          )
        })}
      </ul>
      <br></br>
      <button
        type='button'
        className='btn btn-danger'
        onClick={() => {
          deleteNotes(isChecked)
          setIsChecked([])
          toast.success('Succesfully deleted')
        }}
      >
        Delete
      </button>
      <br />
      <br />
      <Link to='/login' className='card-link'>
        Return to login
      </Link>
    </div>
  )
}
