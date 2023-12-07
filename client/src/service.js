export const header=(auth)=>{
    let headers = {}
    if(auth){
        headers = {
            "Accept":"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    }else{
        headers = {
            "Accept":"application/json",
            "Content-Type":"application/json",
        }
    }

    return headers
}

export const apiCall = (method,url,headerWithAuth,body,cb) =>{
    if(method === "POST" || method === "PUT" || method === "DELETE"){
        fetch(url,{
            method:method,
            body:body,
            headers:header(headerWithAuth)
        })
        .then(response => response.json())
        .then(res=>cb(res))
        .catch(err=>cb(err))
    }
    if(method === "GET" || method === "HEAD"){
        fetch(url,{
            method:method,
            headers:header(headerWithAuth)
        })
        .then(response => response.json())
        .then(res=>cb(res))
        .catch(err=>cb(err))
    }
}