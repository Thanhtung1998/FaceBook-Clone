
import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const handleClickLogin = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch,);
        console.log(error);
    }

    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FaceBook</h3>
                    <span className="loginDesc">
                        Đăng nhập gần đây
                    </span>
                    <div className="flex">
                        <div>
                            <a href="/" title="Thanh Tùng" className="_1gbd">
                                <img className="img" src="assets/person/3.jpeg" alt="" style={{ width: "160px", height: "160px" }} />
                                <div className="Name">Tùng</div>
                            </a>
                        </div>
                        <div>
                            <a href="/" title="Thanh Tùng" className="_1gbd">
                                <img className="img" src="assets/person/2.jpeg" alt="" style={{ width: "160px", height: "160px" }} />
                                <div className="Name">Tùng</div>
                            </a>
                        </div>
                        <div>
                            <a href="/" title="Thanh Tùng" className="_1gbd">
                                <img className="img" src="assets/person/1.jpeg" alt="" style={{ width: "160px", height: "160px" }} />
                                <div className="Name">Tùng</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClickLogin} >
                        <input placeholder="Email" type="Email" className="loginInput" required ref={email} />
                        <input placeholder="Password" type="password" className="loginInput" required minLength={6} ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching} >{isFetching ? (<CircularProgress size="20px" color="primary" />) : ("Log In")}</button>
                        <span className="loginForgot" >Forgot Password?</span>
                        <button className="loginRegisterButton" type="submit">
                            {isFetching ? (<CircularProgress size="20px" color="primary" />) : (" Create a New Account")}

                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
