import {useEffect, useState} from "react";
import anecdoteService from "../services/anecdotes.js";

const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        const getAnecdotes = async () => {
            const anecdotes = await anecdoteService.getAll()
            setAnecdotes(anecdotes)
        }
        getAnecdotes()
    },[])
    
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