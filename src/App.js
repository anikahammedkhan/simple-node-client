import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch(err => console.log(err))
    form.reset();
  }

  return (
    <div className="App">
      <h1>users: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='name' />
        <br />
        <input type="email" name="email" placeholder='email' />
        <br />
        <button type="submit">Add User</button>
      </form>
      <div>
        {
          users.map(user => <p key={user._id}>{user.name} {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
