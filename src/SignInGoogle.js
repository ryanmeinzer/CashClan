const SignInGoogle = () => {

    // const handleCredentialResponse = (res) => {
    //     console.log('Login Success: currentUser:', res.profileObj)
    //     alert(
    //         `Logged in successfully. Welcome to the CashClan, ${res.profileObj.name}.`
    //     )
    // }

    return (
        <>
            <div id="g_id_onload"
                data-client_id="495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com"
                data-login_uri="http://localhost:3000/members"
                // data-callback={handleCredentialResponse}
                // data-ux_mode="redirect"
                data-auto_prompt="false"
            >
            </div>
            <div className="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div>
        </>
    )
}

export default SignInGoogle