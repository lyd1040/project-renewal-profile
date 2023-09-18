<template>
  <footer>
    <div id="footerContentsWrap" :class="footerContentsClass">
      <div class="footerlinkWrap">
        <a href="/" v-for="(contents,index) in footerContentsArr" :key="index+contents" @click="(event) =>{
          event.preventDefault(); 
          UpdateModalContents(contents);
          ChangeModalState(event);
        }">
          {{ contents }}
        </a>
      </div>
      <p class="copyright">&copy;copyright</p>
    </div>
  </footer>
</template>

<script lang="ts">
  import { ref, defineComponent, onMounted, onUpdated } from 'vue'
  export default defineComponent({
    props:{
      ContentsClass:String,
      show_hide_modal:Boolean,
      footerSaveText:String
    },
    setup(props,{emit}){
      const footerContentsArr = ['교육내용','자격증','개인정보'];
      const footerContentsClass = ref('footerContentsWrap');
      onUpdated(()=>{
        CheckheaderContentsClass()
      })

      const UpdateModalContents = (newValue:string) =>{
        emit('ChangeModalContentsText',newValue);
      }

      const ChangeModalState=(event:MouseEvent)=>{
        let PropsModalState = !props.show_hide_modal;
        emit('ChangeShowHideModal', PropsModalState);
      }

      //헤더쪽 클래스 확인후 변경
      const CheckheaderContentsClass = () =>{
        if(props.ContentsClass==='headerContentsWrap'){
          footerContentsClass.value='footerContentsWrap';
        }else{
          footerContentsClass.value='footerContentsWrap active';
        }
      }
      return{
        footerContentsClass,
        footerContentsArr,
        UpdateModalContents,
        ChangeModalState
      }
    }
  })
</script>

<style scoped lang="scss">
@import '../style/variables';
  footer{
    position: absolute;
    bottom: 0;

    @include SetWH(100%, 70px);
    transition: 0.3s;

    z-index: 1;


    .footerContentsWrap{
      position: absolute;
      top: 0;
      border-top: 1px solid;

      @include SetWH(100%, 100%);
      display: flex;
      justify-content: center;

      background: #fff;

      transition: 0.3s;

      
      &.active{
        bottom: 0;

        @include SetWH(100%,100%);

      }
      a{
        margin: 0 10px;
      }
      .footerlinkWrap{
        margin-top: 5px;

        a{
          font-size: 1em;
          font-weight: 700;

          color: #000;
        }
      }
      .copyright{
          position: absolute;
          bottom: 10px;
          left: 50%;

          transform: translateX(-50%);
        }
    }
  }

  @media screen and (max-width:750px) {
    footer{
      height: 30px;
      .footerContentsWrap{
        position: relative;
        &.active{
          top: calc(-50vh + 30px);

          background: $MainColorSal;
          
          @include SetWH(100%,50vh);
          @include displayFlexJA();
          flex-direction: column;

          .footerlinkWrap{
            @include displayFlexJA();
            flex-direction: column;
            gap: 20px;
            font-size: 1.5em;
          }
        }
        .footerlinkWrap{
          display: none;
        }
      }
    }
  }
</style>