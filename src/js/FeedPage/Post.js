import Preact from 'preact';
import { connect } from 'react-redux';
import { ON_COMMENT_SUBMIT_START, ON_COMMENT_SUBMITTED } from '../actions';
import { sendComment } from '../restApiMock';
import Video from '../Video';
import Avatar from '../Avatar';
import Comment from './Comment/';
import Input from '../Input/';
import './post.sass';

class Post extends Preact.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  }
  onInputChange( { target } ) {
    this.setState( { inputValue: target.value } );
  }
  onSubmit( e ) {
    e.preventDefault();
    this.props.onCommentSubmit( this.state.inputValue, this.props.data.id );
    this.setState( { inputValue: '' } );
  }
  renderComments() {
    return this.props.data.comments.map(
      ( { user, text, id } ) => ( <Comment key={ id } user={ user } text={ text } /> )
    );
  }
  render() {
    const { user, video } = this.props.data;
    return (
      <article className="post">
        <header className="post__header">
          <Avatar avatar={ user.avatar } fullname={ user.fullname } username={ user.username } />
        </header>
        <main>
          <section>
            <Video url={ video } />
          </section>
          <section className="comments">
            { this.renderComments() }
          </section>
        </main>
        <form onSubmit={ _ => this.onSubmit( _ ) }>
          <Input value={ this.state.inputValue } placeholder="Doin' great mate" type="text" onInput={ _ => this.onInputChange( _ ) } />
          <button type="submit">Submit</button>
        </form>
      </article>
    );
  }
}

const mapDispatchToProps = dispatch => ( {
  onCommentSubmit: ( value, id ) => {
    dispatch( ON_COMMENT_SUBMIT_START( id ) );
    sendComment()
      .then( () => {
        dispatch( ON_COMMENT_SUBMITTED( value, id ) );
      } );
  },
} );

export default connect( null, mapDispatchToProps )( Post );
