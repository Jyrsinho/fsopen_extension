import { useNavigate } from "react-router-dom"
import {useField} from "../hooks/useField.js";
import useAnecdotes from "../hooks/useAnecdotes.js";
import anecdotes from "../services/anecdotes.js";

const CreateNew = () => {
    const [content, resetContent] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [info, resetInfo] = useField('text')
    const navigate = useNavigate()
    const {addAnecdote} = useAnecdotes()
    
    console.log('rendered CreateNew - component')
    console.log('anecdotes of createNew - ', anecdotes)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addAnecdote({
                content: content.value,
                author: author.value,
                info: info.value,
                votes: 0
            })
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    function handleReset() {
        resetContent()
        resetAuthor()
        resetInfo()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content}/>
                </div>
                <div>
                    author
                    <input {...author}/>
                </div>
                <div>
                    url for more info
                    <input {...info}/>
                </div>
                <button type={"submit"}>create</button>
                <button type={'button'} onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew
