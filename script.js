function Register(){
    const regReq = new XMLHttpRequest()
    regReq.open("post", "/register")
    regReq.setRequestHeader("Content-Type", "Application/json")
    regReq.send(JSON.stringify({
        regUsername: usernamein.value,
        regPassword: passwordin.value
    }))
    regReq.onreadystatechange = () => {
        if(regReq.readyState == 4 && regReq.status == 200){
            const result = JSON.parse(regReq.response)
            console.log(result.message)
        }
    }
}

function Login(){
    const logReq = new XMLHttpRequest()
    logReq.open("post", "/login")
    logReq.setRequestHeader("Content-Type", "Application/json")
    logReq.send(JSON.stringify({
        logUsername: usernamein.value,
        logPassword: passwordin.value
    }))
    logReq.onreadystatechange = () => {
        if(logReq.readyState == 4){
            const result = JSON.parse(logReq.response)
            console.log(result.message)
            if(logReq.status == 200){
                sessionStorage.setItem("token", result.token)
                console.log("Token saved successfully")
            }
        }
    }
}

function CreatePost(){
    const postReq = new XMLHttpRequest()
    postReq.open("post", "/addpost")
    postReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"))
    postReq.setRequestHeader("Content-Type", "Application/json")
    postReq.send(JSON.stringify({
        postContent: postcont.value
    }))
    postReq.onreadystatechange = () => {
        if(postReq.readyState == 4 && postReq.status == 200){
            const result = JSON.parse(postReq.response)
            console.log(result.message)
        }
    }
}

function DeletePost(){
    const delReq = new XMLHttpRequest()
    delReq.open("delete", "/deletepost")
    delReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"))
    delReq.setRequestHeader("Content-Type", "Application/json")
    delReq.send(JSON.stringify({
        postId: postIdin.value
    }))
    delReq.onreadystatechange = () => {
        if(delReq.readyState == 4 && delReq.status == 200){
            const result = JSON.parse(delReq.response)
            console.log(result.message)
        }
    }
}

function AddComment(){
    const comReq = new XMLHttpRequest()
    comReq.open("post", "/addcomment")
    comReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"))
    comReq.setRequestHeader("Content-Type", "Application/json")
    comReq.send(JSON.stringify({
        postId: postIdin.value,
        comContent: repContin.value
    }))
    comReq.onreadystatechange = () => {
        if(comReq.readyState == 4 && comReq.status == 200){
            const result = JSON.parse(comReq.response)
            console.log(result.message)
        }
    }
}

function DeleteComment(){
    const delReq = new XMLHttpRequest()
    delReq.open("delete", "/deletecomment")
    delReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"))
    delReq.setRequestHeader("Content-Type", "Application/json")
    delReq.send(JSON.stringify({
        commentId: postIdin.value
    }))
    delReq.onreadystatechange = () => {
        if(delReq.readyState == 4 && delReq.status == 200){
            const result = JSON.parse(delReq.response)
            console.log(result.message)
        }
    }
}

function AddReport(){
    const repReq = new XMLHttpRequest()
    repReq.open("post", "/addreport")
    repReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"))
    repReq.setRequestHeader("Content-Type", "Application/json")
    repReq.send(JSON.stringify({
        postId: postIdin.value,
        repContent: repContin.value
    }))
    repReq.onreadystatechange = () => {
        if(repReq.readyState == 4 && repReq.status == 200){
            const result = JSON.parse(repReq.response)
            console.log(result.message)
        }
    }
}

function DeleteReport(){
    const delReq = new XMLHttpRequest()
    delReq.open("delete", "/deletereport")
    delReq.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"))
    delReq.setRequestHeader("Content-Type", "Application/json")
    delReq.send(JSON.stringify({
        postId: postIdin.value
    }))
    delReq.onreadystatechange = () => {
        if(delReq.readyState == 4 && delReq.status == 200){
            const result = JSON.parse(delReq.response)
            console.log(result.message)
        }
    }
}


function Users(){
    const req = new XMLHttpRequest()
    req.open("get", "/users")
    req.setRequestHeader("Content-Type", "Application/json")
    req.send()
    req.onreadystatechange = () => {
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.response)
            result.forEach(user => {
                console.log(user.username, user.password, user.admin, user)
            })
        }
    }
}

function GetPosts(){
    const req = new XMLHttpRequest()
    req.open("get", "/getposts")
    req.setRequestHeader("Content-Type", "Application/json")
    req.send()
    req.onreadystatechange = () => {
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.response)
            result.forEach(post => {
                console.log(post.postId, post.uploader, post.content, post.likes, post)
            })
        }
    }
}
