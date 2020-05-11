import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { withFirebase } from '../Firebase';
import {
  Form,
  Button,
  Container,
} from 'react-bootstrap';
import './AddArticle.css'

const AddArticle = (props) => {
  const { firebase, history } = props;

  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    title: '',
    author: '',
    tag: '',
  });

  const handleHelp = () => {
    document.querySelector('.help-container').classList.toggle('show');
  }

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      console.log("Validation failed");
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    e.preventDefault();

    const {
      title,
      author,
      tag,
    } = values;
    const src = tag.match(/"(.*?)"/)[1];

    const key = firebase.addArticle().key;
    console.log(key);

    return firebase.addArticle().set({
      key,
      title,
      author,
      src,
    })
    .then(() => {
      history.push('/');
    }); 
  }

  return(
    <div>
      <style type="text/css">
        {`
          .container {
            width: 80%;
            max-width: 500px;
            margin-bottom: 25px;
            // border: 1px solid black;
            box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2);
            border-radius: 10px;
            padding: 25px;
          }

          h2 {
            margin-bottom: 20px;
            text-align: center;
          }
        `}
      </style>
      <Container>
        <h2>Upload an article</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Article Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              value={values.title}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Title is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              placeholder="Enter author name"
              value={values.author}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Author is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicTag">
            <Form.Label>
              Source            
              <a id="help" onClick={handleHelp}></a>
            </Form.Label>
            <div className="help-container">
              <h6>How to add an article</h6>
              <ol>
                <li>Go to the Google Doc that you wish to add.</li>
                <li>Click <b>File</b>.</li>
                <li>Then click <b>Publish to web</b>.</li>
                <li>Click on the <b>Embed tab</b>.</li>
                <li>Copy and paste the entire link.</li>
              </ol>
            </div>
            <Form.Control
              type="text"
              name="tag"
              placeholder="Enter iframe tag"
              value={values.tag}
              onChange={handleInputChange}
              required
              pattern="^<\s*iframe[^>]*>(.*?)<\s*/\s*iframe>$"
            />
            <Form.Control.Feedback type="invalid">
              Enter a valid iframe tag.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="info" className="mb-3" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default withFirebase(withRouter(AddArticle));
