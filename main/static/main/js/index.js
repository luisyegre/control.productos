var canShow=false;
var productos={};
var edits={};

async function getProducts(){
  try{
    const res=await fetch('/api/producto/');
    const data=await res.json()
    if (data.data){
      $productosData.innerHTML='';
      productos={};
      data.data.map((producto,i)=>{
        productos[producto.pk]=producto;
        $productosData.innerHTML+=`
        <tr id="${producto.pk}">
          <td>${i}</td>
          <td>${producto.nombre}</td>
          <td>${producto.precio}</td>
          <td>${producto.categoria}</td>
          <td>
            <button class="action-btn" onclick="editProduct(event)">🖊</button>
            <button class="action-btn" onclick="deleteProduct(event)">❌</button>
          </td>
        </tr>`;
      })
      return data.data

    }
  }catch(err){
    console.error(err);
  }
}
async function getCategorys(){
  try{
    const res=await fetch('/api/categoria/');
    const data=await res.json()
    if (data.data){
      $categorys.innerHTML='';
      data.data.map((categoria,i)=>{
        $categorys.innerHTML+=`
        <option value="${categoria.pk}">${categoria.nombre}</option>
        `;
      })
      return data.data
    }
  }catch(err){
    console.error(err);
  }
}
async function createProduct(){
  try{
    let formData=new FormData($formAdd);
    formData=Object.fromEntries(formData.entries())
    const res=await fetch('/api/producto/',{
      headers:{
        "Content-Type":"application/json",
        "X-CSRFToken":formData.csrfmiddlewaretoken
      },
      method:'POST',
      body:JSON.stringify({
        nombre:formData.nombre,
        precio:formData.precio,
        categoria:parseInt(formData.categoria)
      })
    });
    const data=await res.json()
    console.log(data)
    if (data.error){
      alert(data.mensaje);
    }else{
      let producto=data.data
      productos[producto.pk]=producto;

      $productosData.innerHTML+=`
        <tr id="${producto.pk}">
          <td>${$productosData.children.length}</td>
          <td>${producto.nombre}</td>
          <td>${producto.precio}</td>
          <td>${producto.categoria}</td>
          <td>
            <button class="action-btn" onclick="editProduct(event)">🖊</button>
            <button class="action-btn" onclick="deleteProduct(event)" >❌</button>
          </td>
        </tr>
      `; 
      toggleModal();
    }
  }catch(err){
    console.error(err);
  }
}
async function deleteProduct(event){
  const $producto=event.target.parentNode.parentNode;
  const cookies=document.cookie.split(/;|=/);
  const csrfIndex=cookies.indexOf('csrftoken')
  const csrfToken=cookies[csrfIndex+1];

  try{
    const res=await fetch('/api/producto/'+$producto.id,{
      headers:{
        "X-CSRFToken":csrfToken
      },
      method:'DELETE'
    });
    const data=await res.json()
    if(data.error){
      alert(data.mensaje);
    }else{
      productos[$producto.id]=undefined;
      $producto.remove();
    }
  }catch(err){
    console.error(err);
  }
}
const confirnEdit=($element,data)=>{
  updateProduct(data);
}
const cancelEdit=(ev)=>{
  const $element=ev.target.parentNode.parentNode
  const data = edits[$element.children[0].innerHTML]
  $element.innerHTML=`
    <td>${data.count}</td>
    <td>${data.nombre}</td>
    <td>${data.precio}</td>
    <td>${data.categoria}</td>
    <td>
      <button class="action-btn" onclick="editProduct(event)">🖊</button>
      <button class="action-btn" onclick="deleteProduct(event)" >❌</button>
    </td>
  `;
}

async function editProduct(ev){
  

  const $product=ev.target.parentNode.parentNode
  const $data=$product.children
  
  const data={
    count:$data[0].innerHTML,
    nombre:$data[1].innerHTML,
    precio:$data[2].innerHTML,
    categoria:$data[3].innerHTML
  }
  edits[data.count]=data

  const categorias=await getCategorys();
  $product.style.padding='0'
  $product.innerHTML=`
    <td>${$data[0].innerHTML}</td>
    <td><input class="edit_input" type="text" id="$nombreEdit" value="${data.nombre}"></td>
    <td><input class="edit_input" type="number" id="$precioEdit" step=".00" value="${data.precio}"></td>
    <td>
      <select class="edit_input" id="$categoriaEdit">
      ${
      categorias.map(cat=>`<option value="${cat.pk}" >${cat.nombre}</option>`)
      }
      </select>
    </td>
    <td>
      <button class="action-btn" onclick="confirnEdit(event)" >👌</button> 
      <button class="action-btn" onclick="cancelEdit(event)" >❌</button> 
    </td>
  `;
}

function toggleModal(){
  canShow=!canShow;
  $modal.style.display= canShow? "block" : "none";
}
