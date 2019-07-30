import React, { Component } from 'react';
import JournalEntry from '../JournalEntry/JournalEntry';

class SingleJournalEntry extends Component {
  constructor() {
    super();

    this.state = {
      entry: null,
    }
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  async componentWillMount() {
    // console.log(this.props);
    const entry = await this.props.getJournalEntry(this.props.match.params.slug);
    // console.log (entry);
    this.setState({entry});
  };

  render() { 
    return ( 
      <JournalEntry entry={this.state.entry}/>
     );
  }
}
 
export default SingleJournalEntry;