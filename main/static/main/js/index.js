var canShow=false;
var productos={};

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
            <button>🖊</button>
            <button onclick="deleteProduct(event)">❌</button>
          </td>
        </tr>`;
      })
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
            <button>🖊</button>
            <button onclik="deleteProduct(event)" >❌</button>
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
function toggleModal(){
  canShow=!canShow;
  $modal.style.display= canShow? "block" : "none";
}
