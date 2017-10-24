import { GET_CATEGORIES } from '../actions/categories-actions'

export function categoriesReducer(state = null, action){
    switch(action.type){
        case GET_CATEGORIES:
            return action.categories

        default:
            return state
    }
}