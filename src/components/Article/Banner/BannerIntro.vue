<template>
  <section id="banner" :class="BannerClass">
    <div class="imgwrap">
        <ul v-if="BannerClass==='Banner_Contents'">
            <li v-for="(imgs, index) in imgurl" :key="index">
                <img :src="imgs.src" alt="">
            </li>
        </ul>
        <ul v-else><li><img src="/renewalprofile/assets/Me3.jpg" alt=""></li></ul>

        <div id="imgMoveBtnWrap" class="imgMoveBtnWrap" v-if="BannerClass==='Banner_Contents'">
            <button type="button" class="imgPrevBtn" @click="(event)=>{onImgMoveFuction(event)}">&lt;</button>
            <button type="button" class="imgNextBtn" @click="(event)=>{onImgMoveFuction(event)}">&gt;</button>
        </div>
    </div>
    <span class="scroll" v-if="BannerClass==='Banner_Contents'">
        scroll<br/>↓
    </span>

    <ul class="snsWrap" v-if="BannerClass!=='Banner_Contents'">
        <li v-for="(Icon,index) in AwesomeIconClass" :key="'Icon'+index">
            <a :href="Icon.link"
                target="_blank"
                @click="(event)=>{
                    if(Icon.name !=='github'){
                        event.preventDefault();
                        AlertSNS();
                    }
                }
                ">
                <i :class="Icon.icon"></i>
            </a>
        </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { ref,onMounted, defineComponent } from "vue"

export default defineComponent({
    props:{
        BannerClass:String
    },
    setup(props){
        const imgMoveCount = ref(0);
        //이미지 src
        const imgurl = [
            {
                src:'/renewalprofile/assets/Me1.png',
            },
            {
                src:'/renewalprofile/assets/Me2.png'
            }
        ]
        //font-Awesome 아이콘
        const AwesomeIconClass = [
            {name:'github',icon:'fa-brands fa-github', link:'https://github.com/lyd1040'},
            {name:'facebook',icon:'fa-brands fa-facebook', link:''},
            {name:'instagram',icon:'fa-brands fa-instagram', link:''}
        ]

        //이미지 움직이는 버튼 이벤트 정의
        const onImgMoveFuction = (event:MouseEvent) => {
            const target = event.target as HTMLElement;
            const Banner_Contents = document.querySelector('.imgwrap ul') as HTMLElement;
            
            if(props.BannerClass === 'Banner_Contents'){
                if(target.classList.contains('imgPrevBtn') && Banner_Contents!=null){
                    if(imgMoveCount.value > 0){
                        imgMoveCount.value = imgMoveCount.value - 1;
                        Banner_Contents.style.transform='translateX('+(imgMoveCount.value * -50) +'%)'
                    }
                }
                else{
                    if(imgMoveCount.value < imgurl.length-1){
                        imgMoveCount.value = imgMoveCount.value + 1;
                        Banner_Contents.style.transform='translateX('+(imgMoveCount.value * -50) +'%)'
                    }
                }
            }
            else{
                imgMoveCount.value = 0;
            }
        }

        //SNS 관련
        const AlertSNS = () =>{
            window.alert('SNS가 준비중입니다.');
        }

        return{
            imgurl,
            AwesomeIconClass,
            AlertSNS,
            onImgMoveFuction
        }
    }
})
</script>

<style lang="scss" scoped>
@import '../../../style/_variables.scss';
    .Banner_Contents{
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid;

        transition: 0.3s;

        @include displayFlexJA();

        background: $MainColorGreen;

        z-index: 1;

        &.active{
            height: 250px;
            .imgwrap{
                width: 150px;

                ul{
                    height: 150px;

                    li{
                        @include SetWH(150px, 150px);
                    }
                }
            }
        }

        .imgwrap{
            position: relative;
            width: 400px;

            transform: translateY(-20px);

            overflow: hidden;
            transition: 0.3s;

            ul{
                width: 200%;
                height: 400px;

                display: flex;
                
                transition: 0.8s;
                transform: translateX(-0%);

                li{
                    border: 1px solid #808080;
                    width: 400px;
                    height: 400px;
                    transition: 0.3s;

                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .imgMoveBtnWrap{
                position: absolute;
                top: 0;
                
                @include SetWH(100%,100%);

                display: flex;
                justify-content: space-between;

                button{
                    width: 35px;
                    height: 100%;

                    background: #ffffff80;
                    border: 0;

                    font-size: 1.2em;
                    &:nth-child(1){
                        border-right: 1px solid #d3d3d340;
                    }
                    &:nth-child(2){
                        border-left: 1px solid #d3d3d340;
                    }
                }
            }
            
        }

        .scroll{
            position: absolute;
            top: 85%;

            font-size: 1.5em;

            text-align: center;
        }

        .snsWrap{
            position: absolute;
            top: 90%;

            transform: translateY(-100%);

            display: flex;
            gap: 30px;

            font-size: 1.2em;
        }
    }

    @media screen and (max-width:750px) {
        .Banner_Contents {
            &.active{
                height: 150px;
                .imgwrap{
                    @include SetWH(100px,100px);
                    ul{
                        @include SetWH(100%,100%);

                        li{
                            @include SetWH(100px, 100px);
                        }
                    }
                }
            }
            .imgwrap{
            width: 250px;
            height: 250px;
            ul{ 
                height: 250px;
                li{
                    @include SetWH(250px, 250px);
                }
            }

        }}
    }
</style>