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

    const deleteAnecdote = async (id) => {
        try {
            await anecdoteService.remove(id)
            const newAnecdotes = anecdotes.filter((anecdote) => anecdote.id !== id)
            setAnecdotes(newAnecdotes)
        }catch(error) {
            console.error(error)
        }
    }

    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote,
    }

}

export default useAnecdotes