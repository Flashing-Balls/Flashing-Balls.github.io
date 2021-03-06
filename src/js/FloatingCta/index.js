import Preact from 'preact';
import { Link } from 'react-router-dom';

import './cta.sass';

export default class FloatingCta extends Preact.Component {
  constructor() {
    super();
    this.oldY = 0;

    this.state = {
      visible: false,
    };

    this.handleScroll = this.handleScroll.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'scroll', this.handleScroll );
  }

  componentDidUnmount() {
    window.removeEventListener( 'scroll', this.handleScroll );
  }

  handleScroll() {
    const top = ( window.pageYOffset || document.scrollTop ) - ( document.clientTop || 0 );

    if ( this.oldY > top || top < 200 || Number.isNaN( top ) ) {
      this.setState( {
        visible: true,
      } );
    } else {
      this.setState( {
        visible: false,
      } );
    }

    this.oldY = top;
  }

  render() {
    const visible = this.state.visible ? 'visible' : 'hidden';
    return (
      <Link to={ '/upload/' } >
        <nav className={ `floating-cta floating-cta--${ visible }` }>
          <i className="material-icons">add</i>
        </nav>
      </Link>
    );
  }
}
