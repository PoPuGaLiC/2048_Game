(()=>{document.getElementById("canvas").getContext("2d");var e=["asset/Field.png","asset/CountField.png"];for(let t=1;t<12;t++)e[t+1]="asset/Sprite_"+2**t+".png";var t=cc.Sprite.extend({ctor:function(e,t,i){this._super(e),this.setPosition(t,i)}}),i=cc.Layer.extend({ctor:function(){this._super(),this.tileArray=Array(16).map((e=>0));do{placeOne=Math.floor(16*Math.random()),placeTwo=Math.floor(16*Math.random())}while(placeOne==placeTwo);this.tileArray[placeOne]=new t(e[2],84*(placeOne%4+1)-37.5,87*(4-Math.floor(placeOne/4))-37.5),this.tileArray[placeTwo]=new t(e[2],84*(placeTwo%4+1)-37.5,87*(4-Math.floor(placeTwo/4))-37.5),this.addChild(this.tileArray[placeOne],2),this.addChild(this.tileArray[placeTwo],2),cc.eventManager.addListener({event:cc.EventListener.MOUSE,onMouseDown:function(e){prevX=e._x,prevY=e._y},onMouseUp:function(e){if(nextX=e._x,nextY=e._y,diffX=Math.abs(nextX)-Math.abs(prevX),diffY=Math.abs(nextY)-Math.abs(prevY),Math.abs(diffX)>50||Math.abs(diffY)>50){let e=Math.abs(diffX)>Math.abs(diffY)?diffX:diffY;console.log(e)}}},this)}});window.onload=function(){cc.game.onStart=function(){cc.LoaderScene.preload(e,(function(){cc.director.setDisplayStats(!1);var t=cc.Scene.extend({onEnter:function(){this._super();var t=0,a=cc.director.getWinSize(),n=cc.Sprite.create(e[0]);n.setPosition(a.width/2,191.5),this.addChild(n,0);var c=cc.Sprite.create(e[1]);c.setPosition(a.width/2,a.height-52),this.addChild(c,0),t="СЧЁТ: "+t;var r=new cc.LabelTTF(t,"Arial",32);r.x=a.width/2,r.y=a.height-52,r.setFontFillColor(0,0,0),this.addChild(r,1),this.TileLayer=new i,this.TileLayer.setPosition(25,11),this.addChild(this.TileLayer,1)}});cc.director.runScene(new t)}),this)},cc.game.run("canvas")}})();