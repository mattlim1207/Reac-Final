import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getChart, getNote, getNotes } from './api'
import Index from './routes/Index'
import Root from './routes/Root'
import Note from './routes/Note'
import Portal from './routes/Portal'
import Signup from './routes/Signup'
import Admin from './routes/Admin'
const root = createRoot(document.getElementById('root'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Portal />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/admin',
        element: <Admin />,
        loader ({ params }) {
          return getNotes()
        }
      },
      {
        path: '/notes',
        element: <Root />,
        children: [
          {
            path: '/notes/:id',
            element: <Index />,
            loader ({ params }) {
              return getChart(params.id)
            }
          },
          {
            path: '/notes/:id/:noteid',
            element: <Note />,
            loader ({ params }) {
              return getNote(params.noteid)
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: (
      <div>
        <h1> 404 PAGE NOT FOUND </h1>
      </div>
    )
  }
])

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
