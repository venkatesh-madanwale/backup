import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { signInAPIs } from "../apis/signInApis";
import './Signin.css';

const SignIn: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [emailid, setEmailid] = useState("");
    const [pwd, setPwd] = useState("");

    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(signInAPIs({ emailid, pwd }));
    };

    return (
        <form className="auth-form" onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <label>Email</label>
            <input type="email" value={emailid} onChange={(e) => setEmailid(e.target.value)} />
            <label>Password</label>
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
            </button>
            {isAuthenticated && <p className="success-msg">Signin successful</p>}
            {error && !isAuthenticated && <p className="error-msg">{error}</p>}
        </form>
    );
};

export default SignIn;
