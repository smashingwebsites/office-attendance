import User from './user.vue'; // Adjust the path to the actual location of your user.vue component

export default {
    title: 'Components/User',
    component: User,
};

const Template = (args) => ({
    components: { User },
    setup() {
        return { args };
    },
    template: '<User v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    user: {
        name: {
            first: 'John',
            last: 'Doe',
        },
    },
};
