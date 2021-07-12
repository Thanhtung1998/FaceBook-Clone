import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router"
import { Link } from "react-router-dom";
export default function Register() {
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const passwordAgain = useRef();
    const history = useHistory()

    const handelRegisterClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Password don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            } catch (err) {
                console.log(err);
            }

        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FaceBook</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on FaceBook.
                    </span>
                </div>
                <div className="loginRight" onSubmit={handelRegisterClick}>
                    <form className="loginBox">
                        <input placeholder="Username" type="text" required ref={username} className="loginInput" />
                        <input placeholder="Email" type="email" required ref={email} className="loginInput" />
                        <input placeholder="Password" type="password" required minLength="6" ref={password} className="loginInput" />
                        <input placeholder="Password Again" type="password" required ref={passwordAgain} className="loginInput" />
                        <button className="loginButton" type="submit" >Sign Up</button>
                        <Link to="/login" className="flex justify-center">
                            <button className="loginRegisterButton">
                                Log into Account
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}