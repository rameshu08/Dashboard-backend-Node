const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let users = [
    {
      id: 1,
      name: "Ramesh1",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 2,
      name: "Ramesh2",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 3,
      name: "Ramesh3",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 4,
      name: "Ramesh4",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 5,
      name: "Ramesh5",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 6,
      name: "Ramesh6",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 7,
      name: "Ramesh7",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 8,
      name: "Ramesh8",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 9,
      name: "Ramesh9",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
      id: 10,
      name: "Ramesh10",
      email:"abc@gmail.com",
      mobile:"8796541236"
    },
    {
        id: 11,
        name: "Ramesh11",
        email:"abc@gmail.com",
        mobile:"8796541236"
    },
    {
        id: 12,
        name: "Ramesh12",
        email:"abc@gmail.com",
        mobile:"8796541236"
    },
    {
        id: 13,
        name: "Ramesh13",
        email:"abc@gmail.com",
        mobile:"8796541236"
    },
    {
        id: 14,
        name: "Ramesh14",
        email:"abc@gmail.com",
        mobile:"8796541236"
    }
  ]


// Get users list
app.post('/users', (req, res) => {
   const { searchTerm, page, limit } = req.body;

  //Search filter
  let filteredUsers = users;
  if (searchTerm) {
    const searchQuery = searchTerm.toLowerCase();
    filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) || 
      user.mobile.toLowerCase().includes(searchQuery)
    );
  }

  //Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  res.json({
    totalUsers: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / limit),
    currentPage: parseInt(page),
    users: paginatedUsers
  });
});

// Edit user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, mobile } = req.body;

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = { ...users[userIndex], name, email, mobile };
  res.json({ message: 'User updated successfully' });
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  users = users.filter(user => user.id !== userId);
  res.json({ message: 'User deleted successfully' });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});