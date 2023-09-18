<template>
  <div class="About">
    <div class="AboutContentsWrap">
      <div class="dream">
        <h3>이런 개발자가 되고싶어요!</h3>

        <div class="dreamContents">
          <div class="show_gif">
            <img src="/renewalprofile/assets/demand.gif" alt="">
          </div>

          <ul class="dreamText">
            <li v-for="(text,index) in dreamText_arr" :key="text+index" @mouseenter="(event)=>{ChangeGif(event)}">{{text}}</li>
          </ul>
        </div>
      </div>

      <div class="skills">
        <h3>기술스택</h3>
        <div class="skillsWrap">
          <div v-for="(object, index) in FEBESkillsetArr" :key="index.toString() + object.h4contents" :class="object.class">
            <h4>{{ object.h4contents }}</h4>

            <div class="skillsSet">

              <div v-for="(GoodNB,GoodNBidx) in GoodNBClass" :key="GoodNB[0] + index.toString() + GoodNBidx.toString()" :class="GoodNB[0]">
                  <h5><button type="button" @click="(event)=>{SkillSetClassActive(event)}">{{ GoodNB[1] }}</button></h5>

                  <div v-for="(OBJSkillset, OBJSkillsetidx) in object.skillSet[GoodNBidx]" :key="index.toString() + GoodNBidx.toString() + OBJSkillset + OBJSkillsetidx.toString()" class="">
                    <span v-if="OBJSkillset!==undefined">{{ OBJSkillset }}</span>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ContentsMoveBtnWrap">
        <button type="button" id="DevelopDream" class="DevelopDream" @click="(event)=>{Develop_Skills_BtnEvent(event)}">목표</button>
        <button type="button" id="SkillsStack" class="SkillsStack" @click="(event)=>{Develop_Skills_BtnEvent(event)}">기술스택</button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup(){
    //skillsSet 잘해요!, 어느정도해요!, 초보에요! class
    const GoodNBClass = [
      [
        'Good',
        '잘해요!'
      ],
      [
        'NotBad',
        '어느정도해요!'
      ],
      [
        'Beginner',
        '초보에요!'
      ]
    ]

    //문단 나누는 배열
    const FEBESkillsetArr =[
      {
        class:'FrontEndSkillsWrap',
        h4contents:"Front-end",
        skillSet:[
          ['HTML','CSS','SCSS','JavaScript','React'],
          ['TypeScript','Redux','Vue'],
          ['Vuex','Svelte','Sveltekit']
        ]
      },
      {
        class:'BackEndSkillsWrap',
        h4contents:"Back-end",
        skillSet:[
          [],
          ['Firebase'],
          ['Java','MySQL','OracleDB']
        ]
      }
    ]

    // 이미지 경로
    const gif_arr = [
      '/renewalprofile/assets/demand.gif',
      '/renewalprofile/assets/corss_browsing.gif',
      '/renewalprofile/assets/animation.gif'
    ]

    //이런 개발자가 되고싶어요! 3가지
    const dreamText_arr = [
    '사용자 요구사항을 전부 만족시켜줄 수 있는 개발자'
    ,'어떤 환경에서도 잘 동작할 수 있는 웹을 만들 수 있는 개발자'
    ,'애니메이션을 활용하여 사람들의 눈을 즐겁게해줄 수 있는 개발자'
    ]

    //목표, 기술스택 클릭시 About 슬라이드
    const Develop_Skills_BtnEvent = (event:MouseEvent)=>{
      const test = document.querySelectorAll('.ContentsMoveBtnWrap button') as unknown as HTMLElement[];
      const target = event.target as HTMLElement;
      const AboutContentsWrap = document.querySelector('.AboutContentsWrap') as HTMLElement;

      for(let x=0; x<test.length; x++){
        if(target.classList[0] === test[x].classList[0]){
          AboutContentsWrap.style.transition = `0.3s`;
          if(window.innerWidth<750){
            AboutContentsWrap.style.transform = `translateY(-${x*75}%)`;
          }else{
            AboutContentsWrap.style.transform = `translateY(-${x*50}%)`;
          }
          break;
        }
      }
    }

    //gif 변환
    const ChangeGif = (event:MouseEvent) => {
      const dreamText = document.querySelectorAll('.dreamText li') as unknown as HTMLElement[];
      const target = event.target as HTMLElement;
      const showimg = document.querySelector('.show_gif img') as HTMLImageElement;

      for(let x=0; x<dreamText.length; x++){
        if(target.innerText === dreamText[x].innerText && showimg.getAttribute('src') !== gif_arr[x]){
          showimg.src = gif_arr[x];
        }
      }
    }

    //skillsSet 자식 Div 태그에 active 클래스 추가
    const SkillSetClassActive=(event:MouseEvent)=>{
      const EventTarget = event.target as HTMLElement;
      const skillsSet = document.querySelectorAll('.skillsSet>div') as unknown as HTMLElement[];
      const Btn = document.querySelectorAll('.skillsSet button') as unknown as HTMLButtonElement[];
      
        for(let x=0; x<skillsSet.length; x++){
          Btn[x].classList.remove('active');
          skillsSet[x].classList.remove('active');
        }

        if(EventTarget.parentNode !== null && EventTarget.parentNode.parentNode !== null){
          const ClassAddTag = EventTarget.parentNode.parentNode as HTMLElement;
          EventTarget.classList.add('active');
          ClassAddTag.classList.add('active');
        }
        
    }

    return{
      dreamText_arr,
      FEBESkillsetArr,
      GoodNBClass,
      Develop_Skills_BtnEvent,
      ChangeGif,
      SkillSetClassActive
    }
  }
})
</script>

<!-- 스타일 -->
<style lang="scss" scoped>
@import '../../../../style/variables';
  .About{
    position: relative;

    @include SetWH(100%, calc(100% - 250px));
    .AboutContentsWrap{
      @include SetWH(100%, 200%);
      &.active{
        transform: translateY(-50%);
      }

      &>div{
        overflow-y: scroll;
        @include SetWH(100%, 50%);
      }

      h3{
        width: 350px;

        text-align: center;

        background: $PointColorOrange;

        font-size: 1.5em;
        font-family: 'TheJamsil5Bold';

        letter-spacing: 2px;

        margin: 30px auto;
        padding: 15px;
        
      }

      .dream{
        border-bottom: 1px solid;

        display: flex;
        flex-direction: column;

        padding-bottom: 30px;
        
        .dreamContents{
          display: flex;
          flex-wrap: wrap;

          justify-content: center;

          margin: 20px auto;

          .show_gif{
            @include SetWH(300px,300px);

            img{
              @include SetWH(100%, 100%);
            }
          }

          .dreamText{
            margin-left: 100px;
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 40px;

            list-style-type: disc;

            font-size: 1.5em;

            li:hover{
              text-decoration: underline;
            }
          }
        }
      }

      .skills{
        height: 50%;
        .skillsWrap{
          height: calc(100% - 54px - 60px); //100% - h3높이 - 60은 어디서왔는지 모르겠음

          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          &>div{
            @include SetWH(50%, 100%);
            min-width: 375px;
            text-align: center;

            h4{
              position: relative;

              font-size: 1.5em;
              font-family: 'TheJamsil5Bold';

              color: #000;
              
              padding: 30px;

              &::before{
                position: absolute;
                top: 50%;
                left: 50%;

                transform: translate(-50%, -50%);
                
                content: '';

                @include SetWH(150px,40px);
                border: 3px solid $PointColorOrange;
                box-shadow: 0 0 5px #e9b384, inset 0 0 5px #e9b384;

              }
            }
            .skillsSet{
              height: calc(100% - 49.2px); //100% - (Front-end, Back-end 높이)

              display: flex;
              justify-content: center;
              gap: 50px;

              text-align: start;
              h5{
                padding: 5px 10px;

                button{
                  border: 0;
                  background: 0;
                  font-family: 'TheJamsil5Bold';

                  cursor: pointer;

                  font-size: 1.1em;
                }
              }

              &>div{
                font-family: 'IAMAPLAYER';

                &>div{
                  margin: 10px 0;
                  padding: 10px;
                  border-bottom: 1px solid #d3d3d3;
                }
              }
            }
          }
        }
      }
    }
    .ContentsMoveBtnWrap{
        position: absolute;
        top: 50%;
        right: 5px;

        transform: translateY(-50%);

        display: flex;
        flex-direction: column;
        gap: 5px;

        button{
          padding: 3px 10px;

          background: 0;
          border: 0;
          border-radius: 5px;

          cursor: pointer;

          background: #80808080;
          color: #fff;

          font-size: 1.1em;
          &:hover{
            background: $PointColorGreen;          
          }
        }
      }
  }
  @media screen and (max-width:1150px) {
    .About .AboutContentsWrap>div{
    }
  }
  @media screen and (max-width:750px) {
    .About .AboutContentsWrap{
      transition: 0.3s;

      &.active{
        transform: translateY(-75%);
      }
      &>div{
        overflow-y: scroll;
      }
      h3{
          width: 250px;

          font-size: 1em;
        }
      .dream{
        height: 75%;
        .dreamContents{
          .show_gif{
            @include SetWH(250px, 250px);
          }
          .dreamText{
            @include SetWH(250px, 250px);

            margin: 20px;

            font-size: 1em;
          }
        }
      }

      .skills{
        height: calc(50% + 46px);
        .skillsWrap{
          height: auto;
          &>div{
            position: relative;
            min-width: 100%;
            margin-bottom: 50px;
            margin: 50px;

            &:nth-child(1):before{
              position: absolute;
              bottom: -18%;
              left: 0;

              content: '';

              box-shadow: 0 0 30px #ff0000;
              border-bottom: 3px solid  #0eeaa8;

              width: 100%;
            }
            .skillsSet{
              display: block;

              h5 button{
                width: 150px;

                border: 1px solid $MainColorGreen;
                border-radius: 5px;
                padding: 3px 0;

                background: #fff;

                box-shadow: 0 0 2px $MainColorGreen;
                
                &.active{
                  background: $PointColorGreen;
                  color: #fff;
                }
              }

              &>div{
                text-align: center;
                height: 36px;
                overflow: hidden;
                

                &.active{
                  width: 60%;
                  height: auto;

                  margin: 20px auto;
                  border-radius: 5px;

                  box-shadow: 0 0 3px #2e2e2e;

                  &>div{
                    opacity: 1;
                  }
                }

                &>div{
                  width: 80%;
                  margin: 10px auto;

                  opacity: 0;
                  transition: all 0.5s;
                }
              }
            }
          }
        }
      }
    }
  }
</style>