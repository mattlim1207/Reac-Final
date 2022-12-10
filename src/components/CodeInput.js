export default function CodeInput (props) {
  return (
    <>
      <h1 className='display-3' data-testid = "title">{props.header}</h1>
      <input
        className='form-control'
        id={props.id}
        value={props.value}
        onChange={event => {
          props.onChange(event.target.value)
        }}
        required
      />
      {!props.isValid && (
        <div className='invalid-feedback d-block' data-testid = "message">{props.message}</div>
      )}
      <br />
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </>
  )
}
