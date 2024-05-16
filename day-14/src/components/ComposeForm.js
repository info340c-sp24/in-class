import React, {useState} from 'react';

export function ComposeForm(props) {
  const {addMessage} = props;

  const [typedText, setTypedText] = useState('');
  console.log(typedText)
  const handleChange = (event) => {
    setTypedText(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    addMessage("parrot", typedText, "general");
    setTypedText('')
  }

  return (
    <form className="my-2" onSubmit={handleSubmit}>
      <div className="input-group">
        <textarea className="form-control" rows="2" placeholder="Type a new message" value={typedText} onChange={handleChange}></textarea>
        <button className="btn btn-secondary" type="submit">
          <span className="material-icons">send</span>
        </button>
      </div>
    </form>
  );
}