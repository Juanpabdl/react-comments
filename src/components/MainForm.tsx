import React, {useState} from "react";

interface Comment{
    id: number,
    text:string
    responses: Comment[]
}

const MainForm = () => {
    /*const [formData, setFormData] = useState<Comment>({
        id:
        comment:""
        });
    const [sentData, setSentData] = useState(false)*/
    const [commentList,setCommentList] = useState<Comment[]>([])
    const [newComment,setNewComment] = useState<string>("")
    //const [newResponse,setNewResponse] = useState<string>("")

    const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Change")
        setNewComment(e.target.value)
    }

    const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Resultado del formulario", newComment)
        if (newComment.trim()!==""){
        const commentObj : Comment = {
            id: commentList.length + 1,
            text : newComment,
            responses : [],
        };
        setCommentList([...commentList, commentObj])
        setNewComment("")
        }
    }

    return(
        <div>
            <h1>Comment Form</h1>
            <form onSubmit={handleSubmitComment}>
                <div className="formDiv">
                    <label> New Comment: </label>
                    <input type="text" id="newComment" value={newComment} onChange={handleChangeComment}></input>
                </div>
                <div className="formDiv">
                    <button  className="button">Send</button>
                </div>
            </form>
        </div>
    )
}
export default MainForm