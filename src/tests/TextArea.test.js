import {
  render,
  fireEvent,
  getByText,
  getNodeText
} from '@testing-library/react'

import TextArea from '../components/TextArea'

test('buttons', () => {
  const { getAllByTestId } = render(
    <TextArea id="name" value="body" rows='10' isFavorite={true} />
  )

  expect(getAllByTestId('button').map(getNodeText)[0]).toEqual('Save')
  expect(getAllByTestId('button').map(getNodeText)[1]).toEqual('Delete')
  expect(getAllByTestId('button').map(getNodeText)[2]).toEqual('Unfavorite')
})

test('label', () => {
  const { getAllByTestId } = render(
    <TextArea id="name" value="body" rows='10' isFavorite={true} label = "label"/>
  )

  expect(getAllByTestId('label').map(getNodeText)[0]).toEqual('label')
})

test('textarea', () => {
  const { getAllByTestId } = render(
    <TextArea id="name" value="body" rows='10' isFavorite={true} label = "label"/>
  )

  expect(getAllByTestId('textarea'))
})
