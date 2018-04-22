import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    
      title: '',
      author: '',
      synopsis : '',
    
  };

  componentDidMount() {
    this.loadArticles();
  };

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  };
  saveArticle = (title,author,synopsis)=>{
    API.saveArticle({
      title: title,
      author:author,
      synopsis:synopsis,
      date: Date.now()
    });
  }
  searchArticles = (search) =>{
    API.searchArticles(search)
    .then((res)=>{
      console.log(res);
    })
    .catch(err => console.log(err));
  }

  deleteArticle = (id) =>{
    API.deleteArticle(id).then(()=>{this.loadArticles()})
    
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name] : value
    });
  };

  

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Title (required)" />
              <Input name="author" value={this.state.author} onChange={this.handleInputChange} placeholder="Author (required)" />
              <TextArea name="synopsis" value={this.state.synopsis} onChange={this.handleInputChange} placeholder="Synopsis (Optional)" />
              <FormBtn 
              onClick = {this.saveArticle}
              title = {this.state.title}
              author = {this.state.author}
              synopsis = {this.state.synopsis}
              >Save Article
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={"/articles/" + article._id}>
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </a>
                    <DeleteBtn id={article._id} onClick = {this.deleteArticle}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
