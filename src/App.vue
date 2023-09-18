<template>
  <HeaderView :ContentsClass="headerContentsClass" :ChangeClass="ChangeHeaderFooterClass"></HeaderView>
  <main>
    <MainView :ContentsClass="headerContentsClass" :ChangeClass="ChangeHeaderFooterClass"></MainView>
  </main>
  <FooterView :ContentsClass="headerContentsClass" :show_hide_modal="show_hide_modal" :footerSaveText="footerSaveText" @ChangeShowHideModal="ChangeShowHideModal" @ChangeModalContentsText="ChangeModalContentsText"></FooterView>
  <ModalView v-if="show_hide_modal === true" :show_hide_modal="show_hide_modal" :footerSaveText="footerSaveText" @ChangeShowHideModal="ChangeShowHideModal"></ModalView>
</template>

<script lang="ts">
import HeaderView from './views/HeaderView.vue';
import MainView from './views/MainView.vue';
import FooterView from './views/FooterView.vue';
import ModalView from './views/ModalView.vue';
import {ref} from 'vue';
  export default{

    components:{
      'HeaderView':HeaderView,
      'FooterView':FooterView,
      'MainView':MainView,
      'ModalView':ModalView
    },
    setup(){
      const headerContentsClass = ref('headerContentsWrap');
      const ChangeHeaderFooterClass = (newClass:string) =>{
        headerContentsClass.value=newClass
      }

      //모달관련
      let show_hide_modal = ref(false); //모달 보이고 숨기는 state
      let footerSaveText = ref(''); //Footer 컨텐츠 클릭시 모달에 띄우는 state
      const ChangeShowHideModal =()=>{
        show_hide_modal.value = !show_hide_modal.value;
      }

      const ChangeModalContentsText =(text:string)=>{
        footerSaveText.value =text
      }

      return{
        headerContentsClass,
        show_hide_modal,
        footerSaveText,
        ChangeShowHideModal,
        ChangeModalContentsText,
        ChangeHeaderFooterClass,
      }
    }
  }
</script>

<style scoped lang="scss">
@import './style/variables';
main{
  @include SetWH(100%, calc(100vh - 100px))
}
  
</style>
