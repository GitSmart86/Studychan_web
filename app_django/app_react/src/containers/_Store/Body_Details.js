import React from "react";
// import { connect } from "react-redux";

import axios from "../../redux/authentication/axios";
// import CustomForm from "./Body_Details_Form";

import { Card } from "antd";

class Body_Details extends React.Component {
    state = {
        content: {},
    };

    fetchArticles = () => {
        const id = this.props.match.params.id;
        const phylum = this.props.match.params.phylum;
        axios
            .get(`http://127.0.0.1:8000/api/${phylum}/${id}`)
            .then((response) => {
                this.setState({
                    content: response.data,
                });
                console.log(response.data);
            });
    };

    componentDidMount() {
        this.fetchArticles();
    }

    render() {
        return (
            <div>
                <Card title={this.state.content.name}>
                    <p> {this.state.content.description} </p>
                </Card>
            </div>
        );
    }
}

export default Body_Details;
