import React from 'react';
import 'whatwg-fetch';

import {notifyError, notifySuccess, checkResponseStatus} from '../utils';

let Activity = React.createClass({
  saveActivity: function () {
    var {activity} = this.props;
    fetch(`/activities/${activity.id}/saveTcx`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activity)
    })
      .then(checkResponseStatus)
      .then(response => notifySuccess(`Done saving activity ${activity.name}`))
      .catch(err => notifyError(err));
  },
  render: function() {
    var { activity, ...rest } = this.props;
      console.log(activity);
    return <div {...rest}>
      {activity.startDate}, {activity.type}, {activity.name}
      <button type="button" onClick={this.saveActivity}>Save</button>
    </div>;
  }
});

export default Activity;
