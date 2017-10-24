import { getCategoriesApi } from '../api/categories-api'
import { getCategoriesAction } from '../actions/categories-actions'
import { getPostsForCategoryApi} from '../api/categories-api'
import { getPostsForCategoryAction } from '../actions/categories-actions'

export function getCategoriesThunk(){
    return dispatch => {
        getCategoriesApi()           
            .then(res => {
                console.log("getCategoriesThunk ", res)
                dispatch(getCategoriesAction(res))
            })
    }
}

export function getPostsForCategoryThunk(category){
    return dispatch => {
        getPostsForCategoryApi(category)
            .then( res => {
                console.log("getPostsForCategoryThunk ",res)
                dispatch(getPostsForCategoryAction(res))
            })
    }
}