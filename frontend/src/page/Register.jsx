import axios from "axios";
import { useStateContext } from "../context/stateContext";
import { Button, Form } from "react-bootstrap";

const Register = () => {
    const { setToken } = useStateContext();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/auth/register", {
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                username: e.target.username.value,
                password: e.target.password.value,
            });

            setToken(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };
    return (
        <div>
            <h1>Register</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>first_name</Form.Label>
                    <Form.Control type="text" name="first_name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>last_name</Form.Label>
                    <Form.Control type="text" name="last_name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text" name="username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" name="password" />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">Register</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Register;
