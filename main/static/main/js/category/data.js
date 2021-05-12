class CategoryData{
  constructor(data){
    this.data=data
  }
  toString(){
    return JSON.stringify({
      nombre:this.nombre,
      pk:this.pk,
    })
  }
}
class CategoryDto extends CategoryData{
  empty(){
    return ((this.data.nombre===undefined || this.data.nombre.length<0) || (this.data.pk===undefined))
  }
}