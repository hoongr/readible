import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Card,
    Button,
  } from 'react-bootstrap';

const Preview = (props) => {
    const { article, history } = props;

    const viewArticle = () => {
        history.push('/viewarticle/' + article.key);
    }

    return (
        <Card className="preview center mb-5">
            <Card.Header>{article.author}</Card.Header>
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <iframe
                    src={article.src}
                    scrolling="no"
                >
                </iframe>
                <Button className="read-btn" variant="info" onClick={viewArticle}>
                    Read More
                </Button>
            </Card.Body>
        </Card>
    )
}

export default withRouter(Preview);
