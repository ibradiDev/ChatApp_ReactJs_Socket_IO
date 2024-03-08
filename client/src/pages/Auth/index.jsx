import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import Logo from "./../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute, loginRoute } from "./../../utils/APIRoutes";
import "./style.css";
import { FiLogOut } from "react-icons/fi";

function Auth() {

    const [isContainerActive, setContainerActive] = useState('')
    const handleContainerActive = () => {
        isContainerActive === "active" ? setContainerActive('') : setContainerActive('active')
    }
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-center",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        className: 'toast-custom-color',
    };


    // Register
    const [registerValues, setRegisterValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/");
        }
    }, [navigate]);
    const handleRegisterChange = (e) => {
        setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
    };
    const handleRegisterValidation = () => {
        const { password, confirmPassword, username, email } = registerValues;
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            );
            return false;
        } else if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }

        return true;
    };
    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        if (handleRegisterValidation()) {
            const { email, username, password } = registerValues;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                );
                navigate("/");
            }
        }
    };


    // LOGIN
    const [loginValues, setLoginValues] = useState({ username: "", password: "" });
    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/chat");
        }
    }, [navigate]);
    const handleLoginChange = (e) => {
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
    };
    const validateLoginForm = () => {
        const { username, password } = loginValues;
        if (username === "") {
            toast.error("Email and Password is required.", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("Email and Password is required.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            const { username, password } = loginValues;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                );

                navigate("/chat");
            }
        }
    };

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

            <div className={`container ${isContainerActive}`} id="container">
                {/* REGISTER */}
                <div className="form-container sign-up">
                    <form>
                        <h1>Inscrivez-vous</h1>
                        <div className="social-icons">
                            <Link to="#" className="icon"><i className="fa-brands fa-google-plus-g"></i>
                            </Link>
                            <Link to="#" className="icon"><i className="fa-brands fa-facebook-f"></i></Link>
                            <Link to="#" className="icon"><i className="fa-brands fa-github"></i></Link>
                            <Link to="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></Link>
                        </div>
                        <span>ou utilisez votre email pour vous enregistrer</span>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => handleRegisterChange(e)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => handleRegisterChange(e)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleRegisterChange(e)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(e) => handleRegisterChange(e)}
                        />
                        <button type="button" onClick={handleSubmitRegister}>S'inscrire</button>
                    </form>
                </div>

                {/* LOGIN */}
                <div className="form-container sign-in">
                    <form>
                        <h1>Connectez-vous</h1>
                        <div className="social-icons">
                            <Link to="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></Link>
                            <Link to="#" className="icon"><i className="fa-brands fa-facebook-f"></i></Link>
                            <Link to="#" className="icon"><i className="fa-brands fa-github"></i></Link>
                            <Link to="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></Link>
                        </div>
                        <span>ou utiliser votre mot de passe d'email</span>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => handleLoginChange(e)}
                            min="3"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleLoginChange(e)}
                        />
                        <Link to="#">Mot de passe oublié ?</Link>
                        <button type="button" onClick={handleSubmitLogin}>Se connecter</button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Salut, frangin!</h1>
                            <p>Enregistrez-vous avec vos données personnelles et admiez</p>
                            <button className="hidden" id="login" onClick={handleContainerActive}>Se connecter</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Heureux de vous revoir!</h1>
                            <p>Entrer vos informations personnelles pour accéder à vos chats</p>
                            <button className="hidden" id="register" onClick={handleContainerActive}>S'inscrire</button>
                        </div>
                    </div>
                </div>

                <ToastContainer />
            </div>
        </>

    )
}

export default Auth
