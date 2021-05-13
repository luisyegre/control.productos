class Dto{
  constructor(data){
    this._data=data
    this._convertDataToProperty();
  }
  _convertDataToProperty(){
    const names=Object.keys(this._data);
    names.forEach(keyName=>{

      this[keyName]=this._data[keyName];
    });
  }
  toString(){
    return JSON.stringify(this._data)
  }

}