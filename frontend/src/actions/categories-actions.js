export const GET_CATEGORIES = "GET_CATEGORIES"
export const GET_POSTS_FOR_CATEGORY = "GET_POSTS_FOR_CATEGORY"

export function getCategoriesAction( { categories }) {
    return {
        type: GET_CATEGORIES,
        categories,
    }
}

export function getPostsForCategoryAction( posts ){
    return {
        type: GET_POSTS_FOR_CATEGORY,
        posts,
    }
}