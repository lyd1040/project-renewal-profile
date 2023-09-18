<template>
  <header id="header">
    <div :class= $props.ContentsClass >
      <nav id="gnb" class="gnb">
        <router-link to="/renewalprofile/">About</router-link>
        <router-link to="/renewalprofile/portfolio">Portfolio</router-link>
      </nav>
    </div>
    <button type="button" @click="HeaderChangeClass">
      <span v-if="headerMenuBtn === 'Menu'"><i class="fa-solid fa-bars"></i></span>
      <span v-else><i class="fa-solid fa-x"></i></span>
    </button>
  </header>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
  export default defineComponent({
    props:{
      ContentsClass:String,
      ChangeClass: Function
    },
    setup(props){
      const headerMenuBtn = ref('Menu')

      //모바일 때 메뉴 클릭시 gnb 보여주기
      const HeaderChangeClass = () =>{
        if(props.ChangeClass!==undefined){
          if(props.ContentsClass==='headerContentsWrap active'){
            props.ChangeClass('headerContentsWrap');
            headerMenuBtn.value = 'Menu';
          }
          else{
            props.ChangeClass('headerContentsWrap active');
            headerMenuBtn.value = 'Close';
          }
        }
      }
      return {
        HeaderChangeClass,
        headerMenuBtn
      }
    }
  })
</script>

<style lang="scss">
@import '../style/_variables.scss';
  header{
    position: relative;

    @include SetWH(100%, 70px);
    
    z-index: 999;

    .router-link-active{
      position: relative;

      &::before{
        @include HeaderGnbBeforeAfter(-50%,-50%);
      }
      &::after{
        @include HeaderGnbBeforeAfter(calc(-50% + 2px),calc(-50% + 2px));
      }
    }

    .headerContentsWrap{
      position: absolute;
      top: 0;
      left: 0;

      background: #fff;

      @include SetWH(100%, 100%);
      @include displayFlexJA();
      
      border-bottom: 1px solid;

      transition: 0.3s;
      &.active{
        @include SetWH(100%, 100%);
      }

      .gnb a{
        margin: 10px;

        color: #000;

        font-size: 1.2em;

        font-family: 'TheJamsil5Bold';
      }
    }
    

    button{
      display: none;
    }
  }

  @media screen and (max-width:750px) {
    header{

      .headerContentsWrap{
        @include displayFlexJA();
        &.active{
          @include SetWH(100%, 50vh);

          background: $MainColorGreen;

          .gnb{
            @include displayFlexJA();
            flex-direction: column;

            gap: 20px;

            text-align: center;
            a{
              font-size: 1.5em;
            }
          }
        }

        .gnb{
          display: none;
        }
      }
      button{
        display: block;

        position: absolute;
        top: 35px;
        right: 10px;

        background: 0;
        border: 0;

        font-size: 1.5em;

        transform: translateY(-50%);
      }
    }
  }
</style>