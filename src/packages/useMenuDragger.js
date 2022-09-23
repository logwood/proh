export function useMenuDragger(containerRef,data){
let currentComponent=null;
            const dragenter=(e)=>{
                     e.dataTransfer.dropEffect='move';
            }
            const dragover=(e)=>{
                    e.preventDefault();         
            }
            const dragleave=(e)=>{
                  e.dataTransfer.dropEffect='none';
            }
            const drop=(e)=>{
                  console.log(currentComponent);
                  let blocks = data.value.blocks;
                  data.value={...data.value,blocks:[
                    ...blocks,
                    {
                        top:e.offsetY,
                        left:e.offsetX,
                        zIndex:1,
                        key:currentComponent.key,
                        alignCenter:true
                    }
                  ]
                  }
                  currentComponent=null;
            }
            const dragstart =(e,component)=>{
                //进入元素，经过必须要组织默认行为4
                //离开元素的时候增加一个禁用标识
                 containerRef.value.addEventListener('dragenter',dragenter)
                 containerRef.value.addEventListener('dragover',dragover)
                 containerRef.value.addEventListener('dragleave',dragleave)
                 containerRef.value.addEventListener('drop',drop)
                 currentComponent=component
            }
            const dragend=(e)=>{
                containerRef.value.removeEventListener('drageneter',dragenter)
                containerRef.value.removeEventListener('dragover',dragover)
                containerRef.value.removeEventListener('dragleave',dragleave)
                containerRef.value.removeEventListener('drop',drop)
            }
            return{dragstart,dragend}
        }