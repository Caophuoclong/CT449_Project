<template >
    <div class="w-1/2 mx-4 h-128">
        <div class="flex justify-center items-center">
            <span class="text-3xl m-2">Chi tiết</span>
            <font-awesome-icon size="3x" icon="id-badge"></font-awesome-icon>
        </div>
        <form>
            <div class="flex justify-start my-8 border border-black p-2 rounded-2xl group">
                <span class="ml-4 mr-8 text-3xl font-bold">Tên:</span>
                <input
                    name="nameContact"
                    class="text-3xl truncate outline-none w-2/3"
                    :value="contact.name"
                    readonly
                />
                <button
                    type="button"
                    v-on:click="editInfo"
                    id="nameContact"
                    class="hidden group-hover:block absolute right-12"
                >
                    <font-awesome-icon size="3x" icon="edit"></font-awesome-icon>
                </button>
            </div>
            <div class="flex justify-start my-8 border border-black p-2 rounded-2xl group">
                <span class="ml-4 mr-8 text-3xl font-bold">Email:</span>
                <input
                    name="emailContact"
                    class="text-3xl truncate outline-none w-2/3"
                    :value="contact.email"
                    readonly
                />
                <button
                    type="button"
                    v-on:click="editInfo"
                    id="emailContact"
                    class="hidden group-hover:block absolute right-12"
                >
                    <font-awesome-icon size="3x" icon="edit"></font-awesome-icon>
                </button>
            </div>
            <div class="flex justify-start my-8 border border-black p-2 rounded-2xl group">
                <span class="ml-4 mr-8 text-3xl font-bold">Địa chỉ:</span>
                <input
                    name="addressContact"
                    class="text-3xl truncate outline-none w-2/3"
                    :value="contact.address"
                    readonly
                />
                <button
                    type="button"
                    v-on:click="editInfo"
                    id="addressContact"
                    class="hidden group-hover:block absolute right-12"
                >
                    <font-awesome-icon size="3x" icon="edit"></font-awesome-icon>
                </button>
            </div>
            <div class="flex justify-start my-8 border border-black p-2 rounded-2xl">
                <span class="ml-4 mr-8 text-3xl font-bold">Số điện thoại:</span>
                <span class="text-3xl truncate" :title="contact.phone">{{ contact.phone }}</span>
            </div>
            <div class="flex justify-start my-8 items-center border border-black p-2 rounded-2xl">
                <span class="ml-4 mr-8 text-3xl font-bold">Liên lạc yêu thích:</span>
                <font-awesome-icon
                    v-if="contact.favorite"
                    size="3x"
                    :style="{ color: 'green' }"
                    icon="check-circle"
                ></font-awesome-icon>
                <font-awesome-icon v-if="!contact.favorite" size="3x" icon="check-circle"></font-awesome-icon>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: "DetailContact",
    props: ["contact", "updateContact"],
    data() {
    },
    methods: {
        editInfo(event) {
            let id = event.target.id;
            if (id === null || id === undefined) {
                id = event.target.parentNode.id;
            }
            if (id !== null) {
                // console.log(id);
                const name = document.getElementsByName("nameContact")[0];
                const address = document.getElementsByName("addressContact")[0];
                const email = document.getElementsByName("emailContact")[0];
                const element = document.getElementsByName(id)[0];
                element.focus();
                // console.log(element);
                if (element !== undefined) {
                    console.log(element.getAttribute("readonly"));
                    console.log(element);
                    element.removeAttribute("readonly");
                    element.addEventListener("focusout", () => {
                        element.setAttribute("readonly", null);
                    })
                    element.addEventListener("change", () => {
                        const info = {
                            name: name.value,
                            email: email.value,
                            address: address.value,
                        }
                        this.$emit("updateContact", info);
                    })
                }

            }
        },

    }
}
</script>
<style >
</style>
