<template>
  <div class="app"></div>
     <Editor v-model="state"></Editor>
</template>

<script>
import { ref } from 'vue';
import data from './data.json';
import Editor from '@/packages/editor';
import {registerConfig as config} from '@/utils/editor-config' ;
import { provide } from 'vue';
const realstate = JSON.parse(localStorage.getItem('todos'))
const states=ref(data)
var odof=false
const statess=realstate||states
export default{
   components:{
     Editor
   },
   setup(){
     const state =ref(statess)
     provide('config',config);//将组件的配置加入
     return{
       state
     }     
   },
   watch:{
     state(value){
       localStorage.setItem('todos',JSON.stringify(value))
       
     }
   }
 }
</script>

<style>
</style>