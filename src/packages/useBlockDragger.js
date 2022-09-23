import { linkEmits } from "element-plus";
import { reactive } from "vue";

export function useBlockDragger(focusData,lastIndexBlock){
            let  dragState={
                startX:0,
                startY:0
            }
            let markLine=reactive(
               {
                x:null,
                y:null
               }
            )
            const mousedown=(e)=>{
                const {width:BWidth,height:BHeight}= lastIndexBlock.value
                dragState={
                startX:e.clientX,
                startY:e.clientY,//记录每个选中位置
                startLeft:lastIndexBlock.value.left,
                startTop:lastIndexBlock.value.top,
                startPos:focusData.value.focus.map(({top,left})=>({top,left})),
                lines:(()=>{
                    const {unfocused}=focusData.value;
                    
                    //console.log(focusData.value);
                       let lines={x:[],y:[]};//获取其他选中的位置以获得辅助线
                       unfocused.forEach((block)=>{
                       const {top:ATop,left:ALeft,width:AWidth,height:AHeight}=block;//横线处理函数
                       lines.y.push({showTop:ATop,top:ATop});
                       lines.y.push({showTop:ATop,top:ATop-BHeight});
                       lines.y.push({showTop:ATop+AHeight/2,top:ATop+AHeight/2-BHeight/2});
                       lines.y.push({showTop:ATop+AHeight,top:ATop+AHeight});
                       lines.y.push({showTop:ATop+AHeight,top:ATop+AHeight-BHeight});
                       lines.x.push({showLeft:ALeft,left:ALeft});
                       lines.x.push({showLeft:ALeft+AWidth,left:ALeft+AWidth});
                       lines.x.push({showLeft:ALeft+AWidth/2,left:ALeft+AWidth/2-BWidth/2});
                       lines.x.push({showLeft:ALeft+AWidth,left:ALeft+AWidth-BWidth});
                       lines.x.push({showLeft:ALeft,left:ALeft-BWidth});
                    })
                    return lines
               })()
            }
                document.addEventListener('mousemove',mousemove);
                document.addEventListener('mouseup',mouseup)
            }
            const mousemove=(e)=>{
                let {clientX:moveX,clientY:moveY}=e;
                //计算最新的left，top
                let y=null;
                let x=null;
                let left=moveX-dragState.startX+dragState.startLeft;
                let top=moveY-dragState.startY+dragState.startTop
                for(let i=0;i<dragState.lines.y.length;i++){
                    const {top:t,showTop:s}=dragState.lines.y[i];
                    if(Math.abs(t-top)<5){
                               y=s;
                               moveY=dragState.startY-dragState.startTop+t;
                               //实现贴边
                               break;//找到一个就跳
                    }
                }
                for(let i=0;i<dragState.lines.x.length;i++){
                    const {left:l,showLeft:s}=dragState.lines.x[i];
                    if(Math.abs(l-left)<5){
                               x=s;
                               moveX=dragState.startX-dragState.startLeft+l;
                               //实现贴边
                               break;//找到一个就跳
                    }
                }
                markLine.x=x;
                markLine.y=y;

                let durX=moveX-dragState.startX;
                let durY=moveY-dragState.startY;
                focusData.value.focus.forEach((block,idx)=>{
                        block.top=dragState.startPos[idx].top+durY;
                        block.left=dragState.startPos[idx].left+durX;
                }
                )
            }   
            const mouseup=(e)=>{
                document.removeEventListener('mousemove',mousemove);
                document.removeEventListener('mouseup',mouseup);
            } 
            return{
                mousedown,
                markLine
            }
        }