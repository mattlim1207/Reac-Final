import './Modal.css'

export default function DeleteModal (props) {
  return (
    <>
      <div className='custom-modal-backdrop'></div>
      <div className='custom-modal'>
        <h3>{props.title}</h3>
        <button
          type='button'
          className='btn btn-danger'
          onClick={props.onDelete}
        >
          Delete
        </button>
        <button type='button' className='btn btn-light' onClick={props.onClose}>
          Close
        </button>
        <div>{props.children}</div>
      </div>
    </>
  )
}
