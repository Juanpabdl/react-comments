import React, {useState} from "react";
import './MainForm.css';

interface Comment{
    id: number,
    text: string,
    replies: Comment[]
}

const Comment = (props:{text: string}) =>{
    const {text} = props
    return (
        <div >
            <p>{text}</p>
        </div>    
    )
}

const MainForm = () => {
    const [commentList,setCommentList] = useState<Comment[]>([])
    const [newComment,setNewComment] = useState<string>("")
    const [currentComment,setcurrentComment] = useState<number>(0)
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
            replies : [],
        };
        setCommentList([...commentList, commentObj])
        setNewComment("")
        }
    }

    const handleNewReply  = (commentId: number) =>{
        setcurrentComment(commentId)
    }

    return(
        <>
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
            <div>
                <h1>Comments</h1>
                {
                    commentList.map((comment)=>(
                        <div className="comments">
                            <Comment key={comment.id} text={comment.text}/>
                            <button onClick={() => handleNewReply(comment.id)}>Reply</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default MainForm