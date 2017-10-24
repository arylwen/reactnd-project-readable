export const serviceURL = "http://localhost:3001"

export function auth(){
    let authHeaders = new Headers()
    authHeaders.append("Authorization", "arylwen")
    authHeaders.append("Content-Type", "application/json")

    return authHeaders
}

