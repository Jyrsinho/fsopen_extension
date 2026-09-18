import {useEffect, useState} from "react";
import anecdoteService from "../services/anecdotes.js";

const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll()
            .then(data => setAnecdotes(data))
    })
    
    const addAnecdote = async (newAnecdote) => {
        const createdAnecdote = await anecdoteService.createNew(newAnecdote)
        const newAnecdotes = [...anecdotes, createdAnecdote]
        setAnecdotes(newAnecdotes)
    }

    return {
        anecdotes,
        addAnecdote
    }

}

export default useAnecdotes