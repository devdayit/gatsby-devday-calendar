import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import Helmet from "react-helmet";

import _ from 'lodash';

import { rhythm } from '../utils/typography';

import DateTime from '../components/DateTime';

import { config } from 'config';

import fetch from 'isomorphic-fetch';

class Index extends React.Component {
  render() {
    const { calendarFetch } = this.props

    if (calendarFetch.pending || calendarFetch.rejected) {
      return (
        null
      );
    }

    // calendarFetch.fulfilled
    const events = calendarFetch.value.items;

    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "DevDay Calendar"},
            {"name": "keywords", "content": "DevDay Calendar"},
          ]}
        />

      {_.sortBy(events, [(o) => {
        if (o.start.dateTime) return o.start.dateTime;
        if (o.start.date) return o.start.date;
      }]).map((event) => {
          const { id, start, end, location, description } = event;
          return (
            <div key={id}>
              <hr />

              <p style={{
                'marginBottom': 0,
              }}>
                <DateTime start={start} end={end} />
              </p>
              <h1 style={{
                'marginBottom': `${rhythm(0.5)}`,
              }}>
                <span className="highlight">{event.summary}</span>

              </h1>
              <p style={{
                'marginBottom': `${rhythm(0.5)}`,
              }}><strong>{location}</strong></p>

            </div>
          );
        })}
      </div>
    );

  }
}

export default connect.defaults({ fetch: fetch })(props => {
  const CALENDAR  = '4u7moanq844inh89ipp5t4ghlc@group.calendar.google.com';
  const KEY       = 'AIzaSyBnJSFE54r9rHTAys4y6-A5h8pdU8KKoSA';

  return {
    'calendarFetch': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR}/events?singleEvents=true&key=${KEY}`,
  }
})(Index);
