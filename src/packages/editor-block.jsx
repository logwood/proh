import { computed, defineComponent, inject, onMounted,ref } from "vue";

export default defineComponent({
     props:{
         block:{type:Object}
     },
     setup(props){
        const blockStyles =computed(()=>({
              top:`${props.block.top}px`,
              left:`${props.block.left}px`,
              zIndex:`${props.block.zIndex}`
        }));
        const config=inject('config');
        const blockRef=ref(null);
        onMounted(()=>{
           let {offsetWidth,offsetHeight}= blockRef.value;
           if(props.block.alignCenter){
            props.block.left=props.block.left-offsetWidth/2;
            props.block.top=props.block.top-offsetHeight/2;
            props.block.alignCenter=false;
           }
           props.block.width=offsetWidth;
           props.block.height=offsetHeight;
        })
        return()=>
        {     //通过block的key属性获取对应的key
            const componment=config.componmentMap[props.block.key];
            //获取key的render函数
            const RenderComponment=componment.render();
            return <div class="editor-block" style={blockStyles.value} ref={blockRef}>
                {RenderComponment}
            </div>
        }
     }
    })