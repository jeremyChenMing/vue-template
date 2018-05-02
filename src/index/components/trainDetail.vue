<style lang="less" scoped>
.train-detail {
  background: #ffffff;
  position: relative;
  // 主要内容
  .list-title {
    display: flex;
    height: 80px;
    border-bottom: 1px solid #FAFAFA;
    // 头像
    .avatar-block {
      flex: 0 0 90px;
      // background: lightcoral;
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar-img {
        width: 44px; height: 44px;
        border-radius: 50%;
        overflow: hidden;
        align-self: center;
        text-align: center;
      }
    }
    // 内容
    .content-clock {
      flex: 1;
      // background: lightcyan;
      display: flex;
      flex-direction: column;
      position: relative;
      .train-title, .train-time {
        flex: 1;
      }
      .train-title {
        font-size: 15px;
        font-weight: bold;
        padding-top: 20px;
      }
      .train-time {
        font-size: 11px;
        color: #9b9b9b;
      }
      .isEnrolledSign {
        position: absolute;
        color: lightgreen;
        font-size: 16px;
        border: 1px solid lightgreen;
        right: 25px; top: 30px;
        border-radius: 4px;
      }
    }
  }
  // 次要内容
  .time-range, .location, .remark {
    display: flex;
    min-height: 40px;
    border-bottom: 1px solid #FAFAFA;
    padding: 5px 5px;
    .icon-block {
      flex: 0 0 40px;
      display: flex;
      justify-content: center;
      .icon {
        width: 16px;
        height: 16px;
        display: block;
        margin-top: 2px;
      }
    }
    .content {
      flex: 1;
      font-size: 13px;
      color: #4a4a4a;
      line-height: 1.5;
      padding-right: 20px;
    }
  }
  .participants {
    padding: 10px;
    .participants-list {
      display: flex;
      flex-wrap: wrap;
      .participants-listitem {
        flex: 0 0 30px;
        margin: 10px 10px;
        img {
          width: 30px; height: 30px;
          overflow: hidden;
          border-radius: 50%;
        }
      }
    }
  }
  .enroll-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 50px;
    background: #ffffff;
    line-height: 50px;
    text-align: center;
    font-size: 15px;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 5px;
    }
    &.want {
      color: #F4682A;
    }
    &.already {
      color: #9b9b9b;
    }
  }
}
</style>

<template>
  <section class="train-detail">
    <div class="train-detail-wrapper">
      <ul class="detail-list">
        <li class='list-title'>
          <div class="avatar-block">
          <img class="avatar-img" :src="iconImg" alt="头图">
        </div>
        <div class="content-clock">
          <div class="train-title">
            {{ trainTitle }}
          </div>
          <div class="train-time">
            {{ dateTime }}
          </div>
          <div v-show="isEnrolled" class="isEnrolledSign">已报名</div>
        </div>
        </li>
        <li class="time-range">
          <div class="icon-block">
            <img class="icon" src="../assets/image/timeIcon.png" alt="">
          </div>
          <div class="content">{{ timeRange[0] }} 至 {{ timeRange[1] }}</div>
        </li>
        <li class="location">
          <div class="icon-block">
            <img class="icon" src="../assets/image/locationIcon.png" alt="">
          </div>
          <div class="content">{{ location }}</div>
        </li>
        <li class="remark">
          <div class="icon-block">
            <img class="icon" src="../assets/image/remarkIcon.png" alt="">
          </div>
          <div class="content">{{ remark }}</div>
        </li>
        <li class="participants">
          <ul class="participants-list">
            <li :key='subindex' class="participants-listitem" v-for="(subitem, subindex) of participants">
              <img :src="subitem" alt="图">
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div @click="IWantRoll" v-show='!isEnrolled' class="enroll-btn want">
      <img src="../assets/image/enroll.png" alt=""><span>我要报名</span>
    </div>
    <div v-show='isEnrolled' class="enroll-btn already">
      <img src="../assets/image/enroll.png" alt=""><span>已经报名</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'train-detail',
  // props: ['isEnrolled'],
  created() {},
  mounted() {},
  data() {
    return {
      uuid: '0',
      iconImg: '',
      trainTitle: '羽毛球活动又开始了',
      dateTime: '昨天 13：23',
      isEnrolled: true,
      timeRange: ['6月2日 12:00', '6月2日 17:00'],
      location: '新华科技大厦隔壁小区2层',
      remark: '各位小伙伴请自带设备，另外请准时到场，到时候会统一拍照合影，请不要迟到啊。',
      participants: ['','','','','']
    }
  },
  methods: {
    // 我要报名
    IWantRoll: function () {
      console.log('点击了我要报名按钮')
    }
  }
}
</script>

