import useAnecdotes from "../hooks/useAnecdotes.js";

const AnecdoteList = () => {
    const {anecdotes, deleteAnecdote} = useAnecdotes()
    console.log('rendered AnecdoteList with anecdotes - ', anecdotes)

    const anecdoteDivStyle = {
        display: "flex",
        flexDirection: "row",
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <div key={anecdote.id} style={anecdoteDivStyle}>
                        <li>{anecdote.content}
                            <button onClick={ () => deleteAnecdote(anecdote.id)}>delete</button>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    )
}

export default AnecdoteList
