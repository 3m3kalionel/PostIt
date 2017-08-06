
class Messages extends React.Component {
  render() {
    const messages = [1, 2, 3, 4, 5, 6, 7]
    return(
      <ul>
        {
          messages.map((message, index) => {
            <Message/>
          })
        }
      </ul>
    )
  }
}

class Message extends React.Component {
  render() {
    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
        </div>
      </div>
    )
  }
}