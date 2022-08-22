import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes, useMatch, useNavigate,
  useParams
} from 'react-router-dom';

const Home = () => (
  <div>
    <h2>
      TKTL notes app
    </h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but 
      also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets 
      containing Lorem Ipsum passages, and more recently with desktop publishing 
      software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
  </div>
)

const Note = ({ note }) => {
  const id =useParams().id
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}


const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Users = () => (
  <div>
    <h2>Users</h2>
    <ul>
      <li>Julio Rodriguez</li>
      <li>Ty France</li>
      <li>Cal Raleigh</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()
  
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin(event.target.username.value)
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input name="username" />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Julio Rodriguez'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Julio Rodriguez'
    },
    {
      id: 3,
      content: 'Big Dumper hits bombs',
      important: true,
      user: 'Cal Raleigh'
    },
  ])

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  const [user, setUser] = useState(null)
  const login = (user) => {
    setUser(user)
  }


  const padding = {
    padding: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>

        }
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, copying some code...</i>
      </div>
    </div>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)


