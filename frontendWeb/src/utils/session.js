export function setUserSession(data){
    localStorage.setItem('tok', data.tok);

    const expiration = Date.now() + 60 * 60 * 1000;
    localStorage.setItem('tokenExp', expiration);
}