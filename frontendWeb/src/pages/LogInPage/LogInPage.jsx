import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserSession } from "../../utils/session";
import styles from './LogInPage.module.css'; 

function LogInPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email,password})
            });
            const data = await res.json();

            if(!res.ok){
                setError(data.error || "Error desconocido");
                return;
            }

            console.log(data)
            setUserSession(data);
            console.log("Exp Time", localStorage.getItem('tokenExp'));

            navigate("/");
        } catch (err) {
            setError(err.message);
            console.log(error)
        }
    };

    return(
        <>
            <form onSubmit={handleLogin} className={styles.formContainer}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" > Log In</button>
                <p>
                    No tienes cuenta? <Link to="/register">Registrate</Link>
                </p>
            </form>
        </>
    );
}

export default LogInPage