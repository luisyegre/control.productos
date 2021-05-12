class ProductData{
  constructor(data){
    this.data=data
  }
  toString(){
    if (!this.empty()){
      return JSON.stringify(this.data)
    }else{
      throw new Error('Product Data is empty it cannot set its values as string')
    }
  }
}
class CreateProductDto extends ProductData{
  empty(){
    return (
      this.data.nombre.length<0 || 
      (this.data.categoria===undefined) || 
      (this.data.precio===undefined) 
    )
  }
}
class ProductDto extends ProductData{
  empty(){
    return (
      this.data.nombre.length<0 || 
      this.data.categoria.length<0 || 
      (this.data.precio===undefined) || 
      (this.data.pk===undefined)
    )
  }
}
class UpdateProductDto extends ProductData{
  empty(){
    let empty=false
    if (this.data){
      const keys=Object.keys(this.data)
      
      if (!keys){
        empty=true
      }
      else if(!this.data["nombre"] && (this.data["precio"] ===undefined) && (this.data["categoria"]===undefined)){
        empty=true
      }
    }else{
      empty=true
    }
    return empty
  }
}