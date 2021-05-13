class Category extends Component{
  constructor(categoryData){
    super(categoryData);
    this.state={
      data:categoryData
    };
  }
  template(){
    return `
      <option value="${this.state.data.pk}" nombre="${this.state.data.nombre}">
      ${this.state.data.nombre}
      </option>
    `
  }
  render($parent){
    this._render($parent)
  }
}