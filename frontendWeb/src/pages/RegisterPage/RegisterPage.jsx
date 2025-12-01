/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../../utils/session";

function RegisterPage(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleReg = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email,password, userName: username})
            });
            const data = await res.json();

            if(!res.ok){
                setError(data.error || "Error desconocido");
                return;
            }

            setUserSession(data);
            navigate("/");
        }catch (err) {
            console.error(err);
            console.log(err);
            setError("Error al conectarse al servidor");
        }
    }

    return (
        <>
            <form onSubmit={handleReg}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default RegisterPage;