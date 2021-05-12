class ProductController{
  constructor(){
    this.uri='/api/producto/';
    this.req=new FetchRequest(this.uri);
  }
  async getAll(){
    const resp=await this.req.get();
    if (!resp.error){
      const productos=resp.data.map((pro)=>{
        const proData=new ProductDto(pro.nombre,pro.recio,pro.pk,pro.categoria);
        const producto= new Category(proData)
        return producto
      })
      return productos  
    }else{
      return resp
    }
  }
  async create(createProductDto){
    if (createProductDto.empty()){
      return {error:true,mensje:"campos vacios"}
    }else{
      const res= await this.req.post(createProductDto.toString())
      return res
    }
  }
  async update(pk,updateProductDto){
    if (updateProductDto.empty()){
      return {error:true,mensaje:"campos vacios"}
    }else{
      const res= await this.req.put(pk,updateProductDto.toString())
      return res
    }
  }
  async delete(pk){
    const res= await this.req.delete(pk)
    return res
  }
}