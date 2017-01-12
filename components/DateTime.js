import React from 'react';

import moment from 'moment';
import 'moment/locale/it';
moment.locale('it');

const DateTime = React.createClass({
  render() {
    const { start, end } = this.props;

    let format = start.dateTime ? 'dddd, DD MMMM @ HH:mm' : 'dddd, DD MMMM';

    return (
      <span style={{
        'color': 'gray',
      }}>
        <span> {moment(start.dateTime || start.date).format(format)} </span>
        {(() => {
          if (end.dateTime || end.date) {
            const isSameDay = moment(end.dateTime || end.date).isSame(start.dateTime || start.date, 'day');
            if (isSameDay) {
              format = format.replace('dddd, DD MMMM @ ', '');
            }

            return (
              <span>&#9679; {moment(end.dateTime || end.date).format(format)} </span>
            );
          }
        })()}
      </span>
    );
  }
});

export default DateTime;
