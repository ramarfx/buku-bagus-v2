import "./App.css";
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";
import { Container } from "react-bootstrap";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";
axios.defaults.headers.common["Accept"] = "application/json";
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

function App() {
    return (
        <>
            <Topbar />

            <Container>
                <Outlet />
            </Container>
        </>
    );
}

export default App;
