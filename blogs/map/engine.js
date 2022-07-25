const json_load = new Event("blog-downloaded")
fetch("/blogs/map/blogs.json").then(res=>res.json()).then(json=>{
    
    json_load.detail={search:(q)=>{
             let filtered_blogs = [];
             for(let blog of json){
                 let search_from = [blog.name,blog.description,blog.url,blog.author];
                 for(let data of search_from){
                    q.split(",").forEach(q=>{
                     if(data.toLowerCase().includes(q.toLowerCase())){
                        if(!filtered_blogs.includes(blog)){
                           filtered_blogs.push(blog); 
                        }
                     }
                    })
                 }
             }
             return filtered_blogs;
     },blogs:json}
     window.dispatchEvent(json_load);
})