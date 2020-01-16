import { 
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants.js';

const initialStateSearch = {
	searchField: ''
}

export const searchRobots = (state=initialStateSearch, action={}) => {
	switch(action.type) {
		case CHANGE_SEARCH_FIELD:   
		// action object we receive has 2 attributes: .type and .payload
		// if the type  we received is called CHANGE-SEARCH-FIELD
			return Object.assign({}, state, {searchField: action.payload})
			// it means return an object with things in state, and update searchField to action.payload
			// since state cannot be modified
		default:  // if it's not the case, then return this
			return state; 
	}
}


const initialStateRobots = {
	isPending: false,
	robots: [],
	error: ''
}

export const requestRobots = (state=initialStateRobots, action={}) => {
	switch(action.type) {
		case REQUEST_ROBOTS_PENDING:
			return Object.assign({}, state, { isPending: true })  //new isPending state
		case REQUEST_ROBOTS_SUCCESS:
			return Object.assign({}, state, { robots: action.payload, isPending: false })
		case REQUEST_ROBOTS_FAILED:
			return Object.assign({}, state, { error: action.payload, isPending: false }) //new error state
		default:
			return state;
	}
}





