function getCokie(key){
  const cookies=document.cookie.split(/;|=/);
  const cookieIndex=cookies.indexOf(key)
  return cookies[cookieIndex+1];
}
async function request(uri,options){
  try{
    const res =await fetch(uri,options);
    return res;
  }catch(err){
    throw err;
  }
} 
async function formatResponse(response){
  let res;
  try{
    res=await response.json()
  }catch(err){
    res=await response.text()
    throw new Error(err);
  }finally{
    return res
  }
}

class FetchRequest{
  constructor(uri,options,headers){
    this.uri=uri
    this.headers={
      "Content-Type":"application/json",
      "X-CSRFToken":getCokie('csrftoken'),
      ...headers
    }

    this.options=options
  }
  async request(method,body,params){
    const req=await request(this.uri+`${params? params: ''}`,{
      ...this.options,
      headers:this.headers,
      method,
      body
    });

    const resp= await formatResponse(req);
    return resp;
  }
  async put(id,data){
    return this.request('PUT',data,id);
  }
  async post(data){
    return this.request('POST',data)
  }
  async get(params){
    return this.request('GET',undefined,params)
  }
  async delete(pk){
    return this.request('DELETE',undefined,pk)
  }
}