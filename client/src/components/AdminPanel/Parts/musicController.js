
export const playerFetch = (type, method) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    return fetch(`${serverUrl}/player/${type}`, {
        method: method
    })
}
