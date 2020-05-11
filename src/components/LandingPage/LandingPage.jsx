import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {
  Container,
  Row,
} from 'react-bootstrap';
import Preview from './Preview';
import './LandingPage.css';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = props.firebase;
    this.history = props.history;
    this.state = {
      data: [],
      articles: [],
    };
  }

  populateArticles() {
    var articles = [];
    const numItems = this.state.data.length;

    if (numItems === 0) {
      var empty = <div>Sorry, no articles to read!</div>;
      this.setState({articles: empty});
      return;
    }
    
    for (let i = 0; i < numItems; i++) {
      articles.push(
        <Preview
          key={i}
          article={this.state.data[i]}
        />
      );
    }

    this.setState({articles: articles});
  }

  componentDidMount() {
    var data = [];

    var query = this.firebase.getArticles();
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          data.push(childSnapshot.val());
        })
      })
      .then(() => { 
        this.setState({data: data});
      })
      .then(() => this.populateArticles());
  }

  render() {
    return(
      <Container>
        <Row className="row-container">
          {this.state.articles}
        </Row> 
      </Container>
    )
  }
}

export default withFirebase(withRouter(LandingPage));

