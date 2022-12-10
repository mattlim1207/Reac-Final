import {
  render,
  fireEvent,
  getByText,
  getNodeText
} from '@testing-library/react'

import CodeInput from '../components/CodeInput'

test('title', () => {
  const { getAllByTestId } = render(
    <CodeInput
      header='Enter a chart code'
      id='code'
      state='code'
      isValid={true}
      message='Code does not exist'
    />
  )

  expect(getAllByTestId('title').map(getNodeText)[0]).toEqual('Enter a chart code')
})

test('message-valid', () => {
  const { getAllByTestId } = render(
    <CodeInput
      header='Enter a chart code'
      id='code'
      state='code'
      isValid={false}
      message='Code does not exist'
    />
  )

  expect(getAllByTestId('message').map(getNodeText)[0]).toEqual('Code does not exist')
})

test('message-invalid', () => {
  const { getAllByTestId } = render(
    <CodeInput
      header='Enter a chart code'
      id='code'
      state='code'
      isValid={false}
      message='Code does not exist'
    />
  )

  expect(getAllByTestId('message') == null)
})
