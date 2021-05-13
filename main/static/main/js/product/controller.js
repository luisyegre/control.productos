class ProductController{
  constructor(){
    this.uri='/api/producto/';
    this.req=new FetchRequest(this.uri);
  }
  async getAll(){
    const resp=await this.req.get();
    if (!resp.error){
      const productos=resp.data.map((pro)=>{
        const proData=new ProductDto(pro);
        const producto= new Product(proData)
        return producto
      })
      return productos  
    }else{
      return resp
    }
  }
  async getOne(pk){    
    const resp=await this.req.get(pk);
    if (!resp.error){
      const proData=new ProductDto(resp.data);
      const product= new Product(proData);
      return product
    }else{
      return resp
    }
  }
  async create(createProductDto){
    if (createProductDto.empty()){
      return {error:true,mensaje:"campos vacios"}
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