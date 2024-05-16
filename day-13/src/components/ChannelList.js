export function ChannelList() {
    const CHANNEL_NAMES = ["general", "random", "announcments", "random-2"]

    const elementArray = CHANNEL_NAMES.map((channelName) => {
        return (
            <li key={channelName}>
                <a className="text-white" href={"/" + channelName}>{channelName}</a>
            </li>
        )
    })

    return (
        <nav className="bg-secondary text-white px-0 pe-3 py-3">
            <ul>
                {elementArray}
            </ul>
        </nav>
    )
}