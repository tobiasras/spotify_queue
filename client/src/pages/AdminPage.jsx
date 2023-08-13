import React, {useEffect, useState} from "react";
import AdminPanel from "../components/AdminPanel/AdminPanel";

const AdminPage = () => {

    let admin

    useEffect(() => {
        const secretKey = sessionStorage.getItem("secret_key")
        if (secretKey) {
            setIsLoggedIn(true)
        }
    }, [])

    const [password, setPassword] = useState('')
    const [isloggedIn, setIsLoggedIn] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)


    const loginHandler = async () => {
        const response = await login(password)
        if (!response) {
            alert("Server is down")
        } else {
            if (!response?.ok) {
                setWrongPassword(true)
            } else {
                const body = await response.json()
                sessionStorage.setItem("secret_key", body.hash)
                setIsLoggedIn(true)
                admin = React.lazy(() => import("../components/AdminPanel/AdminPanel"))
            }

        }
    }

    return (

        <main className="w-full p-3">
            { !isloggedIn &&
                <>
                    <div className="text-gray-400 flex justify-center bg-neutral-700 rounded">
                        <div className="w-full  p-5">
                            <div className="flex justify-between">
                                <input type="password" id="email" value={password}
                                       onChange={event => setPassword(event.target.value)}
                                       className="bg-neutral-700 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-7/12 p-2.5"
                                       placeholder="Secret password" required/>
                                <button type="button" onClick={loginHandler}
                                        className="text-gray-500 bg-neutral-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-4/12 sm:w-auto px-5 py-2.5 text-center ">Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    { wrongPassword &&
                        <div className="mt-2">
                            <div className="border-red-400 border rounded p-3 text-center">
                                <p className="text-red-400">Wrong password</p>
                            </div>
                        </div>
                    }
                </>
            }

            { isloggedIn && <AdminPanel/> }
        </main>


    )
}
export default AdminPage

export async function login(password) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    try {
        return await fetch(`${serverUrl}/admin/${password}`)
    } catch (error) {
        console.log(error)
        return null
    }
}
