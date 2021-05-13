const helper={
  loading:{
    reproduce(){
      $loadinger.style.display='block'
    },
    stop(){
      $loadinger.style.display='none'
    }
  },
  cleanHTML($el){
    $el.innerHTML='';
  },
  renderProducts(state){
    this.cleanHTML($products)
    state.products.map(pro=>{
      pro.render($products)
    })
  },
  renderCategorys(state){
    this.cleanHTML($categoris)
    state.categorys.map(cat=>{
      cat.render($categoris)
    })

  },
  toggleModal(){
    $modal.style.display= $modal.style.display==='block'? 'none':'block'
  },
  showFlashMessage(message,type){
    $flashMessage.innerHTML=`<p class="${type}">${message}</p>`
    $flashMessage.style.display='block'
    setTimeout(()=>{
      $flashMessage.style.display='none'
    },1000)
  },
  getCreationProductData(){
    let formData=new FormData($formAdd);
    formData=Object.fromEntries(formData.entries())
  },
  productDataFromDOM($prouctBtn){
    const product=$prouctBtn.parentNode.parentNode
    const productChildren=$prouctBtn.parentNode.parentNode.children
    const productData=new ProductDto({
      pk:parseInt(product.id),
      nombre:productChildren[1].innerHTML,
      precio:parseFloat(productChildren[2].innerHTML),
      categoria:productChildren[3].innerHTML
    });
    if (!productData.empty()){
      return productData; 
    }else{
      throw new Error('Product data invalid');
    }
  },
  findProductInState(state,productData){
    let resul;
    state.products.forEach((pro,i)=>{
      if (pro.state.data.pk===productData.pk){
        resul=[i,pro];
      }
    })
    return resul;    
  }
}