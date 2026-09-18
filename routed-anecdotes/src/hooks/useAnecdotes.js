import {useEffect, useState} from "react";
import anecdoteService from "../services/anecdotes.js";

const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll()
            .then(data => setAnecdotes(data))
    })
    
    const addAnecdote = async (newAnecdote) => {
        console.log('Debug service - addAnecdote')
        const createdAnecdote = await anecdoteService.createNew(newAnecdote)
        console.log('createdAnecdote', createdAnecdote)
        const newAnecdotes = [...anecdotes, createdAnecdote]
        console.log('newAnecdotes', newAnecdotes)
        setAnecdotes(newAnecdotes)
    }

    return {
        anecdotes,
        addAnecdote
    }

}

export default useAnecdotes