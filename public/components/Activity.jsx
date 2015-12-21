import React from 'react';
import 'whatwg-fetch';

let Activity = React.createClass({
  saveActivity: function (activityId) {
    fetch(`/activities/${activityId}/saveTcx`, {
      method: 'post',
      credentials: 'same-origin'
    }).then(
      response => console.log(`Done saving activity ${activityId}`)
    ).catch(
      err => console.log(err)
    );
  },
  render: function() {
    var { activity, ...rest } = this.props;
      console.log(activity);
    return <div {...rest}>
      {activity.startDate}, {activity.type}, {activity.name}
      <button type="button" onClick={this.saveActivity.bind(this, activity.id)}>Save</button>
    </div>;
  }
});

export default Activity;
