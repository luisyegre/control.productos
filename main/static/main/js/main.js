const state={
  categorys:[],
  products:[]
}

const proCon=new ProductController();
const catCon=new CategoryController();

async function deleteProductEvent(ev){
  const productData=helper.productDataFromDOM(ev.target);
  const resp=await proCon.delete(productData.pk);
  if (!resp.error){
    state.products=productReducer(actions.product.REMOVE,state,productData)
    helper.showFlashMessage(resp.mensaje,'success');
  }else{
    helper.showFlashMessage(resp.mensaje,'error');
  }  
}
async function editProductEvent(ev){
  const productData=helper.productDataFromDOM(ev.target);
  const [,productComponent]= helper.findProductInState(state,productData);
  const pState=productComponent.state;
  //seting the edit mode
  helper.cleanHTML(productComponent.parent)
  productComponent.setState({...pState,isEditing:true});

}

async function main(){

  const categorys=await catCon.getAll();
  const products=await proCon.getAll();


  state.categorys=categoryReducer(actions.category.ADD_MANY,state,categorys)
  state.products=productReducer(actions.product.ADD_MANY,state,products)
  
  $btnToggle.onclick=()=> helper.toggleModal();

}
document.addEventListener("DOMContentLoaded",main)
