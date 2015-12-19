import React from 'react';
import Activity from './Activity';

let ActivityList = React.createClass({
  render: function() {
    var rows = this.props.activities.map(
      activity => <Activity key={activity.id} activity={activity}/>
    );
    return <div>{rows}</div>;
  }
});

let ActivityListWrapper = React.createClass({
  render: function() {
    return <ActivityList activities={myActivities}/>;
  }
});

export {ActivityList, ActivityListWrapper};
