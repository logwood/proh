import { computed, defineComponent, handleError, inject,ref, withCtx } from "vue";
import "./editor.scss";
import editorBlock from "./editor-block";
import { componentSizeMap } from "element-plus";
import deepcopy from "deepcopy";
import { useMenuDragger } from "./useMenuDragger";
import { useFocus } from "@vueuse/core";
import { usefocus } from "./usefocus";
import { useBlockDragger } from "./useBlockDragger";
export default defineComponent(
    {   
        props: {
            modelValue: { type:Object }
        },
        emits:['update:modelValue'],//要触发事件
        setup(props,ctx){
            const data = computed({
                get(){
                    return props.modelValue
                },
                set(newValue){
                    ctx.emit('update:modelValue',deepcopy(newValue))
                }
            });
            const containerStyles =computed(()=>({
                width:data.value.container.width+'px',
                height:data.value.container.height+'px'
            }))
            const config = inject('config') ;
            const containerRef=ref(null);
            //拖拽菜单元素
            const {dragstart,dragend} =useMenuDragger(containerRef,data)
            //拖拽获取焦点
            let {  blockMousedown,focusData,lastIndexBlock}=usefocus(data,(e)=>{
            mousedown(e);
            }); 
            let{mousedown,markLine}=useBlockDragger(focusData,lastIndexBlock);
            const  clearBlockfocus=(e)=>{
                data.value.blocks.forEach(block => block.focus=false);
            }
            const containerMousedown=()=>{
                clearBlockfocus();//点击容器让他失去焦点

            }
            const buttons=[
                {label:'撤销',icon:'icon-back',handler:()=>console.log(撤销)},
                {label:'重做',icon:'icon-back',handler:()=>console.log(撤销)},
            ]
            //console.log(config)
            return() => <div class="editor">
              <div class="editor-left">
                {
                    config.componmentlist.map(component=>(
                        <div class="editor-left-item" draggable
                        onDragstart={e=>dragstart(e,component)}>
                                
                            <span>{component.label}</span>
                            <div>{component.preview()}</div>
                        </div>
                    ))
                }
              </div>
              <div class="editor-top">{buttons.map((btn,index)=>{
                return <div class="editor-top-button" onClick={btn.handler}>
                <i class={btn.icon}></i>
                <i class={btn.label}></i>
                </div>
              })}</div>
              <div class="editor-right">删除区</div>
              <div class="editor-container">
                {/*产生滚动条*/}
                
                    <div class="editor-container-canvas">

                       {/* */}
                       <div class="editor-container-canvas__content" style={containerStyles.value}ref={containerRef} onMousedown={containerMousedown}> 
                            {
                                (data.value.blocks.map((block,index)=>(
                                    
                                 <editorBlock class={block.focus ? "editor-block-focus":""} block={block} onMousedown={(e)=>blockMousedown(e,block,index)}>sdjsd</editorBlock>
                               )))
                            }
                       {markLine.x!==null&&<div class="line-x" style={{left:markLine.x+'px'}}></div>}
                       {markLine.y!==null&&<div class="line-y" style={{top:markLine.y+'px'}}></div>}
                       </div>
                    </div>

              </div>
              </div>//相当于返回后面的值
        }
    }
)