import axios from "axios";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useStateContext } from "../context/stateContext";
import { Link } from "react-router-dom";

const Topbar = () => {
    const { token, setToken } = useStateContext();
    const handleLogout = async () => {
        try {
            const response = await axios.get("/auth/logout");
            setToken(null);
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <Navbar className="bg-body-secondary">
            <Container>
                <Navbar.Brand href="/">Buku Bagus</Navbar.Brand>

                <Nav>
                    {token ? (
                        <>
                            <Nav.Item>
                                <Nav.Link variant="danger" as={Link} to={'/book/add'}>
                                    Add book
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="danger" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Nav.Item>
                        </>
                    ) : (
                        <>
                            <Nav.Item>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav.Item>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Topbar;
