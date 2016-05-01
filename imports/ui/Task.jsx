import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';


// Task component - represents a single todo item.
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
  }

  render() {
    // Give tasks a different className when they are checked off
    // to add styles in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

    console.log(this.props.currentUser);

    return (
      <li className={ taskClassName }>
        <span>
          <span className="check-complete">
            <input type="checkbox" readOnly checked={ this.props.task.checked } onClick={ this.toggleChecked.bind(this) } />
          </span>

          <span className="delete" onClick={ this.deleteThisTask.bind(this) }>&times;</span>
        </span>
        
        <span className="text">
          <strong> { this.props.task.username }</strong>
          : { this.props.task.text }
        </span>

        { this.props.showPrivateButton ? (
            <span>
              <button className="toggle-private" onClick={ this.togglePrivate.bind(this) }>
                { this.props.task.private ? 'Private' : 'Public' }
              </button>
            </span>
        ) : '' }
      </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required.
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
