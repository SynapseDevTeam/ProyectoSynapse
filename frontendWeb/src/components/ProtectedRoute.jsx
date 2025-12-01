/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null); // null = validando

  useEffect(() => {
    const token = localStorage.getItem("tok");
    const exp = Number(localStorage.getItem("tokenExp"));

    if (!token || Date.now() > exp) {
      localStorage.removeItem("tok");
      localStorage.removeItem("tokenExp");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } else {
      setIsValid(true); // token válido
    }
  }, [navigate]);

  
  if (isValid === null) return <p>Cargando...</p>;

  return children;
}

export default ProtectedRoute;
