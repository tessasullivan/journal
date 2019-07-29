import React, { Component } from "react";
import JournalEntries from "./JournalEntries/JournalEntries";

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      entries: {}
    };
  }
  async UNSAFE_componentWillMount() {
    const entries = await this.props.getJournalEntries();

    this.setState({ entries });
  }

  handlePagination = async url => {
    const entries = await this.props.getJournalEntries(url);

    this.setState({ entries });
  };
  render() {
    return (
      <JournalEntries
        entries={this.state.entries.data}
        nextUrl={this.state.entries.next_page_url}
        prevUrl={this.state.entries.prev_page_url}
        handlePagination={this.handlePagination}
      />
    );
  }
}

export default Welcome;
