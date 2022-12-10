export default function TextArea (props) {
  return (
    <>
      <button type='Save' className='btn btn-primary' data-testid="button">
        Save
      </button>
      <button
        type='button'
        className='btn btn-danger'
        onClick={() => {
          props.onDelete()
        }}
        data-testid="button"
      >
        Delete
      </button>
      {props.isFavorite ? (
        <button
          type='button'
          className='btn btn-warning'
          onClick={() => {
            props.onFavorite()
          }}
          data-testid="button"
        >
          Unfavorite
        </button>
      ) : (
        <button
          type='button'
          className='btn btn-info'
          onClick={() => {
            props.onFavorite()
          }}
          data-testid="button"
        >
          Favorite
        </button>
      )}
      <br></br>
      <label htmlFor={props.id} className='form-label' data-testid="label">
        {props.label}
      </label>
      <textarea
        className='form-control'
        id={props.id}
        rows={props.rows}
        value={props.value}
        onChange={event => {
          props.onChange(event.target.value)
        }}
        data-testid="textarea"
      />
    </>
  )
}
