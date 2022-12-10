import {
  render,
  fireEvent,
  getByText,
  getNodeText
} from '@testing-library/react'

import NoteIndex from '../components/NoteIndex'


test('title', () => {
  const { getAllByTestId } = render(<NoteIndex notes = {[]}/>)

  expect(getAllByTestId('title').map(getNodeText)[0]).toEqual(
    'Favorites'
  )
  expect(getAllByTestId('title').map(getNodeText)[1]).toEqual(
    'Notes'
  )
})
