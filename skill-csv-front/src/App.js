import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/skills')
      .then(response => setSkills(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Skills List</h1>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Experience</th>
            <th>Education</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, index) => (
            <tr key={index}>
              <td>{skill.Skill}</td>
              <td>{skill.Experience}</td>
              <td>{skill.Education}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
