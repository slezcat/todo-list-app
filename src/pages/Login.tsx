import { useState } from "react";

import { Button, Link, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useNavigate } from "react-router-dom";

const AuthPage = ({ Login, Register, signInWithGoogle }: any) => {
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState<Boolean>(true);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const onLogin = () => {
    Login({ loginEmail, loginPassword });
  };
  const onRegister = () => {
    Register({ registerEmail, registerPassword });
  };

  return (
    <div className="flex min-h-screen items-center  justify-center bg-[#001e3c]">
      
      <Card sx={{justifyContent:"center",width:"100%", maxWidth:"500px"}}>
        <CardContent>
          <div className="flex  flex-col text-center">
            <Typography variant="h3" sx={{ marginBottom: "20px" }}>
              {isSignIn ? "Log in" : "Sign in"}
            </Typography>

            <Button
              color="warning"
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ marginBottom: "10px" }}
              onClick={signInWithGoogle}
            >
              Continue With Google
            </Button>
            <p>OR</p>

            <TextField
              sx={{
                marginBottom: "20px",
                marginTop: "20px",
              }}
              label="Email"
              variant="filled"
              required
              onChange={(event) => {
                isSignIn
                  ? setLoginEmail(event.target.value)
                  : setRegisterEmail(event.target.value);
              }}
            />

            <TextField
              sx={{
                marginBottom: "20px",
              }}
              label="Password"
              variant="filled"
              required
              onChange={(event) => {
                isSignIn
                  ? setLoginPassword(event.target.value)
                  : setRegisterPassword(event.target.value);
              }}
            />

            <Button
              variant="contained"
              color="success"
              onClick={isSignIn ? onLogin : onRegister}
            >
              {isSignIn ? "Log in with Email" : "Sign up with Email"}
            </Button>
          </div>
          <Typography sx={{ margin: "20px", textAlign: "center" }}>
            {isSignIn ? "Don't have an account?" : "Already signed up?"}
            <Link
              onClick={() => setIsSignIn(!isSignIn)}
              className="cursor-pointer"
            >
              {isSignIn ? "Sign Up" : "Log In"}
            </Link>
          </Typography>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default AuthPage;
