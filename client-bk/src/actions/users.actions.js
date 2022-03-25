import axios from 'axios';

export const GET_USERS = 'GET_USERS';

const REACT_APP_API_URL = 'http://localhost:3000/';

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL || REACT_APP_API_URL}api/auth/accounts`
      )
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
