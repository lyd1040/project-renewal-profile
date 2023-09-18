<template>
  <article class="home">
    <BannerIntro :BannerClass="Banner_ContentsClass"></BannerIntro>
    <router-view/>
  </article>
</template>

<script lang="ts" >
  import { ref, reactive, onMounted } from 'vue'
  import BannerIntro from '@/components/Article/Banner/BannerIntro.vue';

  export default({
      components: {
        BannerIntro,
        
      },
      setup(){
        const Banner_ContentsClass = ref('Banner_Contents');

        onMounted(()=>{
          changeBanner_ContentsClass();
        })

        //휠 움직일시 배너 변화
        const changeBanner_ContentsClass = () =>{
          window.addEventListener('wheel',(event)=>{
            if(event.deltaY>0){
              Banner_ContentsClass.value ='Banner_Contents active';
            }
            //임시
            //else{
            //  Banner_ContentsClass.value ='Banner_Contents';
            //}
          })

          window.addEventListener('touchmove',()=>{
            Banner_ContentsClass.value ='Banner_Contents active';
          })
        }
        return {
          Banner_ContentsClass
        }
      }
    })

</script>

<style scoped lang="scss">
@import '../style/variables';
  article{
    position: absolute;
    top: 70px;
    left: 0;

    background: $MainColorSal;

    transition: 0.3s;

    @include SetWH(100%, calc(100% - 140px));

    overflow: hidden;
  }

  @media screen and (max-width: 750px) {
    article{
      @include SetWH(100%, calc(100% - 100px))
    }
  }
</style>