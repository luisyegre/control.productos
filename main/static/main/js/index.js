var canShow=false;
var productos={};
var edits={};
var editing=false
function renderProduct(key,productData,$elementL){
  if ($elementL){
    $elementL.innerHTML=`
    <tr id="${productData.pk}">
      <td>${key}</td>
      <td>${productData.nombre}</td>
      <td>${productData.precio}</td>
      <td>${productData.categoria}</td>
      <td>
        <button class="action-btn" onclick="editProduct(event)">🖊</button>
        <button class="action-btn" onclick="deleteProduct(event)">❌</button>
      </td>
    </tr>`
  }else{

    $productosData.innerHTML+=`
    <tr id="${productData.pk}">
      <td>${key}</td>
      <td>${productData.nombre}</td>
      <td>${productData.precio}</td>
      <td>${productData.categoria}</td>
      <td>
        <button class="action-btn" onclick="editProduct(event)">🖊</button>
        <button class="action-btn" onclick="deleteProduct(event)">❌</button>
      </td>
    </tr>`;
  }
}
function getCokie(key){
  const cookies=document.cookie.split(/;|=/);
  const cookieIndex=cookies.indexOf(key)
  return cookies[cookieIndex+1];
}
async function getProducts(){
  $loadinger.style.display='flex'
  try{
    const res=await fetch('/api/producto/');
    const data=await res.json()
    if (data.data){
      $productosData.innerHTML='';
      productos={};
      data.data.map((producto,i)=>{
        productos[producto.pk]=producto;
        renderProduct(i,producto)
      })
      $loadinger.style.display='none'
      return data.data
    }
  }catch(err){
    console.error(err);
  }
}
async function getCategorys(){
  $loadinger.style.display='flex'

  try{
    const res=await fetch('/api/categoria/');
    const data=await res.json()
    if (data.data){
      $categorys.innerHTML='';
      data.data.map((categoria,i)=>{
        $categorys.innerHTML+=`
        <option value="${categoria.pk}" nombre="${categoria.nombre}">${categoria.nombre}</option>
        `;
      })
      $loadinger.style.display='none'

      return data.data
    }
  }catch(err){
    console.error(err);
  }
}
async function createProduct(){
  $loadinger.style.display='flex'
  const csrfToken= getCokie('csrftoken');
  try{
    let formData=new FormData($formAdd);
    formData=Object.fromEntries(formData.entries())
    const res=await fetch('/api/producto/',{
      headers:{
        "Content-Type":"application/json",
        "X-CSRFToken":csrfToken
      },
      method:'POST',
      body:JSON.stringify({
        nombre:formData.nombre,
        precio:parseFloat(formData.precio),
        categoria:parseInt(formData.categoria)
      })
    });
    const data=await res.json()
    if (data.error){
      alert(data.mensaje);
    }else{
      let producto=data.data
      productos[producto.pk]=producto;
      renderProduct($productosData.children.length,producto)
      $loadinger.style.display='none'
      toggleModal();
    }
  }catch(err){
    console.error(err);
  }
}
async function deleteProduct(event){
  $loadinger.style.display='flex'

  const $producto=event.target.parentNode.parentNode;
  const csrfToken= getCokie('csrftoken');

  try{
    const res=await fetch('/api/producto/'+$producto.id,{
      headers:{
        "X-CSRFToken":csrfToken
      },
      method:'DELETE'
    });
    const data=await res.json()
    if(data.error){
      $loadinger.style.display='none'
      alert(data.mensaje);
    }else{
      productos[$producto.id]=undefined;
      $producto.remove();
      $loadinger.style.display='none'

    }
  }catch(err){
    console.error(err);
  }
}
async function updateProduct(productData,$element){
  $loadinger.style.display='flex'
  const csrfToken= getCokie('csrftoken');

  try{
    const res=await fetch('/api/producto/'+productData.id,{
      headers:{
        "Content-Type":"application/json",
        "X-CSRFToken":csrfToken
      },
      method:'PUT',
      body:JSON.stringify({
        nombre:productData.nombre,
        precio:parseFloat(productData.precio),
        categoria:parseInt(productData.categoria)
      })
    });
    const data=await res.json()
    if (data.error){
      alert(data.mensaje);
    }else{
      const categorias= await getCategorys();
      const categoria=categorias.find(c=>c.pk==productData.categoria);
      productos[productData.id]={
        pk:productData.id,
        nombre:productData.nombre,
        precio:parseFloat(productData.precio),
        categoria:categoria.nombre
      };
      producto=productos[productData.id];
      renderProduct($productosData.children.length,producto,$element);
      $loadinger.style.display='none'

    }
  }catch(err){
    console.error(err);
  }
}
async function confirnEdit(event){
  const $element=event.target.parentNode.parentNode
  const data={
    id:$element.id,
    nombre:$element.children[1].children[0].value,
    precio:parseFloat($element.children[2].children[0].value),
    categoria:parseInt($categoriaEdit.value),
  }
  $loadinger.style.display='flex'
  await updateProduct(data,$element);
  $loadinger.style.display='none'
  editing=false
}
function cancelEdit(ev){
  const $element=ev.target.parentNode.parentNode
  const data = edits[$element.children[0].innerHTML]
  console.log(data)
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
  editing=false
}
async function editProduct(ev){
  if (editing){
    alert('ya esta editando');
    return
  }
  const $product=ev.target.parentNode.parentNode
  const $data=$product.children
  editing=true;
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
      categorias.map(cat=>`<option value="${cat.pk}" nombre="${cat.nombre}">${cat.nombre}</option>`)
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
