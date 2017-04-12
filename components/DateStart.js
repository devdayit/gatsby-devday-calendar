import React from 'react';

import moment from 'moment';
import 'moment/locale/it';
moment.locale('it');

const DateStart = React.createClass({
  render() {
    const { start } = this.props;

    let format = 'dddd, DD MMMM @ HH:mm';

    return (
      <span style={{
        'color': 'gray',
      }}>
        <span> {moment(start).format(format)} </span>
      </span>
    );
  }
});

export default DateStart;
