<template>
    <div id="modal" class="modal">
        <div class="modalContainer">
            <h2>{{ ModalContentTitle }}</h2>
            <div v-for="(con,index) in ModalContents" :key="'ModalCOntent'+index" class="modalContentsWrap">
                <div v-if="ModalContentTitle === '교육내용'">
                    <strong class="textStrong">교육기간</strong>: {{ con.year }}<br/>
                    <strong class="textStrong">교육내용</strong>: {{ con.education }}
                </div>

                <div v-if="ModalContentTitle === '자격증'">
                    <strong class="textStrong">취득 일자</strong>: {{ con.year }}<br/>
                    <strong class="textStrong">자격증 이름</strong>: {{ con.certificate }}
                </div>

                <div v-if="ModalContentTitle === '개인정보'">
                    <strong class="textStrong">email</strong>: {{ con.email }}<br/>
                    <strong class="textStrong">이름</strong>: {{ con.myname }}
                </div>
            </div>
        </div>

        <button type="button" class="closeModal" @click="ChangeModalState()"> X </button>
    </div>
</template>

<script lang="ts">
//라이프사이클
import { onMounted } from 'vue';
//defineConponent 는 Typescript 사용할때 타입 정보를 추런하고 제공, 타입에러 방지
import { defineComponent, ref, reactive, SetupContext } from 'vue';

export default defineComponent({
    props:{
            show_hide_modal:Boolean,
            footerSaveText:String
    },
    setup(props,{emit}:SetupContext){
        let ModalContentTitle = ref(''); // 클릭한 컨텐츠
        let ModalContents = reactive([{
            year:'',
            education:'',
            certificate:'',
            email:'',
            myname:''
        }]);

        //모달 보이고 숨기기(부모컴포넌트(App.vue)에 전달)
        const ChangeModalState=()=>{
            let PropsModalState = !props.show_hide_modal;
            emit('ChangeShowHideModal', PropsModalState);
        }
        
        //jsonData불러오기
        const loadModalContents = () =>{
            fetch('/renewalprofile/json/myinfomation.json')
                .then((response)=>{
                    if(response.status ===200){
                        return response.json();
                    }else{
                        console.log(response.status);
                    }
                })
                .then((jsonData)=>{
                    console.log(jsonData);
                    for(let x=0; x<jsonData.length; x++){
                        if(jsonData[x].name === props.footerSaveText){
                            ModalContentTitle.value = jsonData[x].name;
                            ContentsPushObject(jsonData[x].contents);
                            ModalContents = jsonData[x].contents;
                            break;
                        }
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        }

        const ContentsPushObject = (JsonContents:any) =>{
            ModalContents.pop();
            for(let x=0; x<JsonContents.length; x++){
                ModalContents.push(JsonContents[x]);
            }
        }

        onMounted(()=>{
            loadModalContents();
        })

        return{
            ModalContents,
            ModalContentTitle,
            ChangeModalState
        }
    }
})
</script>

<style lang="scss" scoped>
    .modal{
        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        height: 100vh;

        background: #2e2e2eee;

        z-index: 999;

        display: flex;
        justify-content: center;
        align-content: center;

        .modalContainer{
            position: absolute;
            top: 50%;
            left: 50%;

            transform: translate(-50%,-50%);

            width: 50%;
            height: 50%;

            border-radius: 10px;

            background: #fff;

            h2{
                padding: 30px;

                text-align: center;
                font-size: 1.5em;
                font-family: 'TheJamsil5Bold';
                letter-spacing: 5px;
            }
            
            .modalContentsWrap{
                width: 80%;

                margin: 30px auto;
                border: 1px solid;
                padding: 10px;
                border-radius: 5px;
                
                line-height: 30px;

                font-size: 1.1em;

                &:nth-child(1){
                    margin-top: 0 ;
                }

                .textStrong{
                    font-weight: 700;
                }
            }
        }
        
        .closeModal{
            position: absolute;
            top: calc(27%);
            left: 71%;

            font-size: 2em;
        }
    }

    @media screen and (max-width:750px) {
        .modal{
            .modalContainer{
                width: 70%;
                height: 70vh;
                
                overflow-y: scroll;
            }

            .closeModal{
                position: absolute;
                top: calc(15% + 20px);
                left: calc(75% - 10px);

                font-size: 1.5em;
            }
        }
    }
</style>