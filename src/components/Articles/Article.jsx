import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {
  Container,
  Row,
  Card,
} from 'react-bootstrap';
import './Article.css';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = props.firebase;
    this.state = {
      articleKey: this.props.match.params.articleKey,
      article: '',
    };
  }

  componentDidMount() {
    var article = [];
    const key = this.state.articleKey;

    var query = this.firebase.getArticles();
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          if (childSnapshot.val().key === key) 
            article = childSnapshot.val();
        })
      })
      .then(() => { 
        this.setState({article: article});
      })
  }

  render() {
    return(
      <Container className="fullview">
        <Row className="row-container">
          <div className="article-container center">
            <h1>{this.state.article.title}</h1>
            <h6>By {this.state.article.author}</h6>
            <iframe src={this.state.article.src}></iframe>
          </div>
        </Row> 
      </Container>
    )
  }
}

export default withFirebase(withRouter(Article));