import { Link } from 'react-router-dom'

export default function NoteIndex (props) {
  return (
    <div className='notes-index'>
      <h2 data-testid='title'>Favorites</h2>
      <ul className='list-group'>
        {props.notes
          .filter(note => {
            return note.favorite
          })
          .map(note => {
            return (
              <li className='list-group-item' key={note.id}>
                <div className='d-flex w-100 justify-content-between'>
                  <Link
                    to={`/notes/${note.parent_id}/${note.id}`}
                    data-testid={`td-${note.id}`}
                  >
                    {' '}
                    {note.name}{' '}
                  </Link>
                  <small>{note.favorite_date}</small>
                </div>
              </li>
            )
          })}
      </ul>
      <hr></hr>
      <h3 data-testid='title'>Notes</h3>
      <ul className='list-group'>
        {props.notes
          .filter(note => {
            return !note.favorite
          })
          .map(note => {
            return (
              <li className='list-group-item' key={note.id}>
                <Link to={`/notes/${note.parent_id}/${note.id}`}>
                  {' '}
                  {note.name}{' '}
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
