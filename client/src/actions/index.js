import axios from 'axios';

export const GET_DOGS = 'GET_DOGS'
export const GET_DOG_BY_ID= 'GET_DOG_BY_ID'
export const GET_TEMPERAMENT= 'GET_TEMPERAMENT'
export const ORDER_BY= 'ORDER_BY'
export const FILTER= 'FILTER'
export const CREATE_DOG= 'CREATE_DOG'
export const POST_DOG_REQUEST= 'POST_DOG_REQUEST'
export const POST_DOG_SUCCESS= 'POST_DOG_SUCCESS'
export const POST_DOG_ERROR= 'POST_DOG_ERROR'
  

export const getDogs = () => {
    return async function (dispatch) {
      const { data } = await axios.get("/dogs");
      dispatch({ type: 'GET_DOGS', payload: data });
    };
  };

export const postDog = (dog) => {
  return async (dispatch) => {
    console.log("actionPostdog", dog);
    try {
      const response = await fetch("http://localhost:3001/dog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dog),
      });
      console.log("POSTDOG FETCH RESPONSE", response);
      const data = await response.json();
      dispatch({ type: "POST_DOG", payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};
      
  export const getTemperaments = () => {
    return async function (dispatch) {
      const { data } = await axios.get("/temperament");
      dispatch({ type: 'GET_TEMPERAMENT', payload: data });
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