import {computed,ref} from 'vue'

export function usefocus(data,callback){
    const selectIndex=ref(-1);
    const lastIndexBlock=computed(()=>data.value.blocks[selectIndex.value])
    const focusData=computed(()=>{
        let focus=[];
        let unfocused=[];
        data.value.blocks.forEach(block=>(block.focus?focus:unfocused).push(block));
        return{focus,unfocused}
    });
    const clearBlockfocus=()=>{
        data.value.blocks.forEach(block => block.focus=false);
    }
    const blockMousedown=(e,block,index)=>{
        e.preventDefault();
        e.stopPropagation();
        //规定一个focus属性
        if(e.shiftKey){
          block.focus=!block.focus
        }else{                
        if(!block.focus){
            clearBlockfocus();
            block.focus=true;
        }
        else{
            block.focus=false;
        }
    }
    selectIndex.value=index;
    callback(e)
    }
    return {
        blockMousedown,
        focusData,
        lastIndexBlock
    }
}