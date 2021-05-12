class Category{
  constructor(CategoryData){
    this.data=CategoryData;
  }
  template(){
    return `
      <option value="${this.data.pk}" nombre="${this.data.nombre}">
      ${this.data.nombre}
      </option>
    `
  }
  render($parent){
    $parent.innerHTML+=this.template();
  }
}