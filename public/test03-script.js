var cvs = $("canvas");
        var ctx = cvs[0].getContext("2d");
        
        var cvsw = cvs.width();
        var cvsh = cvs.height();
        
        var gridRatio = 0.1;
        
        
        
        
        
        
        
        var clampWrap = (a,n,m) => a>m?n:a<n?m:a;
        
        function wordToHex(str){ 
          var ctx = document.createElement('canvas').getContext('2d');
          ctx.fillStyle = str;
          return ctx.fillStyle;
        }
        
        
        function ratioRGB(c1,c2,dist){
            return new COLOR({
                r:numberToward(c1.rgb.r, c2.rgb.r, dist),
                g:numberToward(c1.rgb.g, c2.rgb.g, dist),
                b:numberToward(c1.rgb.b, c2.rgb.b, dist)
            },"rgb");
        }
        function drawGradient(ctx,direction,stops,position) {
          var grd=ctx.createLinearGradient.apply(ctx,direction);
          for(var i in stops) {
            grd.addColorStop.apply(grd,stops[i]);
          }
          ctx.fillStyle=grd;
          ctx.fillRect.apply(ctx,position);
        }
        
        function storeImage(cvs,w,h) { 
          var i = new Image();
          i.src = cvs[0].toDataURL();
          return i;
        }
        
        function gradientSquare(x,y,w,h,corners,fn){
          var cvstemp = $(`<canvas width='${w}' height='${h}'>`);
          var ctxtemp = cvstemp[0].getContext("2d");
          
          // color 1 and 2
          drawRect(ctxtemp,x,y,w,h,{fillStyle:`rgb(${corners[0]})`});
          drawGradient(ctxtemp,[x,y,w-x,y],[[0,`rgba(${corners[1]},0)`],[1,`rgba(${corners[1]},1)`]],[x,y,w,h]);
        
          // feather the bottom of the current gradient
          ctxtemp.globalCompositeOperation = "destination-out";
          drawGradient(ctxtemp,[x,y,x,h-y],[[0,"rgba(0,0,0,0)"],[1,"rgba(0,0,0,1)"]],[x,y,w,h]);
          ctxtemp.globalCompositeOperation = "source-over";
          
          // store steps 1 & 2 and clear canvas
          var imgdata = storeImage(cvstemp,w,h);
          ctxtemp.clearRect(x,y,w,h);
        
          // color 3 and 4
          drawRect(ctxtemp,x,y,w,h,{fillStyle:`rgb(${corners[2]})`});
          drawGradient(ctxtemp,[x,y,w-x,y],[[0,`rgba(${corners[3]},1)`],[1,`rgba(${corners[3]},0)`]],[x,y,w,h]);
          
          // draw steps 1 & 2 over steps 3 & 4, wait a millisecond before drawing because reasons
          setTimeout(function(){
            ctxtemp.drawImage(imgdata,x,y,w,h);
            ctx.putImageData(ctxtemp.getImageData(x,y,w,h),x,y);
            console.log(fn)
            if(fn!==undefined) fn();
          },1);
          
        }
        
        
        function makeGradientGrid(corners,points){
          
        }
        
        
        makeGradientGrid(
          [
            $(".choice1").val(),
            $(".choice2").val(),
            $(".choice3").val(),
            $(".choice4").val()
          ],
          [
            [0.3,0.4,(new COLOR("red")).toString("rgbv")]
          ]
        )
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // Demo Code
        
        function setCanvasSize(){
          cvsw = $(window).width()*gridRatio;
          cvsh = $(window).height()*gridRatio;
          cvs.attr({
            width:cvsw,
            height:cvsh
          })
        }
        
        setCanvasSize();
        
        
        function makeGradientSquare(fn){
          gradientSquare(
            0,0,cvsw,cvsh,
            [$(".choice1").val(),
            $(".choice2").val(),
            $(".choice3").val(),
            $(".choice4").val()],
            fn
          );
        }
        
        function setRandomGroup(){
          for(var i=1;i<5;i++) {
            setRandom(i);
          }
        }
        function setRandom(num){
          $(".choice"+num).val(`${rand(0,255)},${rand(0,255)},${rand(0,255)}`);
        }
        
        function gradiateToward(index,startColor,endColor,time,fn){
          var starttime = new Date();
          var c1 = new COLOR(startColor);
          var c2 = new COLOR(endColor);
          var animateColor = function(){
            var now = new Date();
            var elapsed = now - starttime;
            var distance = elapsed / time;
            var c = ratioRGB(c1,c2,distance);
            fn(index,c);
            if(elapsed<time) window.requestAnimationFrame(animateColor);
          }
          animateColor();
        }
        
        setRandomGroup();
        makeGradientSquare();
        
        var timerloop = false;
        var timerdraw = false;
        var colorindex = 1;
        var interval = 3000;
        
        $(".rgbchoice").on("input",makeGradientSquare);
        $(".new-random").on("click",function(){ setRandomGroup(); makeGradientSquare(); });
        $(".start-rando").on("click",function(){
          
          colorindex = 1;
          
          if(timerloop!==false) {
            clearInterval(timerloop);
            cancelAnimationFrame(timerdraw);
            timerloop = false;
            timerdraw = false;
            $(this).html("Start Slideshow");
          } else {
            $(this).html("Stop Slideshow");
            timerloop = setInterval(function(){
              gradiateToward(
                colorindex,
                "rgb("+$(".choice"+colorindex).val()+")",
                "rgb("+`${rand(0,255)},${rand(0,255)},${rand(0,255)}`+")",
                interval,
                function(i,c){
                  $(".choice"+i)
                    .val(c.toString("rgbv"))
                    .css({
                      "background-color":c.toString("rgb"),
                      "color":c.hsl.l>50?"black":"white"
                    });
                }
              );
              colorindex = clampWrap(++colorindex,1,4);
            },interval*0.4);
            
            var drawLoop = function(){
              makeGradientSquare(function(){
                timerdraw = window.requestAnimationFrame(drawLoop);
              });
            }
            drawLoop();
          }
        });
        
        $(window).on("resize",function(){
          setTimeout(function(){
            setCanvasSize();
            makeGradientSquare();
          },10);
        });