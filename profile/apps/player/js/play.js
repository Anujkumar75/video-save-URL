if(sessionStorage.getItem("user")==null)
    {
        window.location.replace("../../../../index.html");
    }
    else{
var current_user=sessionStorage.getItem("user")
var video=document.getElementById("video_player");
var plat_btn=document.getElementById("play_btn");
plat_btn.onclick=function()
{
   if(plat_btn.className=="fa-sharp fa-regular fa-circle-play")
    {
        video.play();
        plat_btn.className="fa-sharp fa-regular fa-circle-pause"
    }
    else if(plat_btn.className="fa-sharp fa-regular fa-circle-pause")
        {
            video.pause();
            plat_btn.className="fa-sharp fa-regular fa-circle-play"

        }
}

// progress bar coding
video.ontimeupdate=function()
{
    var t_duration=this.duration;
    var c_duration=this.currentTime;
    var progress_bar =document.getElementById("progress_bar");
    var video_timing=document.getElementById("video_timing");
   var sec= c_duration-parseInt(c_duration/60)*60;//scecond formula 
   var t_sec=t_duration-parseInt(t_duration/60)*60;
    video_timing.innerHTML=parseInt(c_duration/60)+":"+parseInt(sec)+" / "+parseInt(t_duration/60)+":"+parseInt(t_sec);

    var slide_p= (c_duration*100/t_duration);//parsenInt use ponter after the value no writen
    progress_bar.style.width=slide_p+"%";

    if(c_duration==t_duration)
        {
            plat_btn.className="fa-sharp fa-regular fa-circle-play"
        }

}

//open & close Add video Box.
var open_video_box_btn=document.getElementById("open_video_box_btn");
open_video_box_btn.onclick=function()
{
    var add_video=document.getElementById("add_video_box")
    if(open_video_box_btn.className=="fas fa-plus-circle")
        {
           add_video.style.display="block";
           open_video_box_btn.className="far fa-times-circle";

        }
        else if(open_video_box_btn.className=="far fa-times-circle")
            {
                add_video.style.display="none";
                open_video_box_btn.className="fas fa-plus-circle"
            }
}

// video in localstorage
var add_video_btn=document.getElementById("add_video_btn");
add_video_btn.onclick=function()
{
    var video_name=document.getElementById("video_name");
    var video_link=document.getElementById("video_link");
    if(video_name.value!=""&&video_link.value!="")
        {
            var v_obj={name:video_name.value,link:video_link.value};
            var v_txt=JSON.stringify(v_obj)
            localStorage.setItem(current_user+"video"+video_name.value,v_txt);
        }
}

// fetch all videos from local storage
function load_video()
{
var i;
for(i=0;i<localStorage.length;i++)
    {
       var all_keys=localStorage.key(i);
       if(all_keys.match(current_user+"video"))
        {
           var v_data=localStorage.getItem(all_keys);
          var video_obj= JSON.parse(v_data);

          var div=document.createElement("DIV");
          div.setAttribute("id","main_video_box");
          var p=document.createElement("P");
          p.setAttribute("id","playlist_video_name");
          p.innerHTML=video_obj.name;
          p.className="p_v_name";
          var play_btn=document.createElement("BUTTON");
          play_btn.setAttribute("type","button");
          play_btn.setAttribute("id","video_play_btn");
          play_btn.setAttribute("url",video_obj.link)
          play_btn.innerHTML="Play"
          play_btn.className="v_play_btn"

          var del_btn=document.createElement("BUTTON");
          del_btn.setAttribute("type","button");
          del_btn.setAttribute("id","video_delete_btn");
          del_btn.innerHTML="Delete"
         del_btn.className="delete_btn";

          div.appendChild(p);
          div.appendChild(play_btn);
          div.appendChild(del_btn);

          var all_v=document.getElementById("bottom");
          all_v.appendChild(div);


          
        }
    }
}
load_video();

// onclick video play button coding
function play_video()
{
  var all_v_play_btn=document.getElementsByClassName("v_play_btn");
  var i;
  for(i=0;i<all_v_play_btn.length;i++)
    {
        all_v_play_btn[i].onclick=function()
        {
            clear();
          var v_url= this.getAttribute("url");
         var src_tag=document.getElementById("video_src");
         src_tag.setAttribute("src",v_url);
         video.load();
         video.play();
         plat_btn.className="fa-sharp fa-regular fa-circle-pause";
         this.innerHTML="Playing...";

        }
    }
}
play_video();

function clear()
{
    var all_v_play_btn=document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0;i<all_v_play_btn.length;i++)
        {
            all_v_play_btn[i].innerHTML="Play";

        }
}

// next button coding

function next_btn()
{
var next_btn=document.getElementById("right_btn");
next_btn.onclick=function()
{
    var all_play_btn=document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0;i<all_play_btn.length;i++)
        {
           if( all_play_btn[i].innerHTML=="Playing...")
            {
               var next_elment= all_play_btn[i].parentElement.nextSibling;
           var next_play_btn=next_elment.getElementsByClassName("v_play_btn")[0];
           next_play_btn.click();
           return false;

            }
        }
}
}
next_btn();

// previous button coding

function  previous_btn()
{
var  previous_btn=document.getElementById("left_btn");
previous_btn.onclick=function()
{
    var all_play_btn=document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0;i<all_play_btn.length;i++)
        {
           if( all_play_btn[i].innerHTML=="Playing...")
            {
               var  previous_elment= all_play_btn[i].parentElement.previousSibling;
           var  previous_play_btn= previous_elment.getElementsByClassName("v_play_btn")[0];
           previous_play_btn.click();
           return false;

            }
        }
}
}
previous_btn();

// delete btn coding

function delete_button()
{
 var all_del_btn=document.getElementsByClassName("delete_btn");
 var i;
 for(i=0;i<all_del_btn.length;i++)
    {
        all_del_btn[i].onclick=function()
        {
          var parent=this.parentElement;
         var video_name= parent.getElementsByTagName("P")[0].innerHTML;
         localStorage.removeItem(current_user+"video"+video_name);
         parent.className="animate__animated animate__bounceOut";
         setTimeout(function(){parent.remove();},1000)

         

        }
    }
}
delete_button();
// volume coding
function volume()
{
    var vol_icon=document.getElementById("volume");
    vol_icon.onclick=function()
    {
        var vol_control=document.getElementById("volume_control");
        if(vol_control.style.display=="none")
            {
                vol_control.style.display="block";
                vol_control.oninput=function()
                {
                   video.volume=this.value
                }
            }
            else{
                vol_control.style.display="none"
            }
    }
}
volume();

// click progress coding

var p_box=document.getElementById("progress_box");
p_box.onclick=function(event)
{
     var per=event.offsetX/this.offsetWidth;// width property send to offsetX and offsetWidth the sent to full property and divided to event.offsetX/this.offsetWidth to send propert % 
     video.currentTime=per*video.duration;
}

// full screen coding

var full=document.getElementById("full_scureen");
full.onclick=function()
{
    video.requestFullscreen();
}

// speed coding
var speed_icon=document.getElementById("speed_icon");
speed_icon.onclick=function()
{
    var speed_slider=document.getElementById("speed_control");
    if(speed_slider.style.display=="none")
        {
            speed_slider.style.display="block";
            speed_slider.oninput=function()
            {
                video.playbackRate=this.value
            }
        }
        else if( speed_slider.style.display=="block")
            {
                speed_slider.style.display="none"
            }
}

// search video coding
var search_box=document.getElementById("search");
search_box.oninput=function()
{
 var all_v_name=document.getElementsByClassName("p_v_name");
 var i;
 for(i=0;i<all_v_name.length;i++)
    {
        if(all_v_name[i].innerHTML.toUpperCase().match(search_box.value.toUpperCase()))
            {
                all_v_name[i].parentElement.style.display="block";
            }
            else
            {
                all_v_name[i].parentElement.style.display="none";
            }
    }
}

    }
