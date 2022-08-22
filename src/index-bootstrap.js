import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes, useMatch, useNavigate,
  useParams
} from 'react-router-dom';

//import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Table striped bordered>
      <tbody>
        {notes.map(note =>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
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
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
        <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
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
  const [message, setMessage] = useState(null)


  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }


  const padding = {
    padding: 5
  }
  return (
    <div className="container">
      {(message &&
        <Alert variant="success">
          {message}
        </Alert>  
      )}
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">notes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em>{user} logged in</em>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

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


