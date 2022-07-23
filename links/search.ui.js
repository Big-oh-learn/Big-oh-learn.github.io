var $=q=>document.querySelector(q),
params=new URLSearchParams(window.location.search),
query=params.get("q"),
red=params.get("r"),
getUI=(blogs,KeepDefault)=>{
        let results = blogs,body="";
        if(KeepDefault!=false){
        body =`
        <p class="fsl">
        Search results for <strong class="visit-link">${query}</strong> | Found <strong class="visit-link">${results.length}</strong> results
        </p>
        `;
        }
        if(results.length==0){
            results.push({
                name:"0 results found",
                author:"ERROR : No records",
                description:`Try Any other keyword to search or search globally on <a href="http://ecosia.org/search?q=${query}"  target="_blank">Ecosia.org <i class="bi bi-search"></i></a>`,
                url:"index.html?r=no_results_found_search_md_file",
                image:"/assets/404.jpg"
            })
        }
        for(let res of results){
            body+=`
            <div class="card">
            <div class="card-header">
            <h1>
             ${res.name}
            </h1>
            </div>
                <div class="card-body">
                <h5 class="card-title">${res.author}</h5>
                <img src="${res.image}">
                <p class="card-text">${res.description}</p>
                <a href="${res.url}" class="btn btn-primary fsl">Read more <i class="bi bi-book"></i></a>
            </div>
            </div>
            `
        }
        return body;
}
if(query){
   window.addEventListener("blog-downloaded",ev=>{
    let body = getUI(ev.detail.search(query));
    $(".blog-results").innerHTML=body;
    }) 
}else if(red){
    fetch("/links/links.json").then(ev=>ev.json()).then(json=>{
        if(json[red]){
            $(".blog-results").innerHTML=`
            <h1 align="center">
            Continue to
            <a href="${json[red]}"> ${red}</a>
            </h1>
            `;
        }else{
            $(".blog-results").innerHTML=`<p class="fsl" align="center">404 link not found <br> try <a href="index.html?q=${red}">search in blogs</a></p>`;   
        }
    })
}else{
    window.addEventListener("blog-downloaded",ev=>{
    let body = getUI(ev.detail.blogs,false);
    $(".blog-results").innerHTML=`<p class="fsl" style="text-align:center;"><form class="d-flex" role="search" action="/links/" style="max-width:500px;margin:auto;">
    <input class="form-control me-2" type="search" placeholder="Enter Your Query" aria-label="Search" name="q">
    <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
    </form><br></p>${body}`
    });
}