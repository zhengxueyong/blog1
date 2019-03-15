	 		
	 		
	 		
	 		/**
	 		 * 
	 		 * @param {Object} 需要运动的元素
	 		 * @param {Object} 需要改变的属性
	 		 * @param {Object} 需要达到的目标值(终点值)
	 		 * @param {Object} 回调函数
	 		 */
	 		function startMove(obj,attr,iTarget,fn){
	 			//1.清除之前的定时器
	 			clearInterval(obj.timer);
	 			
	 			//2.再开启新的定时器
	 			obj.timer = setInterval(function(){
	 				//1.获取当前值
	 				var current = 0;
	 				
	 				if(attr == "opacity"){//修改透明度
	 					current = parseFloat(getStyleAtrr(obj,attr))*100;
	 					curre4nt = Math.round(current);
	 					
	 				}else{//left,top,width,height
	 					current = parseFloat(getStyleAtrr(obj,attr));
	 					current = Math.round(current);
	 				}
	 				
	 				
	 				//2.给一个速度
	 				var iSpeed = (iTarget - current)/8;
	 				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	 				
	 				//3.判断是否到达目标值
	 				if(current == iTarget){
	 					clearInterval(obj.timer);//关闭定时器，停止运动
	 					//如果存在回调函数，则执行回调函数
	 					if(fn){
	 						fn();
	 					}
	 					return ;
	 				}
	 				
	 				
	 				//4.运动
	 				if(attr=="opacity"){//透明度
	 					obj.style.opacity = (current + iSpeed)/100;
	 					obj.style.filter  = "alpha(opacity="+(current + iSpeed)+")";
	 				}else{//left,top,width,height
	 					obj.style[attr] = current + iSpeed +　"px";
	 				}
	 				
	 			},30);
	 			
	 			
	 		}
			//获取某个元素的属性值
	   		function getStyleAtrr(obj,attr){
	   			if(window.getComputedStyle){
	   				return window.getComputedStyle(obj,null)[attr];
	   			}
	   			return obj.currentStyle[attr];//ie8-
	   		}