import {describe, expect, test, beforeEach, vi} from 'vitest'
import anecdoteService from '../services/anecdotes.js'

const anecdotes = [
    {
        "content": "If it hurts, do it more often",
        "author": "Jez Humble",
        "info": "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
        "votes": 0,
        "id": "1"
    },
    {
        "content": "Premature optimization is the root of all evil",
        "author": "Donald Knuth",
        "info": "http://wiki.c2.com/?PrematureOptimization",
        "votes": 0,
        "id": "2"
    },
]

describe('anecdoteService', () => {
    beforeEach(() => {
        vi.resetAllMocks()
        globalThis.fetch = vi.fn()
    })
    describe('getAll', () => {
        test('should return all anecdotes when request succeeds', async () => {
            fetch.mockResolvedValue({
                ok: true,
                json: async () => anecdotes
            })
            const result = await anecdoteService.getAll()
            expect(result).toEqual(anecdotes)

        })
        test('should throw an error when request fails', () => {
            fetch.mockResolvedValue({
                ok: false,
            })
            expect(anecdoteService.getAll())
                .rejects
                .toThrow('Failed to fetch anecdotes')
        })
    })
    describe('delete anecdote', () => {
        test('should return ')
    })

})