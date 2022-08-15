import { configureStore } from '@reduxjs/toolkit';
import { API } from '../http/phoneAPI';

const GET_PHONES = 'GET_PHONES';
const SET_ERROR = 'SET_ERROR';

const preloadedState = {
  phones: [],
  errorMessage: "",
};

export const getPhones = (phones) => {
  return {
    type: GET_PHONES,
    value: Object.values(phones.map(({ phone }) => phone))
  }
}

export const setError = (error) => {
   return {
     type: SET_ERROR,
     value: error
   }
 }
 
const reducer = (state, action) => {
  const {type, value} = action

  switch (type) {
    case GET_PHONES:
      return {phones: value};
    case SET_ERROR:
      return {...state, errorMessage:value}
    default:
      return state;
  }
}

export const store = configureStore({
  preloadedState,
  reducer,
})


export function fetchPhones() {
  return (dispatch) => {
    API.getPhonesFromDB()
      .then((response) => {
        dispatch(getPhones(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function postPhone(phone) {
  return () => {
    API.addPhoneToDB(phone)
      .catch((err) => {
        console.error(err);
      });
  };
}