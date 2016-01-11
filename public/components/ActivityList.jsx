import React from 'react';
import Activity from './Activity';

let ActivityList = React.createClass({
  getInitialState: function() {
    return {
      activities: []
    };
  },
  componentDidMount: function() {
    fetch(`/activities/`, { method: 'get', credentials: 'same-origin'})
      .then(response => response.json())
      .then(activities => this.setState({activities}))
      .catch(err => console.log(err));
  },
  render: function() {
    console.log(this.state);
    var rows = this.state.activities.map(
      activity => <Activity key={activity.id} activity={activity}/>
    );
    return <div>{rows.length ? rows: 'Loading...'}</div>;
  }
});

export {ActivityList};
