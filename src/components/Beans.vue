<template>
    <section>
        <div>
            <navigation :color="color" :flat="flat" />
            Beans
        </div>
        <foote />
    </section>
</template> 

<script scope>
import navigation from "../components/NavigationLain.vue";
import foote from "../components/Footer.vue";

export default {

    name: "Beans",
    components: {
        navigation,
        foote
    },

}
</script>

