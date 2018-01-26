"use strict";function setup(){for(var t=0;t<opts.particleAmount;t++)particles.push(new Particle);window.requestAnimationFrame(loop)}function loop(){window.requestAnimationFrame(loop),tick++,canvas.fillStyle=opts.backgroundColor,canvas.fillRect(0,0,w,h);for(var t=0;t<particles.length;t++)particles[t].update(),particles[t].draw();for(var i=0;i<particles.length/2;i++)communicatePoints(particles[i],particles)}var canvasBody=document.getElementById("canvas"),canvas=canvasBody.getContext("2d"),w=canvasBody.width=window.innerWidth,h=canvasBody.height=window.innerHeight,tick=0,opts={backgroundColor:"#111",particleColor:"#fcfcfc",particleAmount:Math.floor(w*h/65e4*40),defaultSpeed:1,addedSpeed:.5,defaultRadius:2,addedRadius:2,communicationRadius:150},particles=[],Particle=function(t,i){this.x=t||Math.random()*w,this.y=i||Math.random()*h,this.radius=opts.defaultRadius+Math.random()*opts.addedRadius,this.speed=Math.pow(opts.defaultRadius/this.radius,6)*opts.defaultSpeed+Math.random()*opts.addedSpeed,this.directionAngle=Math.floor(360*Math.random()),this.color=opts.particleColor,this.d={x:Math.cos(this.directionAngle)*this.speed,y:Math.sin(this.directionAngle)*this.speed},this.update=function(){this.border(),this.x+=this.d.x,this.y+=this.d.y},this.border=function(){(this.x>=w||this.x<=0)&&(this.d.x*=-1),(this.y>=h||this.y<=0)&&(this.d.y*=-1),this.x>w?this.x=w:this.x,this.y>h?this.y=h:this.y,this.x<0?this.x=0:this.x,this.y<0?this.y=0:this.y},this.draw=function(){canvas.beginPath(),canvas.arc(this.x,this.y,this.radius,0,2*Math.PI),canvas.closePath(),canvas.fillStyle=this.color,canvas.fill()}},checkDistance=function(t,i,a,e){return Math.sqrt(Math.pow(a-t,2)+Math.pow(e-i,2))},communicatePoints=function(t,i){for(var a=0;a<i.length;a++){var e=checkDistance(t.x,t.y,i[a].x,i[a].y),s=1-e/opts.communicationRadius;s>0&&(canvas.lineWidth=s,canvas.strokeStyle="rgba(255,255,255,0.5)",canvas.beginPath(),canvas.moveTo(t.x,t.y),canvas.lineTo(i[a].x,i[a].y),canvas.closePath(),canvas.stroke())}};setup(),window.addEventListener("resize",function(){w=canvasBody.width=window.innerWidth,h=canvasBody.height=window.innerHeight}),canvasBody.addEventListener("click",function(t){particles.push(new Particle(t.pageX,t.pageY)),console.log(particles.length)}),canvasBody.addEventListener("contextmenu",function(t){t.preventDefault(),particles.splice(particles.length-1,1)});var app=function(){var t=void 0,i=void 0,a=void 0,e=function(){i.addEventListener("click",function(){s(t,"nav-active")})},s=function(t,i){t.classList.contains(i)?t.classList.remove(i):t.classList.add(i)};!function(){t=document.querySelector("body"),i=document.querySelector(".menu-icon"),a=document.querySelectorAll(".nav__list-item"),e()}()}();
//# sourceMappingURL=main.js.map
