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
    describe('create new anecdote', () => {
        test('should return created anecdote when request succeeds', async () => {
            const newAnecdote = {
                content: "jotain fiksua",
                author: "Fiksu Tyyppi",
                info: "www.fiksut.fi",
                votes: 0,
                id: "3"
            }
            fetch.mockResolvedValue({
                ok: true,
                json: async () => newAnecdote
            })
            const result = await anecdoteService.createNew(newAnecdote)
            expect(result).toEqual(newAnecdote)
        })
        test('should throw an error when request fails', () => {
            fetch.mockResolvedValue({
                ok: false,
            })
            expect(anecdoteService.createNew(undefined))
                .rejects
                .toThrow('Failed to create anecdote')
        })
    })
    describe('delete anecdote', () => {
        test('should not throw an error when deleting anecdote succeeds', async () => {
            fetch.mockResolvedValue({
                ok: true
            })
            expect(anecdoteService.remove(2))
        })
        test('should throw an error when trying to delete nonexisting anecdote ', async () => {
            fetch.mockResolvedValue({
                ok: false,
            })
            expect(anecdoteService.remove(4))
                .rejects
                .toThrow('Failed to delete anecdote')
        })
    })

})