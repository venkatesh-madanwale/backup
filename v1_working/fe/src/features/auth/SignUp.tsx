import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { signUpAPI } from "../apis/signUpApi";
import './Signup.css';

const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [emailid, setEmailid] = useState("");
    const [name, setName] = useState("");
    const [phno, setPhno] = useState("");
    const [pwd, setPwd] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(signUpAPI({ emailid, name, phno, pwd }));
        console.log("Result of signUpAPI:", resultAction);
    };

    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <form className="auth-form" onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <label>Email</label>
            <input type="email" value={emailid} onChange={(e) => setEmailid(e.target.value)} />
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Phone Number</label>
            <input type="tel" value={phno} onChange={(e) => setPhno(e.target.value)} />
            <label>Password</label>
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <button type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
            </button>
            {isAuthenticated && <p className="success-msg">Signup successful</p>}
            {error && !isAuthenticated && <p className="error-msg">{error}</p>}
        </form>
    );
};

export default SignUp;