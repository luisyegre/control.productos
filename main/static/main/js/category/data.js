class CategoryDto extends Dto{
  empty(){
    return ((this.nombre===undefined || this.nombre.length<0) || (this.pk===undefined))
  }
}