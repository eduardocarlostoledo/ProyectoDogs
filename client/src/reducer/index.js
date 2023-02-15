const initialState = {
    dog: [],
    error: null,
    isLoading: false,
    dogs: [],    
    dogsView: [],
    temperament: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "POST_DOG_REQUEST":
        return { ...state, isLoading: true };
      case "POST_DOG_SUCCESS":
        return { ...state, dog: [...state.dog, action.payload], isLoading: false };
      case "POST_DOG_ERROR":
        return { ...state, error: action.payload, isLoading: false };
      case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                dogsView: action.payload
            };
        case 'GET_DOGS_BY_NAME':
            return {
                ...state,
                dogs: action.payload,
                dogsView: action.payload
            };
        case 'GET_DOG_BY_ID':
            return {
                ...state,
                dog: action.payload
            };
        case 'GET_TEMPERAMENT':
            return {
                ...state,
                temperament: action.payload
            };
        case 'FILTER':
            let filteredDogs = state.dogs;
            if (action.payload[0] !== "all") filteredDogs = filteredDogs.filter(dog => ((action.payload[0] === "api") === dog.fromAPI));
            if (action.payload[1] !== "all") filteredDogs = filteredDogs.filter(dog => dog.temperament.includes(action.payload[1]));
            return {
                ...state,
                dogsView: filteredDogs
            };
        case 'ORDER_BY':
            if (action.payload === "name-asc") {
                return {
                    ...state,
                    dogsView: state.dogsView.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        return 0;
                    })
                };}
            else if (action.payload === "name-desc") {
                return {
                    ...state,
                    dogsView: state.dogsView.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        return 0;
                    })
                };}
            else if (action.payload === "weight-asc") {
                return {
                    ...state,
                    dogsView: state.dogsView.sort(function (a, b) {
                        let weightsA = a.weight.split(" ");
                        let weightsB = b.weight.split(" ");
                        if (weightsA[0] > weightsB[0]) return 1;
                        if (weightsA[0] < weightsB[0]) return -1;
                        if (weightsA[2] > weightsB[2]) return 1;
                        if (weightsA[2] < weightsB[2]) return -1;
                        return 0;
                    })
                };}
            else if (action.payload === "weight-desc") {
                return {
                    ...state,
                    dogsView: state.dogsView.sort(function (a, b) {
                        let weightsA = a.weight.split(" ");
                        let weightsB = b.weight.split(" ");
                        if (weightsA[0] > weightsB[0]) return -1;
                        if (weightsA[0] < weightsB[0]) return 1;
                        if (weightsA[2] > weightsB[2]) return -1;
                        if (weightsA[2] < weightsB[2]) return 1;
                        return 0;
                    })
                };}
            return state;
        default:
            return state;
    }
};