declare global { 
  interface String {
    replaceAll(search:string, replacement:string):string;
  UppercaseAllWord() : string;
  
  }
}
String.prototype.replaceAll = function(search:string, replacement:string) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.UppercaseAllWord = function() {
  const  x:string = this.split(' ')
      .map((e) => {
          return e.charAt(0).toUpperCase() + e.substring(1).toLowerCase();
      })
      .toString()
      
  return x.replaceAll(","," ");
};


export {}