import { serviceURL } from './api'
import { auth } from './api'

export function getCategoriesApi(){
    const categoriesURL = `${serviceURL}/categories/`
    return fetch( categoriesURL, {method:"GET", headers:auth()})
            .then(res => res.json())    
}

export function getPostsForCategoryApi(category){
    const postsForCategoryURL = `${serviceURL}/${category}/posts`
    return fetch(postsForCategoryURL, {method:"GET", headers:auth()})
        .then(res => res.json())
}