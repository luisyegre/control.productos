class Component{
  contructor(props){
    this.state={};
    this.props=props;
    this.parent=null;
    this.children=null;
  }
  setState(newState){
    this.state=newState
    this._render();
  }
  template(){}
  _render($parent){
    if($parent){
      this.parent=$parent
    }else if (!$parent && !this.parent){
      this.parent=document.body
    }
    this.children=this.parent.children
    this.parent.innerHTML+=this.template()

  }
}