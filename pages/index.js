import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import Helmet from "react-helmet";

import _ from 'lodash';

import { rhythm } from '../utils/typography';

import DateStart from '../components/DateStart';

import { config } from 'config';

import fetch from 'isomorphic-fetch';

class Index extends React.Component {
  render() {
    const { calendarFetch } = this.props;

    if (calendarFetch.pending || calendarFetch.rejected) {
      return (
        null
      );
    }

    // calendarFetch.fulfilled
    const events = calendarFetch.value;

    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "DevDay Calendar"},
            {"name": "keywords", "content": "DevDay Calendar"},
          ]}
        />

        {_.sortBy(events, ['date']).map((event, i) => {
            const { date, community, name, speaker, url, location, logo } = event;
            const summary = `${community}: ${name}`;
            return (
              <div key={i}>
                <hr />

                <p style={{
                  'marginBottom': 0,
                }}>
                  <DateStart start={date} />
                </p>
                <h1 style={{
                  'marginBottom': `${rhythm(0.5)}`,
                }}>
                  {(() => {
                    if (url) {
                      return (
                        <a href={url}>
                          <span className="highlight">{summary}</span>
                        </a>
                      );
                    }
                    return (
                      <span className="highlight">{summary}</span>
                    );
                  })()}
                </h1>
                <p style={{
                  'marginBottom': `${rhythm(0.5)}`,
                }}>
                  <strong>{location}</strong>
                </p>

              </div>
            );
          })
        }
      </div>
    );

  }
}

export default connect.defaults({ 'fetch': fetch })(props => {
  const USER  = 'devdayit';
  const REPO  = 'devday';
  const REF   = 'master';

  return {
    'calendarFetch': {
      'url'     : `https://api.github.com/repos/${USER}/${REPO}/contents/src/data/upcomingEvents?ref=${REF}`,
      'then': (contents) => ({
        'value' : fetchContents(contents)
      })
    }
  }
})(Index);

function fetchContents(contents) {
    const promises = [];
    contents.map(
      (content) => promises.push(
        fetch(content.url)
          .then(res => res.json())
          .then(res => atob(res.content))
          .then(res => JSON.parse(res))
      )
    );

    return Promise.all(promises);
}
