function productReducer(action,state,newState){
  const pAction=actions.product;
  
  switch(action){
    case pAction.ADD_ONE:
      state.products.push(newState)
      break;
      
    case pAction.ADD_MANY:
      state.products=[...state.products,...newState]
      break;

    case pAction.REMOVE:
      let [index,]=helper.findProductInState(state,newState);
      console.log(index)
      state.products.splice(index,1);
      break;
    default:
      throw new Error("Action dosn't exist")
      break;  
  }
  
  helper.renderProducts(state);
  return state.products
}