<template>
    <div class="container">
        <h1>Hello World</h1>
        <h1>{{ name }}</h1>
        <TestProps :name="name" />
        <v-btn color="primary" @click="callAlert()">alert</v-btn>
        <v-btn color="success" @click="show = !show">กดเพื่อแสดง</v-btn>
        <div v-if="show">
            <cardimg />
        </div>
        <!-- <h1 v-for="(item, index) in items" :key="index">
            {{ item.message }}
        </h1> -->
        <v-row>
            <v-col cols="3" v-for="(item, index) in items" :key="index">
                <div>
                    <v-card width="400px">
                        <v-img :src="item.imglink"></v-img>
                        <v-card-title primary-title>
                            {{ item.message }}
                        </v-card-title>
                        <v-card-actions>
                            <v-btn color="secondary" @click="callAlertParam(item.message)">alert</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-col>
            <v-col cols="12">
                <h1>{{ value1 }}</h1>
                <v-text-field
                    name="value1"
                    label="กรอกรายละเอียด"
                    id="value1"
                    v-model="value1"
                ></v-text-field>
                <v-btn color="primary" @click="setLocalStorage()">set</v-btn>
                <v-btn color="red" @click="removeLocalStorage()">remove</v-btn>
            </v-col>
        </v-row>
    </div>

</template>

<script>
import { EventBus } from '@/EventBus';
import Cardimg from '@/components/Cardimg.vue';
import TestProps from '@/components/TestProps.vue';

export default {
    components: {
        Cardimg,
        TestProps
    },
    data() {
        return {
            value1: '',
            name: 'Peerapol',
            show: false,
            items: [
                {
                    message: 'Foo',
                    imglink: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
                }, {
                    message: 'Bar',
                    imglink: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
                }, {
                    message: 'Bar',
                    imglink: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
                }, {
                    message: 'Bar',
                    imglink: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
                }, {
                    message: 'Bar',
                    imglink: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
                }
            ]
        }
    },
    mounted() {
        EventBus.$on('CallAlertMain', this.callAlert)
    },
    beforeDestroy() {
        EventBus.$off('CallAlertMain', this.callAlert)
    },
    methods: {
        callAlert(){
            alert("Hello World")
        },
        callAlertParam(item){
            alert(item)
        },
        setLocalStorage(){
            localStorage.setItem('User', this.value1)
            this.$cookies.set('User',this.value1,'60s')
        },
        removeLocalStorage(){
            localStorage.removeItem('User')
        }
    }
}
</script>