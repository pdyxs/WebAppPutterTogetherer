import { library } from '@fortawesome/fontawesome-svg-core';
import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBan, faCheck } from '@fortawesome/pro-regular-svg-icons';

library.add(faEdit);
library.add(faBan);
library.add(faCheck);

class LockableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLocked: true,
      value: props.value
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.value != prevProps.value) {
      this.setState({
        value: this.props.value,
        initialValue: this.props.value,
        isLocked: true
      });
    }
  }

  unlock = () => {
    this.setState({
      isLocked: false,
      initialValue: this.state.value
    });
    this.props.onUnlock && this.props.onUnlock();
  }

  submit = () => {
    this.setState({
      isLocked: true
    });
    this.props.onSubmit && this.props.onSubmit(this.state.value);
  }

  cancel = () => {
    this.setState({
      isLocked: true,
      value: this.state.initialValue
    });
    this.props.onCancel && this.props.onCancel();
  }

  onChange = (evt) => {
    this.setState({
      value: evt.target.value
    });
  }

  render() {
    var {
      prepend,
      children,
      onUnlock,
      onSubmit,
      onCancel,
      value,
      initialValue,
      ...otherProps
    } = this.props;

    return (
      <div className="input-group">
        {prepend &&
          <div className="input-group-prepend">
            {prepend}
          </div>
        }
        <input readOnly={this.state.isLocked}
          className="form-control"
          value={this.state.value}
          onChange={this.onChange}
          {...otherProps} />
        <div className="input-group-append">
          {this.state.isLocked &&
            <button className="btn btn-danger"
              onClick={this.unlock}>
              <FontAwesomeIcon icon={['far', 'edit']} />
            </button>
          }
          {!this.state.isLocked &&
            <Fragment>
              <button className="btn btn-danger"
                onClick={this.cancel}>
                <FontAwesomeIcon icon={['far', 'ban']} />
              </button>
              <button className="btn btn-success"
                onClick={this.submit}>
                <FontAwesomeIcon icon={['far', 'check']} />
              </button>
            </Fragment>
          }

        </div>
      </div>
    )
  }
}

export default LockableInput;
