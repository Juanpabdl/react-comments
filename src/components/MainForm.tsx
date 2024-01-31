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
        <>
            <p>{text}</p>
        </>    
    )
}

const MainForm = () => {
    const [commentList,setCommentList] = useState<Comment[]>([])
    const [newComment,setNewComment] = useState<string>("")
    const [currentComment,setcurrentComment] = useState<number|null>(null)
    const [newReply,setNewReply] = useState<string>("")
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

    const handleSendReply = () => {
        const replyObj:Comment={
            id:commentList.length+1,
            text: newReply,
            replies: []
        }

        const addedComment = commentList.map((comment)=>{
            if(comment.id == currentComment){
                return {...comment, replies:[...comment.replies,replyObj]}
            }
            return comment;
        })

        setCommentList(addedComment);
        setcurrentComment(null);
        setNewReply("");
    }

    return(
        <>
            <h1>Comment Form</h1>
            <form className="commentForm" onSubmit={handleSubmitComment}>
                <div>
                    <label style={{marginRight:10}}> New Comment: </label>
                    <input type="text" id="newComment" value={newComment} onChange={handleChangeComment}></input>
                </div>
                <button style={{marginLeft:10}}>Send</button>
            </form>
            <div>
                <h1>Comments</h1>
                {
                    commentList.map((comment)=>(
                        <div className="comments">
                            <div className="mainComment">
                                <Comment key={comment.id} text={comment.text}/>
                                <button 
                                style={{marginLeft:10}}
                                onClick={() => handleNewReply(comment.id)}>Reply</button>
                            </div>
                            {currentComment == comment.id && (
                                <form>
                                    <input 
                                    type="text" 
                                    id="newReply" 
                                    value={newReply} 
                                    onChange={(e)=>{setNewReply(e.target.value)}} />
                                    <button 
                                    style={{marginLeft:10}}
                                    onClick={handleSendReply}>Send Reply</button>
                                </form>
                            )}
                            {comment.replies.map((reply)=>(
                                <div className="reply">
                                    <p>Respuesta: </p>
                                    <Comment key={reply.id} text={reply.text}/>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default MainForm