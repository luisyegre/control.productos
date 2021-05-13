
function categoryReducer(action,state,newCategory){
  const cAction=actions.category;

  switch(action){
    case cAction.ADD_ONE:
      state.categorys.push(newCategory)
      break;
      
    case cAction.ADD_MANY:
      state.categorys=[...state.categorys,...newCategory]
      console.log(state)
      break;
      
    default:
      throw new Error("Action dosn't exist")
      break;  
  }
  helper.renderCategorys(state);
  return state.categorys
}