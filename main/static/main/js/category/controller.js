class CategoryController{
  constructor(){
    this.uri='/api/categoria/';
    this.req=new FetchRequest(this.uri);
  }
  async getAll(){
    const resp=await this.req.get();
    if (!resp.error){
      const categoris=resp.data.map((cat)=>{
        const catData=new CategoryDto(cat);
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
      const catData=new CategoryDto({nombre:resp.data.nombre,pk:resp.data.pk});
      const category= new Category(catData)
      return category
    }else{
      return resp
    }
  }
}