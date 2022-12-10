// Landing page for notes, with notes index side drawer and main note
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CreateModal from '../components/CreateModal'
import NoteIndex from '../components/NoteIndex'
import { createNote, getChart, renameChart } from '../api'
import { toast } from 'react-toastify'

export default function Index (props) {
  const [chart, setChart] = useState(useLoaderData()[0])
  const [notes, setNotes] = useState(useLoaderData()[1])

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    document.title = `Notes for ${chart.id}`
    getChart(chart.id).then(response => {
      setChart(response[0])
      setNotes(response[1])
    })
  }, [isNoteModalOpen, isTitleModalOpen, notes, chart])

  return (
    <div className='index-page'>
      <h1 data-testid = "td-title">{chart.name}</h1>
      <button
        type='button'
        className='btn btn-success'
        onClick={() => {
          setIsNoteModalOpen(true)
        }}
      >
        Create Note
      </button>
      <button
        type='button'
        className='btn btn-info'
        onClick={() => {
          setIsTitleModalOpen(true)
        }}
      >
        Change Title
      </button>
      <br></br>
      <br></br>

      <NoteIndex notes={notes} />
      <br />
      <br />
      <Link to='/login' className='card-link'>
        Enter another code
      </Link>
      {isNoteModalOpen && (
        <CreateModal
          title='Enter the name of the new note'
          onSubmit={event => {
            event.preventDefault()
            createNote(chart.id, event.target[0].value).then(() => {
              setIsNoteModalOpen(false)
              toast.success('Successfully created')
              navigate(`/notes/${chart.id}`)
            })
          }}
          onClose={() => {
            setIsNoteModalOpen(false)
          }}
        ></CreateModal>
      )}
      {isTitleModalOpen && (
        <CreateModal
          title='Enter the new title'
          onSubmit={event => {
            event.preventDefault()
            renameChart(chart.id, event.target[0].value).then(() => {
              setIsTitleModalOpen(false)
              toast.success('Successfully renamed')
              navigate(`/notes/${chart.id}`)
            })
          }}
          onClose={() => {
            setIsTitleModalOpen(false)
          }}
        ></CreateModal>
      )}
    </div>
  )
}
