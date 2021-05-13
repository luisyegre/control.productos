class Product extends Component{
  constructor(productData){
    super(productData)

    this.state={
      data:productData,
      isEditing:false,
    };
  }
  template(key='0'){
    return !this.state.isEditing?`
    <tr id="${this.state.data.pk}">
      <td>${key}</td>
      <td>${this.state.data.nombre}</td>
      <td>${this.state.data.precio}</td>
      <td>${this.state.data.categoria}</td>
      <td>
        <button class="action-btn" onclick="editProductEvent(event)">🖊</button>
        <button class="action-btn" onclick="deleteProductEvent(event)">❌</button>
      </td>
    </tr>`:`
    <tr id="${this.state.data.pk}">
      <td>#</td>
      <td><input class="edit_input" type="text" id="nombre-edit" value="${this.state.data.nombre}"></td>
      <td><input class="edit_input" type="number" id="precio-edit" step=".00" value="${this.state.data.precio}"></td>
      <td>
        <select class="edit_input" id="categoria-edit">
        ${
          $categoris.innerHTML
        }
        </select>
      </td>
      <td>
        <button class="action-btn" onclick="confirnProductEditEvent(event)" >👌</button> 
        <button class="action-btn" onclick="cancelProductEditEvent(event)" >❌</button> 
      </td>
    </tr> 
    `

  }

  render($parent){
    this._render($parent);
  }
}
