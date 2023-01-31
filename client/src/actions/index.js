import axios from 'axios';
export const actions = {
  GET_DOGS: 'GET_DOGS',
  GET_DOGS_BY_NAME: 'GET_DOGS_BY_NAME',
  GET_DOG_BY_ID: 'GET_DOG_BY_ID',
  GET_TEMPERAMENTS: 'GET_TEMPERAMENTS',
  ORDER_BY: 'ORDER_BY',
  FILTER: 'FILTER',
  CREATE_DOG: 'CREATE_DOG',
  POST_DOG_REQUEST: 'POST_DOG_REQUEST',
  POST_DOG_SUCCESS: 'POST_DOG_SUCCESS',
  POST_DOG_ERROR: 'POST_DOG_ERROR'
  };

export const getDogs = () => {
    return async function (dispatch) {
      const { data } = await axios.get("http://localhost:3001/dogs");
      dispatch({ type: 'GET_DOGS', payload: data });
    };
  };

  export const postDog = payload => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3001/dog", payload)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  };
  
// export const postDog = (dog) => {
//   return async (dispatch) => {
//     console.log("actionPostdog", dog, dispatch);
//     try {
//       const response = await fetch('/dog', {
//         method: "POST",
//         body: JSON.stringify(dog),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("POSTDOG FETCH RESPONSE",response);
//       if (response.status === 200) {
//         const data = await response.json();
//         dispatch({ url: data.message });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
      
  export const getTemperaments = () => {
    return async function (dispatch) {
      const { data } = await axios.get("http://localhost:3001/temperament");
      dispatch({ type: 'GET_TEMPERAMENTS', payload: data });
    };
  };

export function getDogsByName (name) {
  console.log("ACTION GETDOGNAME", (name) );
  return async function (dispatch) {
    console.log("ACTION GETDOGNAME", (dispatch) );
    return axios.get(`/dogs?name=${name}`)
       .then(json => dispatch({type: 'GET_DOGS_BY_NAME',
                              payload: json.data}));
    }
}

export function getDogById (id) {
    return async function (dispatch) {
        return axios.get(`/dogs/${id}`)
                    .then(json => dispatch({type: 'GET_DOG_BY_ID',
                                            payload: json.data}))
                    .catch(error => dispatch({type: 'GET_DOG_BY_ID',
                    payload: '404'}));
    }
}

export function filter (dataOrigin, temperament) {
    return {
        type: 'FILTER',
        payload: [dataOrigin, temperament]
    }
}

export function orderBy (ordering) {
    return {
        type: 'ORDER_BY',
        payload: ordering
    }
}



/*

const axios = require("axios");

//          ACTION TYPES
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENT = "GET_ALL_TEMPERAMENT";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const CREATE_DOG = "CREATE_DOG";
export const SEARCH_BY_QUERY = "SEARCH_BY_QUERY";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const SORT = "SORT";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const SORT_WEIGHT = "SORT_WEIGHT";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const EDIT_DOG = "EDIT_DOG";
export const DELETE_DOG = "DELETE_DOG";


//                        ACTIONS
//----------------------------------------------------------------------
// export const getAllDogs = () => (dispatch) => {
//   return fetch("http://localhost:3001/dogs")
//   .then((res) => res.json())
//   .then((json) => dispatch({ type: GET_ALL_DOGS, payload: json }));

  export const getAllDogs = () => {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:3001/dogs");
    dispatch({ type: GET_ALL_DOGS, payload: data });
  };
};
//----------------------------------------------------------------------
export const getAllTemperaments = () => {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:3001/temperament");
    dispatch({ type: GET_ALL_TEMPERAMENT, payload: data });
  };
};
//----------------------------------------------------------------------
export const filterDogsByTemp = (payload) => {
  return {
    type: FILTER_BY_TEMP,
    payload: payload,
  };
};
//----------------------------------------------------------------------
export const filterDogsByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
};
//----------------------------------------------------------------------
export const searchByQuery = (payload) => {
  return async function (dispatch) {
    const { data } = await axios.get(
      `http://localhost:3001/dogs?name=${payload}`
    );
    dispatch({
      type: SEARCH_BY_QUERY,
      payload: data,
    });
  };
};
//----------------------------------------------------------------------
export const getDogDetails = (id) => {
  return async function (dispatch) {
    const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
    dispatch({ type: GET_DOG_DETAILS, payload: data });
  };
};
//----------------------------------------------------------------------
export const sort = (payload) => {
  return {
    type: SORT,
    payload,
  };
};
//----------------------------------------------------------------------
export const sortWeight = (payload) => {
  return {
    type: SORT_WEIGHT,
    payload,
  };
};
//----------------------------------------------------------------------
export const createDog = (payload) => {
  return async function (dispatch) {
    const res = await axios.post("http://localhost:3001/dog", payload);
    return res;
  };
};
//----------------------------------------------------------------------
export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};
//----------------------------------------------------------------------
export const editDog = (id, payload) => {
  return async function (dispatch) {
    const res = await axios.put(`http://localhost:3001/dogs/${id}`, payload);
    return res;
  };
};
//----------------------------------------------------------------------
export const deleteDog = (id) => {
  return async function (dispatch) {
    const res = await axios.delete(`http://localhost:3001/dogs/${id}`);
    return res;
  };
};
//----------------------------------------------------------------------
*/