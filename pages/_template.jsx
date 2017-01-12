import React from 'react';
import { Container } from 'react-responsive-grid';
import Headroom from 'react-headroom';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { rhythm } from '../utils/typography';

import 'css/styles.css';

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    return (
      <div>
        <Headroom
          wrapperStyle={{
            marginBottom: rhythm(1),
          }}
        >
          <Container
            style={{
              'maxWidth'          : 960,
              'padding'           : `${rhythm(0.5)}`,
              // 'backgroundImage'   : `url(${prefixLink('devday.png')})`,
              // 'backgroundSize'    : 'contain',
              // 'backgroundRepeat'  : 'no-repeat',
              // 'backgroundPosition': '50%',
            }}
          >
            <h1><span className="highlight">P</span>rossimi <span className="highlight">E</span>venti</h1>
          </Container>
        </Headroom>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3/4)}`,
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </Container>
      </div>
    )
  },
})
