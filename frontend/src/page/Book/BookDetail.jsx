import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});

    const fetchdata = async () => {
        try {
            const response = await axios.get(`/book/${id}`);
            console.log(response.data);
            setBook(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/book/${id}/review`, {
                review: e.target.review.value
            });

            fetchdata()
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);
    return (
        <div>
            <h1 className="mb-5">Book Detail</h1>

            {book && (
                <>
                    <h1 className="mb-3">{book.title}</h1>
                    <h5>
                        ratings: {book.ratings} ({book.ratings_total})
                    </h5>
                    <h5>pages: {book.pages}</h5>
                    <h5>isbn: {book.isbn}</h5>
                    <h5>authors: {book.authors?.join(", ")}</h5>
                    {console.log(book.reviews)}
                </>
            )}

            <h1>Reviews</h1>
            <Form className="mb-3" onSubmit={handleSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                name="review"
                                placeholder="add a review"
                            />
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>

            {book.reviews?.length > 0 ? (
                <ul>
                    {book.reviews.map((review) => (
                        <Card className="border">
                            <p className="bg-secondary text-light">
                                {review.first_name} {review.last_name}
                            </p>
                            <p cl>rating: {review.rating}</p>
                            <p cl>review: {review.review}</p>
                        </Card>
                    ))}
                </ul>
            ) : (
                <p>No reviews</p>
            )}
        </div>
    );
};

export default BookDetail;
