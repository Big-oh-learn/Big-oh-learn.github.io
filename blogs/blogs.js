window.addEventListener("blog-downloaded",ev=>{
    let body = getUI(ev.detail.blogs,false);
    $(".blog-results").innerHTML=`<p class="fsl" style="text-align:center;"><form class="d-flex" role="search" action="/links/" style="max-width:500px;margin:auto;">
    <input class="form-control me-2" type="search" placeholder="Enter Your Query" aria-label="Search" name="q">
    <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
    </form><br></p>${body}`
});