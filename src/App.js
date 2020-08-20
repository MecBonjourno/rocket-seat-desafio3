import React, { useState, useEffect }  from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect( () => {
    api.get('/repositories').then(response => {
        setProjects(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo Projeto${Date.now()}`,
      url: "Zago"
   })

   const project = response.data

   setProjects([...projects, project]);

  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
      // const { id } = request.params
    
      const repoIndex = projects.filter((project) => project.id !== id);
      // projects.findIndex(project => project.id === id);
      
      // const noDeleted = 
    
    //   if(repoIndex<0){
    //     return response.status(400).json({error: 'Repository not found'});
    // }
    
      // projects.splice(repoIndex, 1);

      setProjects(repoIndex)
     
      // return response.status(204).send()
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
           {projects.map(project => <div key={project.id}>
                    <h1>{project.title}</h1> 
                    <h3>{project.url}</h3>
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
                     </div>)}

        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
