export async function login(password) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    let response
    try {
        response = fetch(`${serverUrl}/admin/${password}`)
        return await response
    } catch (error) {
        console.log(error)
        return null
    }
}