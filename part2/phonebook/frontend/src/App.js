import React, { useState, useEffect } from 'react'
import contactService from './services/contact'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Display = ({ persons, handleDelete }) => {
  return (
    <>
      <ul>
        { persons.map( person => (
          <li key={person.id}> {person.name} {person.number} 
            <Button variant="contained" color="primary" 
              id={person.id} onClick={handleDelete}> delete </Button>  
          </li> )
        ) }
      </ul>
    </>
  );
};

const Form = ({ formValues, setFormValues, handleAdd }) => {
  const handleFormChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value }); 
  };

  return (
    <>
      <h2>
        Add Contact
      </h2>
      <form onSubmit={handleAdd}>
        name: <input 
          name="name"
          value={formValues.name}
          onChange={handleFormChange}
        /> <br />

        number: <input 
          name="number"
          value={formValues.number}
          onChange={handleFormChange}
        /> <br />

        <button type='submit'>add</button>
      </form>
    </>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ formValues, setFormValues ] = useState({ name: "", number: ""});
  const [ filterName, setFilterName ] = useState('');

  const shownPeople = persons.filter( person => {
    return (
      person
      .name
      .toLowerCase()
      .startsWith(filterName.toLowerCase())
    )
  });

  const handleAdd = event => {
    event.preventDefault();

    if (persons.reduce( 
      (accum, value) => accum || (value.name === formValues.name), false)) {
      alert(`${formValues.name} is already added to phonebook`);
      setFormValues({ name: "", number: "" })
    } else {
      contactService
        .create(formValues)
        .then( res => {
          setPersons(persons.concat(res));
        })
        .then( () => {
          setFormValues({ name: "", number: "" })
        });
    }
  };

  const handleDelete = event => {
    event.preventDefault();
    const id = event.currentTarget.id;

    contactService
      .remove(id)
      .catch( err => {
        alert(`Contact is already deleted`)
      })
      .finally( () => {
        setPersons(persons.filter(val => val.id !== +id))  
      });
  }

  const handleFilter = event => {
    setFilterName(event.target.value);
  }

  useEffect(() => {
    contactService
      .getAll()
      .then( data => setPersons(data) );
  }, []);


  return (
    <Container maxWidth="sm">
    <div>
      <h2>
        Phonebook
      </h2>

      <div>
        Filter shown with <input value={filterName} onChange={handleFilter}/>
      </div>

      <Form 
        formValues={formValues}
        setFormValues={setFormValues}
        handleAdd={handleAdd}
      />

      <h2>
        Numbers
      </h2>

      <Display persons={shownPeople} handleDelete={handleDelete}/>
    </div>
    </Container>
  );
}

export default App;
