import React, { Component, Fragment } from "react";
import classnames from 'classnames';

class ExpandableSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1
    };
  }

  reset = () => {
    this.setState({
      selected: -1
    });
  }

  clickSection = (index) => {
    if (this.state.selected != index) {
      this.setState({
        selected: index
      });
    }
  }

  render() {
    var {sections} = this.props;
    return (
      <div className="d-flex flex-column sections">
        {sections.map((Section, index) => (
          <div key={index} className={classnames('section container py-3', {
              'border-bottom': index != sections.length - 1,
              'border-secondary': this.state.selected < 0,
              'border-light': this.state.selected >= 0,
              'min': this.state.selected >= 0 && this.state.selected != index,
              'small': this.state.selected < 0,
              'full': this.state.selected == index,
              'flex-fill': this.state.selected < 0,
              'flex-grow-1': this.state.selected == index
            })}
            onClick={() => this.clickSection(index)}
            >
            <Section state={
                this.state.selected < 0 ? 'small' : (this.state.selected == index ? 'full' : 'min')
              } />
          </div>
        ))}
      </div>
    )
  }
}

export default ExpandableSections;
