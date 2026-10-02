const baseUrl = import.meta.env.VITE_API_URL

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const createNew = async (object) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object),
    })
  
    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }
  
    return await response.json()
}

const remove = async (id) => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
    
    console.log('inside anecdotes.js')
    console.log('options', options)
    console.log('id', id)

    const response = await fetch(`${baseUrl}/${id}`, options)
    if (!response.ok) {
        throw new Error('Failed to delete anecdote')
    }
}

export default { getAll, createNew, remove }