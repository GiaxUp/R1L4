import React, { Component } from "react";
import { ListGroup, Spinner, Form, Button } from "react-bootstrap";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    comment: "",
  };

  componentDidMount() {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.book}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U0ZWUwZGEyNDc4ZDAwMTNhMDU3ZjgiLCJpYXQiOjE2NzU5NDk2NTEsImV4cCI6MTY3NzE1OTI1MX0._NO0wZRYwTVzo1zNylyCQcwcKkEbYjfv-sA-3CXXf38",
      },
    })
      .then((response) => response.json())
      .then((comments) => this.setState({ comments, isLoading: false }))
      .catch((error) => console.error(error));
  }

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      author: "I",
      comment: this.state.comment,
    };

    this.setState((prevState) => ({
      comments: [...prevState.comments, newComment],
      comment: "",
    }));
  };

  render() {
    const { comments, isLoading } = this.state;

    if (isLoading) {
      return <Spinner animation="border" />;
    }

    return (
      <ListGroup variant="flush">
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id}>
            {comment.author} said: {comment.comment}
          </ListGroup.Item>
        ))}

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formComment">
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Inserisci il tuo commento"
              value={this.state.comment}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Invia
          </Button>
        </Form>
      </ListGroup>
    );
  }
}

export default CommentArea;
