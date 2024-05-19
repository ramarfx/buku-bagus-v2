import axios from "axios";
import { Button, Form } from "react-bootstrap";

const BookAdd = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const authors = e.target.authors.value.split(',').map(author => author.trim())

        try {
            const response = await axios.post("/book", {
                title: e.target.title.value,
                pages: e.target.pages.value,
                isbn: e.target.isbn.value,
                authors: authors,
            });

            console.log(response);
        } catch (error) {
            console.log(error.response.data);
        }
    };
    return (
        <div>
            <h1>Add new Book</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>title</Form.Label>
                    <Form.Control type="text" name="title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>pages</Form.Label>
                    <Form.Control type="number" name="pages" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>isbn</Form.Label>
                    <Form.Control type="text" name="isbn" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>authors (seperated with commas)</Form.Label>
                    <Form.Control type="text" name="authors" placeholder="example: author1, author2, author3, dst" />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">Add</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default BookAdd;
