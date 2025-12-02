import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
export function UserProvider({ children }){
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tok = localStorage.getItem("tok");
        if(!tok){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false);
            return;
        }

        fetch("http://localhost:8080/users/me", {
            headers : {
                Authorization: `Bearer ${tok}`
            }
        }).then(res => {
            if(!res.ok) throw new Error("Token inválido");
            return res.json();
        })
        .then(data => setUser(data))
        .catch(() => {
            localStorage.removeItem("tok");
            setUser(null);
        })
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        }, [user]);

    return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
