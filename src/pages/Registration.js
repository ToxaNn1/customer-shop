import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [error, setError] = useState(false);
    const auth = getAuth();

    const register = () => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                navigate("/");
            })
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
            <button className="button w-64" onClick={register}>
                Register
            </button>
        </div>
    );
};

export default Registration;
