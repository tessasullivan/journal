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
    console.log(event.target.files);
    this.setState({
      [event.target.name]:
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value
    });
  };

  render() {
    return (
      <CreateJournalEntryForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
      />
    );
  }
}
CreateJournalEntry.propTypes = {
  getJournalCategories: PropTypes.func.isRequired,
};
export default CreateJournalEntry;
