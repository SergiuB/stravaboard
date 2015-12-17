import React from 'react';

let ActivityList = React.createClass({
  render: function() {
    console.log(this.props.activities);
    var rows = this.props.activities.map(
      activity => <div>{activity.id}, {activity.name}, {activity.date}</div>
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
