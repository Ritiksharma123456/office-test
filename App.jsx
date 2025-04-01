
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const recordsPerPage = 3;

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const res = await response.json();
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nextPage = () => {
    if ((currentPage + 1) * recordsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openPopup = (user) => {
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <h1>Fetched Data</h1>
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(currentPage * recordsPerPage, (currentPage + 1) * recordsPerPage).map((user) => (
            <tr key={user.id} onClick={() => openPopup(user)} >
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
      <button onClick={nextPage} disabled={(currentPage + 1) * recordsPerPage >= data.length}>Next</button>
      
      {selectedUser && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedUser.name}</h2>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Website:</strong> {selectedUser.website}</p>
            <p><strong>Address:</strong> {`${selectedUser.address.street}, ${selectedUser.address.city}, ${selectedUser.address.zipcode}`}</p>
            <p><strong>Company:</strong> {selectedUser.company.name}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}


    </>
  );
}

export default App;
