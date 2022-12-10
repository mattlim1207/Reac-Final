const port = 3001

export function getChart (id) {
  return Promise.all([
    fetch(`http://localhost:${port}/charts/${id}`).then(value => value.json()),
    fetch(`http://localhost:${port}/notes`)
      .then(value => value.json())
      .then(json => {
        return json.filter(note => {
          return note.parent_id === id
        })
      })
  ]).then(responses => {
    return responses
  })
}

export function deleteNotes (idList) {
  return Promise.all([
    idList.map(id => {
      deleteNote(id)
      return true
    })
  ])
}

export function getNote (id) {
  return fetch(`http://localhost:${port}/notes/${id}`).then(response => {
    return response.json()
  })
}

export function getNotes () {
  return fetch(`http://localhost:${port}/notes`).then(response => {
    return response.json()
  })
}

export function checkCode (id) {
  return fetch(`http://localhost:${port}/charts/${id}`)
}

export function createChart (id) {
  return checkCode(id).then(response => {
    if (response.status >= 400) {
      return fetch(`http://localhost:${port}/charts/`, {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          name: 'Untitled'
        }),
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => {
        return true
      })
    } else {
      return false
    }
  })
}

export function createNote (parentid, name) {
  return getID().then(id => {
    fetch(`http://localhost:${port}/notes/`, {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        parent_id: parentid,
        name: name,
        favorite: false,
        favorite_date: '',
        body: ''
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        return json.id
      })
  })
}

export function getID () {
  return fetch(`http://localhost:${port}/notes`)
    .then(value => {
      return value.json()
    })
    .then(json => {
      const ids = json.map(object => {
        return object.id
      })
      return Math.max(...ids) + 1
    })
}

export function renameChart (id, name) {
  return fetch(`http://localhost:${port}/charts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: name
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => {
    return response
  })
}

export function saveNote (id, name, body) {
  return fetch(`http://localhost:${port}/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      body: body
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => {
    if (response.status >= 400) {
      return Promise.reject()
    }

    return response.json()
  })
}

export function setFavorite (id, type) {
  const current = new Date()
  return fetch(`http://localhost:${port}/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      favorite: type,
      favorite_date: `${current.getFullYear()}-${current.getMonth() +
        1}-${current.getDate()}`
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => {
    if (response.status >= 400) {
      return Promise.reject()
    }

    return response.json()
  })
}

export function deleteNote (id) {
  return fetch(`http://localhost:${port}/notes/${id}`, {
    method: 'DELETE'
  })
}
