<template>
  <div class="aritic-Userstate-content" v-if="user">
    <div class="Userstate-headimg">
      <a :href="userHome"><img :src="user.avatar"></a>
    </div>
    <div class="Userstate-right">
      <span class="Userstate-right-name">{{ user.nickname }}</span>
      <span class="user_grade lvZero">Lv.{{ user.level }}</span>
      <img v-if="user.title" :src="user.title" class="user-identity">
      <follow-button :id="user.user_id" :_followed="user.followed" />
      <div class="User-Edit-deadline">
        <div class="Edit-deadline">
          <slot name="time"></slot>
        </div>
        <div class="user-Not-editable">
          <template v-for="item in numArr">
            <i :class="`iconfont ${item.icon}`">
            </i>
            {{ item.num }}
          </template>
        </div>
      </div>
    </div>
    <slot name="fansButton">

    </slot>
    <!--<button class="brok-fans">粉丝0</button>-->
  </div>
</template>

<script>
  import FollowButton from '~/components/FollowButton.vue'

  export default {
    name: 'user-avatar-media',
    components: {
      FollowButton
    },
    props: {
      user: {
        type: Object,
        default: () => {}
      },
      numArr: Array
    },
    data () {
      return {}
    },
    computed: {
      userHome () {
        return this.user ? this.$api.user.home(this.user.user_id) : '#'
      }
    }
  }
</script>

<style scoped>

</style>
