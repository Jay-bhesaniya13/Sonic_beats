import React from 'react';

function Register() {

    return (
        <div class="signup-box">
            <h2>Signup</h2>
            <input type="text" placeholder="Full Name" name="fullname" />
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <input type="password" placeholder="Confirm Password" name="confirm-password" />
            <button type="submit">Sign Up</button>
        </div>
    );

}

export default Register;