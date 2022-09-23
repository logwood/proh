//列表区显示所有物料
//key对应组件映射关系
import {ElButton} from 'element-plus'
import {ElInput} from 'element-plus'
function createEditorConfig(){
    const componmentlist=[];
    const componmentMap={};

    return{
        componmentMap,
        componmentlist,
        register:(componment)=>{
            componmentlist.push(componment);
            componmentMap[componment.key]=componment;
        }
    }
}
export let registerConfig =createEditorConfig();

registerConfig.register({
      label:'文本',
      preview:()=>'预览文本',
      render:()=>'渲染文本',
      key:'text'
})
registerConfig.register({
    label:'按钮',
    preview:()=><ElButton>预览按钮</ElButton>,
    render:()=><ElButton>渲染按钮</ElButton>,
    key:'button'
})
registerConfig.register({
    label:'输入框',
    preview:()=><ElInput placeholder="预览输入框"></ElInput>,
    render:()=><ElInput placeholder="渲染输入框"></ElInput>,
    key:'input'
});