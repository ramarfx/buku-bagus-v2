import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useStateContext } from "../context/stateContext";

const Login = () => {
    const { setToken } = useStateContext();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/auth/login", {
                username: e.target.username.value,
                password: e.target.password.value,
            });

            setToken(response.data.token);
        } catch (error) {
            console.log(error.response.data);
        }
    };
    return (
        <div>
            <h1>Login</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text" name="username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" name="password" />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">Login</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Login;
