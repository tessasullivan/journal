import React, { Component } from "react";
import CreateJournalEntryForm from "./CreateJournalEntryForm/CreateJournalEntryForm";
import { PropTypes } from "prop-types";

class CreateJournalEntry extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      image: null,
      content: "",
      category: null,
      errors: {},
      categories: []
    };
  }

  async UNSAFE_componentWillMount() {
    const categories = await this.props.getJournalCategories();
    this.setState({categories});
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]:
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const entry = await this.props.createJournalEntry(this.state, this.props.token);
      this.props.history.push('/');
    } catch(errors) {
      this.setState({errors});
    }
  }

  render() {
    return (
      <CreateJournalEntryForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
CreateJournalEntry.propTypes = {
  getJournalCategories: PropTypes.func.isRequired,
  createJournalEntry: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
};
export default CreateJournalEntry;
