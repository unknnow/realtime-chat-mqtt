<template>
    <div class="container pt-4">
        <h2 class="text-center mb-4">Efficom - RealTime Chat - Mqtt</h2>

        <div class="row">
            <div class="col">
                <div class="card shadow rounded max-vh-80 h-100" id="cardChats">
                    <div class="card-header">
                        Channels
                    </div>

                    <div class="card-body">
                        <div class="d-flex align-items-start">
                            <ChannelTabs />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-3">
                <UserInfo />

                <ConnectedUsers class="mt-4" />
            </div>
        </div>
    </div>
</template>

<script>
import ChannelTabs from './ChannelTabs.vue';
import UserInfo from './UserInfo.vue';
import ConnectedUsers from './ConnectedUsers.vue';

export default {
    name: 'MainPage',
    components: {
        ChannelTabs,
        UserInfo,
        ConnectedUsers
    },
    props: {
        msg: String
    }
}
</script>

<style scoped>
.max-vh-80 {
    max-height: 80vh;
}
</style>
