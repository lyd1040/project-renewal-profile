<template>
  <div class="portfolioView">
    <div class="container">
      <div class="btnWrap">
        <a v-for="(project,index) in projectInfo" :key="index.toString() + 'btn' + project.name" :href="'#'+project.idLink">{{ project.name }}</a>
      </div>

      <div class="contentsWrap">
        <div v-for="(project,index) in projectInfo" :key="index.toString()+project" :id="project.idLink">
          <div class="showimg" :style="'background: url(' + project.backgroundimg + ') no-repeat'">
            <img :src="project.imgLink" alt="Logo" style="opacity: 0.3;">
          </div>
          <div class="projectIntro">
            <h3 v-if="project.team === 'team'">팀 프로젝트</h3>
            <h3 v-else>개인 프로젝트</h3>
            
            <div>
              <p><span class="tblod">이름:</span> {{ project.name }}</p>
              <p v-if="project.team === 'team'"><span class="tblod">팀인원:</span> {{ project.memberslength }}명</p>
              <p v-if="project.team === 'team'"><span class="tblod">맡은부분:</span> {{ project.part }}</p>
              <p><span class="tblod">사용 기술:</span> {{ project.skills }}</p>
              <p><span class="tblod">GitHub:</span> <a :href="project.githubLink" target="_blank">{{ project.githubLink }}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup(){
    const projectInfo = [
      {
        team:'team',
        idLink:'Hollys',
        name:'할리스 리뉴얼',
        memberslength:4,
        part:'할리스몰, 로그인/회원가입, 아카데미/교육과정, 매장찾기',
        skills:'HTML, CSS, JavaScript, jQuery',
        githubLink:'https://github.com/Jay325K/groupOf2',
        imgLink:'/renewalprofile/assets/Logo/HollysLogo.png',
        backgroundimg:'/renewalprofile/assets/background/HollysBackground.gif'
      },
      {
        team:'solo',
        idLink:'Woosuk',
        name:'우석대(컴퓨터공학과) 리뉴얼',
        skills:'HTML, CSS, JavaScript, Firebase',
        githubLink:'https://github.com/lyd1040/UNIVERSITY',
        imgLink:'/renewalprofile/assets/Logo/WoosukLogo.png',
        backgroundimg:'/renewalprofile/assets/background/WoosukBackground.gif'
      },
      {
        team:'solo',
        idLink:'E_Calendar',
        name:'Event Calendar',
        skills:'React, CSS, SASS, JavaScript, TypeScript, Firebase',
        githubLink:'https://github.com/lyd1040/calender_project',
        imgLink:'/renewalprofile/assets/Logo/EventCalendarLogo.png',
        backgroundimg:'/renewalprofile/assets/background/EventCalendarBackground.gif'
      }
    ]
    

    return{
      projectInfo
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../../style/variables';
.portfolioView{
  height: calc(100% - 250px);
  overflow-y: scroll;
  scroll-behavior: smooth;

  display: flex;
  justify-content: center;
  
  .container{

    .btnWrap{
      width: 100%;

      display: flex;
      gap: 20px;
      justify-content: center;

      margin-top: 20px;

      a{
        font-family: 'TheJamsil5Bold';
        border-radius: 5px;
        padding: 10px;

        color: #000;
        background: #fff;

        box-shadow: 0 0 5px $TextColorSelect;

        &:hover{
          background: $PointColorGreen;
          color: #fff;
        }
      }
    }
    .contentsWrap{
      width: 100%;
      &>div{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        
        margin: 50px 0;

        .projectIntro{
          display: flex;
          flex-direction: column;
          gap: 20px;

          height: 100%;

          h3{
            width: 150px;
            text-align: center;
            padding: 10px;

            background: #e9b384;
            color: #000;

            font-weight: 700;
          }

          div{

            display: flex;
            justify-content: space-between;
            flex-direction: column;
            gap: 20px;

            .tblod{
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
  
@media screen and (max-width:750px) {
  .portfolioView{
    width: 100%;
    height: calc(100% - 150px);
    .container{
      width: 100%;
      .btnWrap{
        width: 80%;

        margin: 0 auto;

        text-align: center;

        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;

        margin-top: 20px;

        a{
          border-radius: 5px;
          padding: 10px ;
        }
      }
      .contentsWrap{
        width: 90%;
        margin: 0 auto;
        &>div{
          position: relative;
          justify-content: center;

          padding: 70px 0;
          &:nth-child(1){
            padding-top: 0 ;
          }
          &::before{
            position: absolute;
            top: 100%;
            left: -5%;

            transform: translateY(20px);

            content: '';

            width: 100vw;

            box-shadow: 0 0 30px #000000;
            border: 2px solid #808080;
          }

          &:nth-last-child(1)::before{
            width: 0;
            height: 0;
            border: 0;
          }
          .showimg{
            width: 100%;

            img{
              width: 100%;
            }
          }
          .projectIntro{
            width: 100%;

            h3{
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
}
</style>
