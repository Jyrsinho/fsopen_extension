import { useNavigate } from "react-router-dom"
import {useField} from "../hooks/useField.js";

const CreateNew = ({ addNew }) => {
    const [content, resetContent] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [info, resetInfo] = useField('text')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({ content, author, info, votes: 0 })
        navigate("/")
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
