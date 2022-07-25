$=q=>document.querySelector(q);
$all=q=>document.querySelectorAll(q);
var share_cont;
var lastScrollTop = 0;
var bools = {
    isMobile:false
};
window.addEventListener("scroll", function(){
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
       if(st>100){
       $all(".navbar").forEach(el => {
        el.style.top=(-1*el.offsetHeight)+"px";
       });
       }
       $all(".footer").forEach(el => {
        el.style.bottom="0px";
       });
    } else {
        $all(".navbar").forEach(el => {
            el.style.top="0px";
        });
        $all(".footer").forEach(el => {
            el.style.bottom=(-1*el.offsetHeight)+"px";
        });
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
var shortcuts = {
    "/":ev=>{
        $("div.navbar-collapse").classList.add("collapse","show");
        $(".navbar input[type=search]").focus();
    }
}
window.addEventListener("keyup",ev=>{
    for(let shortcut of Object.keys(shortcuts)){
        if(ev.key==shortcut){
            shortcuts[shortcut]();
        }
    }
})
window.addEventListener("load",ev=>{
    if(window.innerHeight<1000){
        bools.isMobile=true;
    }
});
var share = ({url,title,text,files,message}) =>{
    let template = `
    <div class="share-header">
    <h1 class="ellipse">Share:${title}
    </h1>
    <h1  style="margin-left:auto;">
    <a class="btn btn-outline-danger" onclick="closeShare()"><i class="bi bi-arrow-left"></i></a>
    </h1></div>
    <div class="url-cpy">
      <input class="form-control me-2 " value="${url}" id="copy-url-share" disabled>
      <button class="btn btn-outline-success" type="submit" onclick="copy_to_clipboard($('#copy-url-share'))"><i class="bi bi-clipboard"></i></button>
    </div>
    <div class="url-cpy">
      <textarea class="form-control me-2" placeholder="Message (optional)" ></textarea>
      <div class="button"><button class="btn btn-outline-success" type="submit" onclick="addMessage('${url}','${text}','${title}')"><i class="bi bi-card-text"></i></button></div>
    </div>
    <div class="share-body">
      <div class="container">
        <div class="row row-cols-4">
          <div class="col"><a class="btn btn-outline-secondary" href="https://wa.me/?text=${encodeURI(title+"\n"+text+"\n"+url)}"><i class="bi bi-whatsapp"></i></a></div>
          <div class="col"><a class="btn btn-outline-secondary" href="https://twitter.com/intent/tweet?text=${encodeURI(title+"\n"+text+"\n"+url)}"><i class="bi bi-twitter"></i></a></div>
          <div class="col"><a class="btn btn-outline-secondary" href="https://t.me/share/url?url=${url}&text=${encodeURI(title+"\n"+text)}"><i class="bi bi-telegram"></i></a></div>
          <div class="col"><a class="btn btn-outline-secondary" href="https://www.linkedin.com/sharing/share-offsite/?url=${url}"><i class="bi bi-linkedin"></i></a></div>
        </div>
        <div class="row">
          <div class="col"><button class="btn btn-secondary" onclick="navigator.share({url:'${url}',title:'${title}',text:'${text}'})">Navigator.share()</button></div>
        </div>
      </div>
    </div>`;
  if(!files){
    if(share_cont){
      share_cont.remove();
    }
    share_cont = document.createElement("div");
    share_cont.classList.add("share-container");
    share_cont.innerHTML=template;
    document.body.append(share_cont);
  }
}
function copy_to_clipboard(input){
  input.select();
  input.setSelectionRange(0,999999);
  navigator.clipboard.writeText(input.value);
  console.log("copied")
}
function addMessage(urlOrigin,text,title){
  var href = new URL(urlOrigin);
  href.searchParams.set('message', $(".share-container textarea").value);
  share({
    url:href,
    message:$(".share-container textarea").value,
    title:title,
    text:text
  });
}
var closeShare =()=>{
  if(share_cont){
    share_cont.remove();
  }
}
