import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    const [books, setBooks] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("/book");
            setBooks(response.data);
            console.log(response.data);
        } catch (error) {}
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Home</h1>

            {books &&
                books.map((book) => (
                    <Card className="mb-3">
                        <Card.Header>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Subtitle>
                                Author: {book.authors.join(", ")} <br />
                                average ratings : {book.ratings}
                            </Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <Button as={Link} to={`/book/${book.id}`}>Detail</Button>
                        </Card.Body>
                    </Card>
                ))}
        </div>
    );
};

export default Home;
