import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState(false);
    const auth = getAuth();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = () => {
        signInWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {})
            .catch((error) => {
                setError(true);
            });
    };
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col">
                <p className="headers mb-3">Login</p>
                <input
                    onChange={(e) => setLogin(e.target.value)}
                    type="email"
                    value={login}
                    placeholder="Login"
                    className="input"
                />
                {error ? (
                    <span className="text-red-700">Невірна почта або така вже існує</span>
                ) : null}
            </div>
            <div className="flex flex-col">
                <p className="headers mb-3">Password</p>
                <input
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="value"
                    value={password}
                />
                {error ? <span className="text-red-700">Невірний пароль</span> : null}
            </div>
            <button className="button w-64" onClick={loginUser}>
                Login
            </button>
            <NavLink to="/registration">
                <button className="button w-64">Register</button>
            </NavLink>
        </div>
    );
};

export default Login;
