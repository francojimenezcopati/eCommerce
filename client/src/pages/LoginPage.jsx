import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {

    const {handleLogin} = useContext(AuthContext)

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const username = e.target.username.value;
        const password = e.target.password.value;
        handleLogin(username, password)
    }

    return (
        <div>
            <form action="post" onSubmit={handleLoginSubmit}>
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" placeholder="Enter your username" />
                <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="Enter your password" />
                <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "/>
            </form>
        </div>
    );
};

export default LoginPage;