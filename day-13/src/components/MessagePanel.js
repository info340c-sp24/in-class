export function MessagePanel({chatLog}) {
    
    const messageItemArray = chatLog.map(msgObject => {
        return <MessageItem messageData={msgObject} />
    })

    return (
        <div className="mx-3">
            {messageItemArray}
        </div>
    )
}

function MessageItem(props) {
    console.log(props)
    const {userName, userImg, text} = props.messageData;

    const handleClick = (event) => {
        console.log("You like a post by " + userName)
    }

    return (
        <div className="message">
            <div>
                <img className="me-1" src={userImg} alt={userName + "'s avatar"}/>
                <strong>{userName}</strong>
            </div>
            <p>{text}</p>
            <button className="btn btn-secondary" onClick={handleClick}>
                Like
            </button>
        </div>
    )
}