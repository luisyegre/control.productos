
class CreateProductDto extends Dto{
  empty(){
    return (
      this.nombre.length<0 || 
      (this.categoria===undefined) || 
      (this.precio===undefined) 
    )
  }
}
class ProductDto extends Dto{
  empty(){
    return (
      this.nombre.length<0 || 
      this.categoria.length<0 || 
      (this.precio===undefined) || 
      (this.pk===undefined)
    )
  }
}
class UpdateProductDto extends Dto{
  empty(){
    return (
      !this.nombre && (this.precio ===undefined) &&
       (this.categoria===undefined)
    )
  }
}