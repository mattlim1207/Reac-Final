import './Modal.css'
import CodeInput from '../components/CodeInput'
import { useState } from 'react'
export default function CreateModal (props) {
  const [title, setTitle] = useState('')
  return (
    <>
      <div className='custom-modal-backdrop'></div>
      <div className='custom-modal'>
        <form onSubmit={props.onSubmit}>
          <CodeInput
            header={props.title}
            id='code'
            state={title}
            onChange={updatedValue => {
              setTitle(updatedValue)
            }}
            isValid={true}
          />
          <button
            type='button'
            className='btn btn-light'
            onClick={props.onClose}
          >
            Close
          </button>
          <div>{props.children}</div>
        </form>
      </div>
    </>
  )
}
