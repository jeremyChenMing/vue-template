<style lang="less" scoped>
.train-list-wrapper {
  background-color: #ffffff;
  .train-list-item {
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
        right: 5px; top: 30px;
        border-radius: 4px;
      }
    }
    // 前往详情
    .todetail-block {
      flex: 0 0 25px;
      line-height: 80px;
      color: #CCCCCC;
    }
  }
}
</style>

<template>
  <section class="train-list-wrapper">
    <ul class="train-list">
      <li :key='index' class="train-list-item" v-for="(item, index) of trainList">
        <div class="avatar-block">
          <img class="avatar-img" :src="item.iconImg" alt="头图">
        </div>
        <div class="content-clock">
          <div class="train-title">
            {{ item.trainTitle }}
          </div>
          <div class="train-time">
            {{ item.dateTime }}
          </div>
          <div v-show="item.isEnrolled" class="isEnrolledSign">已报名</div>
        </div>
        <div @click='toTrainDetail(item.uuid, item.isEnrolled)' class="todetail-block">
          <i>&gt;</i>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'train-list',
  data() {
    return {
      trainList: [
        {
          uuid: '0',
          iconImg: '',
          trainTitle: '羽毛球活动又开始了',
          dateTime: '昨天 13：23',
          isEnrolled: true
        },
        {
          uuid: '1',
          iconImg: '',
          trainTitle: '技术部内部分享-侯龙',
          dateTime: '昨天 13：23',
          isEnrolled: false
        },
        {
          uuid: '2',
          iconImg: '',
          trainTitle: '产品部齐飞saas产品培训',
          dateTime: '昨天 13：23',
          isEnrolled: true
        }
      ]
    }
  },
  methods: {
    // 点击列表项前往详情
    toTrainDetail (uuid, isEnrolled) {
      console.log('前往列表详情页，id为:', uuid, '是否已经报名', isEnrolled)
    }
  }
}
</script>

