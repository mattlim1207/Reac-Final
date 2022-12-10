// Landing page for notes, with notes index side drawer and main note
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TextArea from '../components/TextArea'
import DeleteModal from '../components/DeleteModal'
import { saveNote, deleteNote, setFavorite } from '../api'
import { toast } from 'react-toastify'
export default function Note (props) {
  const note = useLoaderData()
  const [body, setBody] = useState(note.body)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const [favorite, setNoteFavorite] = useState(note.favorite)

  useEffect(() => {
    document.title = `Note ${note.name}`
  }, [])

  return (
    <div className='note-page'>
      <h1>{note.name}</h1>
      {isModalOpen && (
        <DeleteModal
          title='Are you sure you want to delete?'
          onDelete={() => {
            deleteNote(note.id).then(() => {
              setIsModalOpen(false)
              navigate(`/notes/${note.parent_id}`)
              setIsModalOpen(false)
              toast.success('Successfully deleted')
            })
          }}
          onClose={() => {
            setIsModalOpen(false)
          }}
        ></DeleteModal>
      )}
      <form
        onSubmit={event => {
          event.preventDefault()
          saveNote(note.id, note.name, body)
          toast.success('Your note was successfully saved.')
        }}
      >
        <TextArea
          id={note.name}
          value={body}
          rows='10'
          onChange={updatedBody => {
            setBody(updatedBody)
          }}
          onDelete={() => {
            setIsModalOpen(true)
          }}
          isFavorite={favorite}
          onFavorite={() => {
            if (favorite) {
              setFavorite(note.id, false)
              setNoteFavorite(false)
              toast.error('Unfavorited')
            } else {
              setFavorite(note.id, true)
              setNoteFavorite(true)
              toast.success('Favorited')
            }
          }}
        />
        <Link to={'/notes/' + note.parent_id} className='card-link'>
          Return to Notes
        </Link>
      </form>
    </div>
  )
}
