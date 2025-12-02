import { ThemeContext, useTheme } from "../../context/theme/ThemeContext";

function ButtonTheme(){
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}
                className="button-theme">

                { darkMode ? (<svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="12" y1="2" x2="12" y2="4" />
                        <line x1="12" y1="20" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="4" y2="12" />
                        <line x1="20" y1="12" x2="22" y2="12" />
                        <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
                        <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
                        <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
                        <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
                    </g>
                </svg>)
                :
                (<svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                >
                    <path
                        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                        fill="currentColor"
                    />
                </svg>)}
        </button>
    );
}

export default ButtonTheme;