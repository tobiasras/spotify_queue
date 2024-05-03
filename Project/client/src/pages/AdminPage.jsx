import React, {useEffect, useState} from "react";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import { BaseLayout } from "../layouts/BaseLayout";

const AdminPage = () => {
    const [password, setPassword] = useState('')
    const [isloggedIn, setIsLoggedIn] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)

    useEffect(() => {
        const secretKey = sessionStorage.getItem("secret_key")
        if (secretKey) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    const login = async () => {
        console.log("password", password)
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admin/${password}`)
        if (!response?.ok) {
            setWrongPassword(true)
        } else {
            const body = await response.json()
            sessionStorage.setItem("secret_key", body.token)
            setIsLoggedIn(true)
        }
    }

    return (
        <BaseLayout>
            {!isloggedIn &&
                <>
                    <div className="text-gray-400 flex justify-center bg-neutral-700 rounded">
                        <div className="w-full  p-5">
                            <div className="flex justify-between">
                                <input type="password" id="email" value={password}
                                       onChange={event => setPassword(event.target.value)}
                                       className="bg-neutral-700 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-7/12 p-2.5"
                                       placeholder="Secret password" required/>
                                <button type="button" onClick={login}
                                        className="text-gray-500 bg-neutral-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-4/12 sm:w-auto px-5 py-2.5 text-center ">Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    {wrongPassword &&
                        <div className="mt-2">
                            <div className="border-red-400 border rounded p-3 text-center">
                                <p className="text-red-400">Wrong password</p>
                            </div>
                        </div>
                    }
                </>
            }
            {isloggedIn && <AdminPanel/>}
        </BaseLayout>

    )
}
export default AdminPage

