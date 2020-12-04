window.onload=setup;

function setup(){
    $("#dohvati").on("click",dohvacanje)
    $("#mostPopular").on("click",dohvacanjeMostPopular)
    $("#topRatedYear").on("click",dohvacanjePoGodini)
    //$("#stvoriBazu").on("click",stvaranjeBaze)
    localStorage.clear();
    
}

function spremiREC(broj){
    window.location="unosRecenzije.html";
    localStorage.setItem("broj",broj);
}

function back(){
    window.location="index.html";
}

//var zahtjev3=new XMLHttpRequest;
function dohvatiREC(broj){
    //broj je idFilma
    localStorage.clear();
    
    localStorage.setItem("broj",broj)

    window.location="sveRecenzije.html"
    
}

var unos;
var zahtjev=new XMLHttpRequest;
function dohvacanje(){
    var objekt;
    unos=document.getElementById("broj").value;
            zahtjev.onreadystatechange=function(){
                if(zahtjev.status==200 && zahtjev.readyState==4){
                    objekt=JSON.parse(zahtjev.responseText);
                    document.getElementById("ispis").innerHTML="";
                    document.getElementById("ogranicenjePoruka").innerHTML=""
                    //document.getElementById("popis").innerHTML=zahtjev.responseText,toString();___div.innerHTML=`<h1>${objekt.places[i]["place name"]}</h1>`;
                    document.getElementById("brFilmova").innerHTML=`Broj pronađenih filmova je: ${objekt.total_results}`;
                    var imaLiOgranicenja=Number(objekt.total_results)
                

                    if (Number(objekt.total_results)>20) {
                        document.getElementById("ogranicenjePoruka").innerHTML="Prikazuje se 20 najrelevantnijih naslova."
                        
                        for (let i = 0; i < 20; i++) {

                            var putanjaSlike=objekt.results[i]["poster_path"]
                            var fullPutanja="https://image.tmdb.org/t/p/w300"+putanjaSlike;

                            var div=document.createElement("div");
                         
                            div.setAttribute("data-role","collapsible");
                            

                            div.innerHTML=`<h1>${objekt.results[i]["title"]}</h1>`;
                            div.innerHTML+=`<p>${objekt.results[i]["overview"]}</p>`;  
                            div.innerHTML+=`<p>Godina: ${objekt.results[i]["release_date"]}</p>`;  
                            div.innerHTML+=`<p>Prosjecna ocjena: ${objekt.results[i]["vote_average"]}</p>`;

                            div.innerHTML+=`<button onclick="spremiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: lightsalmon;" style="color: white;">Ostavi recenziju</button><button onclick="dohvatiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: yellowgreen;" style="color: white;">Sve recenzije</button>`
                            
                            div.innerHTML+=`<img src=${fullPutanja}>`;
                            

                                        
                            document.getElementById("ispis").append(div);
                        }
                        $("#ispis").trigger("create");

                    }
                    
                    else{
                    
                        for (let i = 0; i < objekt.total_results; i++) {

                            var putanjaSlike=objekt.results[i]["poster_path"]
                            var fullPutanja="https://image.tmdb.org/t/p/w300"+putanjaSlike;
                
                            var div=document.createElement("div");
                            div.setAttribute("data-role","collapsible");
                            div.innerHTML=`<h1>${objekt.results[i]["title"]}</h1>`;
                            div.innerHTML+=`<p>${objekt.results[i]["overview"]}</p>`;  
                            div.innerHTML+=`<p>Godina: ${objekt.results[i]["release_date"]}</p>`;  
                            div.innerHTML+=`<p>Prosjecna ocjena: ${objekt.results[i]["vote_average"]}</p>`;
                            div.innerHTML+=`<button onclick="spremiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: lightsalmon;" style="color: white;">Ostavi recenziju</button><button onclick="dohvatiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: yellowgreen;" style="color: white;">Sve recenzije</button>`
                            div.innerHTML+=`<img src=${fullPutanja}>`;
                            
 
                            document.getElementById("ispis").append(div);
                        }
                        $("#ispis").trigger("create");
                    }
                }
                
            }
            zahtjev.open("GET","http://api.themoviedb.org/3/search/movie?api_key=dd0f5e086bb2f44bd3a850f498e183c0&query="+unos,true);
            zahtjev.send();
}

function dohvacanjeMostPopular(){
    var objekt;
    
    zahtjev.onreadystatechange=function(){
        if(zahtjev.status==200 && zahtjev.readyState==4){
            objekt=JSON.parse(zahtjev.responseText);
            document.getElementById("top10").innerHTML="divMostPopular";
            
            
            
            var imaLiOgranicenja=Number(objekt.total_results)
                        
        
            if (Number(objekt.total_results)>10) {
                document.getElementById("top10").innerHTML="Prikazuje se 10 najrelevantnijih naslova."
                                
                for (let i = 0; i < 10; i++) {
        
                    var putanjaSlike=objekt.results[i]["poster_path"]
                    var fullPutanja="https://image.tmdb.org/t/p/w300"+putanjaSlike;
                        
                    var div=document.createElement("div");
                    div.setAttribute("data-role","collapsible");
                    div.innerHTML=`<h1>${objekt.results[i]["title"]}</h1>`;
                    div.innerHTML+=`<p>${objekt.results[i]["overview"]}</p>`;  
                    div.innerHTML+=`<p>Godina: ${objekt.results[i]["release_date"]}</p>`;  
                    div.innerHTML+=`<p>Prosjecna ocjena: ${objekt.results[i]["vote_average"]}</p>`;
                    div.innerHTML+=`<p>Popularity: ${objekt.results[i]["popularity"]}</p>`; 

                    div.innerHTML+=`<button onclick="spremiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: lightsalmon;" style="color: white;">Ostavi recenziju</button><button onclick="dohvatiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: yellowgreen;" style="color: white;">Sve recenzije</button>`

        
                    div.innerHTML+=`<img src=${fullPutanja}>`;
                                    
                                       
                                                
                    document.getElementById("divMostPopular").append(div);
                }
                $("#divMostPopular").trigger("create");
        
            }
                            
            else{
                            
        
                for (let i = 0; i < objekt.total_results; i++) {
        
                    var putanjaSlike=objekt.results[i]["poster_path"]
                    var fullPutanja="https://image.tmdb.org/t/p/w300"+putanjaSlike;
                        
                    var div=document.createElement("div");
                    div.setAttribute("data-role","collapsible");
                    div.innerHTML=`<h1>${objekt.results[i]["title"]}</h1>`;
                    div.innerHTML+=`<p>${objekt.results[i]["overview"]}</p>`;  
                    div.innerHTML+=`<p>Godina: ${objekt.results[i]["release_date"]}</p>`;  
                    div.innerHTML+=`<p>Prosjecna ocjena: ${objekt.results[i]["vote_average"]}</p>`;
                    div.innerHTML+=`<p>Popularity: ${objekt.results[i]["popularity"]}</p>`;  

                    div.innerHTML+=`<button onclick="spremiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: lightsalmon;" style="color: white;">Ostavi recenziju</button><button onclick="dohvatiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: yellowgreen;" style="color: white;">Sve recenzije</button>`
                                    
                    div.innerHTML+=`<img src=${fullPutanja}>`;
                                            
                    document.getElementById("divMostPopular").append(div);
                }
                $("#divMostPopular").trigger("create");
            }
        }
                        
    }
    zahtjev.open("GET","http://api.themoviedb.org/3/discover/movie?api_key=dd0f5e086bb2f44bd3a850f498e183c0&sort_by=popularity.desc",true);
    zahtjev.send();
}

function dohvacanjePoGodini(){
    var unos=document.getElementById("pretragaGodina").value;

    var p="https://api.themoviedb.org/3/discover/movie?api_key=dd0f5e086bb2f44bd3a850f498e183c0&sort_by=popularity.desc&include_adult=false&primary_release_year=";
    var d=unos
    
    

    var rez=p+d;


    var objekt;
    document.getElementById("col").innerHTML="";
    zahtjev.onreadystatechange=function(){
        if(zahtjev.status==200 && zahtjev.readyState==4){
            objekt=JSON.parse(zahtjev.responseText);
            
            //dohvati input
            

            document.getElementById("vijest").innerHTML=`10 najpopularnijih filmova iz ${unos}. godine su:`;

            

                                
            for (let i = 0; i < 10; i++) {
        
                var putanjaSlike=objekt.results[i]["poster_path"]
                var fullPutanja="https://image.tmdb.org/t/p/w300"+putanjaSlike;
                        
                var div=document.createElement("div");
                div.setAttribute("data-role","collapsible");
                 
                div.innerHTML=`<h1>${objekt.results[i]["title"]}</h1>`;
                div.innerHTML+=`<p>${objekt.results[i]["overview"]}</p>`;  
                div.innerHTML+=`<p>Godina: ${objekt.results[i]["release_date"]}</p>`;  
                div.innerHTML+=`<p>Prosjecna ocjena: ${objekt.results[i]["vote_average"]}</p>`;
                div.innerHTML+=`<p>Popularity: ${objekt.results[i]["popularity"]}</p>`; 

                div.innerHTML+=`<button onclick="spremiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: lightsalmon;" style="color: white;">Ostavi recenziju</button><button onclick="dohvatiREC(${objekt.results[i]["id"]})" class="recenzijeBTN" style="background-color: yellowgreen;" style="color: white;">Sve recenzije</button>`
        
                div.innerHTML+=`<img src=${fullPutanja}>`;
                                    
                                       
                                                
                document.getElementById("col").append(div);
            }
            $("#col").trigger("create");
        
            
                            
            
        }
                        
    }
    zahtjev.open("GET",rez,true);
    zahtjev.send();
}

