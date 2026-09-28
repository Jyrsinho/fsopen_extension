const AnecdoteList = ({ anecdotes }) => {

    const anecdoteDivStyle = {
        display: "flex",
        flexDirection: "row",
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <div style={anecdoteDivStyle}>
                        <li key={anecdote.id}>{anecdote.content}</li>
                        <button>remove</button>
                    </div>
                )}
            </ul>
        </div>
    )
}

export default AnecdoteList
