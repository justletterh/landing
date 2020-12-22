function fn(s){
    return `compiled-${s.split(".").slice(-1)[0]}-stylesheet-${s.toLowerCase().replace(RegExp("\\.", 'g'),"-dot-")}`.toLowerCase();
}

function capital(s){
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function capit(s){
  ["sass","scss"].forEach(function(i){
    s=s.replace(` ${i}`,` ${i.toUpperCase()}`);
  });
  var o=[];
  s.split(" ").forEach(function(i){
    o.push(capital(i));
  });
  s=o.join(" ");
  return s;
}

//SCSS
(async () => {
  var n;
  let buffer='';
  const fullCode = (await Promise.all([...document.querySelectorAll("link")]
    .filter(l => l.rel === 'stylesheet/scss')
    .map(async l=>{
      url = l.href;
      n=url.substring(url.lastIndexOf("/")+1);
      return await (await fetch(url)).text();
  }))).join("\n");
  const basename = 'tmp.scss';
  Sass.writeFile(basename, fullCode);
  const compiled = await Sass.compile(`@import "${basename}"; `,{indentedSyntax: true});
  document.head.innerHTML += `<style id="${fn(n)}">${compiled}</style>`;
  console.log(`The ${capit(fn(n).replace("-dot-",".").replace(RegExp("-","g")," "))} Was Loaded.`);
})();

//SASS
(async () => {
  var n;
  let buffer='';
  const fullCode = (await Promise.all([...document.querySelectorAll("link")]
    .filter(l => l.rel === 'stylesheet/sass')
    .map(async l=>{
      url = l.href;
      n=url.substring(url.lastIndexOf("/")+1);
      return await (await fetch(url)).text();
  }))).join("\n");
  const basename = 'tmp.sass';
  Sass.writeFile(basename, fullCode);
  const compiled = await Sass.compile(`@import "${basename}"; `,{indentedSyntax: false});
  document.head.innerHTML += `<style id="${fn(n)}">${compiled}</style>`;
  console.log(`The ${capit(fn(n).replace("-dot-",".").replace(RegExp("-","g")," "))} Was Loaded.`);
  })();