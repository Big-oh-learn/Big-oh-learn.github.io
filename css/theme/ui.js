$=q=>document.querySelector(q);
$all=q=>document.querySelectorAll(q);
var lastScrollTop = 0;
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