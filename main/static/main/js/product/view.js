class Product{
  constructor(productData){
    this.data=productData;
    this.isEditing=false;
  }
  template(key='0'){
    return `
    <tr id="${this.data.pk}">
      <td>${key}</td>
      <td>${this.data.nombre}</td>
      <td>${this.data.precio}</td>
      <td>${this.data.categoria}</td>
      <td>
        <button class="action-btn" onclick="editProduct(event)">🖊</button>
        <button class="action-btn" onclick="deleteProduct(event)">❌</button>
      </td>
    </tr>`
  }
  async templateEdit(){
    const categorias=await CategoryController.getAll();
    return `
      <td>#</td>
      <td><input class="edit_input" type="text" id="nombre-edit" value="${this.data.nombre}"></td>
      <td><input class="edit_input" type="number" id="precio-edit" step=".00" value="${this.data.precio}"></td>
      <td>
        <select class="edit_input" id="categoria-edit">
        ${
        categorias.map(cat=>cat.template())
        }
        </select>
      </td>
      <td>
        <button class="action-btn" onclick="confirnEdit(event)" >👌</button> 
        <button class="action-btn" onclick="cancelEdit(event)" >❌</button> 
      </td>
    `
  }
  render($parent){
    if (!this.isEditing){
      $parent.innerHTML+=this.template();
    }else{
      $parent.innerHTML+=this.templateEdit();
    }
  }
}
