import React, {Component} from 'react';

class LiDropdown extends Component{
  constructor(...opts){
    super(...opts);
    this.state = {};
  }

  handleClick(e){
    if(!this.refs.link.contains(e.target)){
      return this.setState({droppedDown: false});
    }
    return this.setState({droppedDown: !this.state.droppedDown});
  }

  componentWillMount(){
    document.addEventListener('click', this.handleClick.bind(this), false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleClick.bind(this), false);
  }

  render(){
    const {droppedDown}=this.state;
    const className=droppedDown?'dropdown open':'dropdown';
    const {children} = this.props;
    return <li className={className} ref="link">{children}</li>;
  }
}

export default LiDropdown;
