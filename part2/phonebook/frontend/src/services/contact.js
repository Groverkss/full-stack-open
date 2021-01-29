import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then( res => res.data )
    .catch( err => {
      console.log(err);
      return [];
    });
};

const create = newObject => {
  return axios
    .post(baseUrl, newObject)
    .then( res => res.data )
    .catch( err => {
      console.log(err);
      throw err;
    });
};

const remove = id => {
  return axios 
    .delete(`${baseUrl}/${id}`)
    .catch( err => {
      console.log(err);
      throw err;
    });
};

export default { getAll, create, remove }
