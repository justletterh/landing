function fn(s){
    return `compiled-${s.split(".").slice(-1)[0]}-stylesheet-${s.toLowerCase().replace(RegExp("\\.", 'g'),"-dot-")}`.toLowerCase();
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
    const compiled = await Sass.compile(`@import "${basename}"; `);
    document.head.innerHTML += `<style id="${fn(n)}">${compiled}</style>`;
})();
//SASS
Sass.options({indentedSyntax: false});
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
    console.log(compiled)
    document.head.innerHTML += `<style id="${fn(n)}">${compiled}</style>`;
})();