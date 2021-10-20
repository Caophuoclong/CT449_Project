<template>
    <div id="xinchao" class="h-full w-full bg-yellow-100">
        <SearchBox @xinchao="handleSubmit"/>
        <div class="w-1/2 mx-auto">
            <ContactView @chosseContact="choseContact" :contacts="contacts" />
            <DetailContact/>
        </div>

    </div>
</template>
<script>
import contactService from "../services/contact.service"
import SearchBox from "./serachBox.vue"
// import FormAdd from "./addContact.vue"
import DetailContact from "./detailContact.vue"
import ContactView from "./contactView.vue"
export default {
    name: 'index',
    components:{
        SearchBox,
        // FormAdd,
        DetailContact,
        ContactView
    },
    data() {
        return {
            contacts: [],
        }
    },
    methods: {
        handleSubmit: (event)=>{
                console.log(event);
        },
        choseContact: (contact) =>{
            console.log(contact);

        }
        
    },
    beforeMount() {
        const getData = async ()=>{
           const response = await contactService.getAll();
           const {data} = response;
           const xxx = data.data;
           this.contacts = xxx;
        }
        getData();
    },
}
    

</script>
