import { LinearProgress, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Button from "./components/button/button";
import useLogin from "./hooks/useLogin";

export interface LoginProps {
    className?: string;
    style?: React.CSSProperties;
}


const Login: React.FC<LoginProps> = props => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const history = useHistory();

    const { run, data, loading, error } = useLogin();

    useEffect(() => {
        if (data) {
            history.push("/app")
        }
    }, [data])



    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 auto",
                width: "100%",
                height: "100%"
            }}>
                {loading ? <LinearProgress style={{ width: "12%", marginBottom: "5px" }} /> : null}
                <TextField
                    id="outlined-disabled"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <Button onClick={e => {
                    const formData = new FormData();
                    formData.append("username", username);
                    formData.append("password", password);
                    run("http://127.0.0.1:3001/login", formData)
                }
                }>SING IN</Button>
            </div>
        </>
    )
}

export default Login;