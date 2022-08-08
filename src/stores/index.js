import { configureStore } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { ref, onValue, update, child, push } from "firebase/database";

const SET_PHONES = 'SET_PHONES';
const SET_ERROR = 'SET_ERROR';

const preloadedState = {
  phones: [],
  errorMessage: ""
};

export const setPhones = ({phones}) => {
 let value = Object.values(phones).map((item) => item.phone)
  return {
    type: SET_PHONES,
    value: value
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
    case SET_PHONES:
      return {...state, phones:value}
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
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      data != null && dispatch(setPhones(data))
    })
  }
}

export function addPhone(phone) {
  return () => {
    const newPostKey = push(child(ref(db), 'phones')).key;
    const updates = {};

    const phoneData = {
      phone: phone,
      id: new Date().getTime()
    }

    updates['/phones/' + newPostKey] = phoneData;
    update(ref(db), updates)
  }
}