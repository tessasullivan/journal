import React, {Component} from "react";
import JournalEntries from './JournalEntries/JournalEntries';

class Welcome extends Component {

  constructor() {
    super(); 
    this.state = {
      entries: {},
    }
  }
  async UNSAFE_componentWillMount() {
    const entries = await this.props.getJournalEntries(); 

    this.setState({entries});
  }
  render() { 
    return ( 
      <JournalEntries /> 
     );
  }
}
 
export default Welcome;

 