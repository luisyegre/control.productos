class CategoryController{
  constructor(){
    this.uri='/api/producto/';
    this.req=new FetchRequest(this.uri);
  }
  async getAll(){
    const resp=await this.req.get();
    if (!resp.error){
      const categoris=resp.data.map((cat)=>{
        const catData=new CategoryData(cat.nombre,cat.pk);
        const category= new Category(catData)
        return category 
      })
      return categoris  
    }else{
      return resp
    }
  }
  async getOne(pk){    
    const resp=await this.req.get(pk);
    if (!resp.error){
      const catData=new CategoryData(resp.data.nombre,resp.data.pk);
      const category= new Category(catData)
      return category
    }else{
      return resp
    }
  }
}