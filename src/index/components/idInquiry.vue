<style lang="less" scoped>
  .id-inquiry {
    background-color: #F2F2F2;
    .form {
      background: #ffffff;
      padding: 20px 24px;
      display: flex;
      font-size: 13px;
      border-bottom: 1px solid #F2f2F2;
      &::-webkit-input-placeholder {
        text-align: right;
      }
      .form-label {
        flex: 0 0 80px;
      }
      .form-input-text {
        flex: 1;
        border: none;
        text-align: right;
        outline:none;
      }
    }

    .hint {
      background-color: #F2F2F2;
      color: #9B9B9B;
      font-size: 12px;
      padding: 10px 24px;
      height: 80px;
    }
    .inquiry-btn {
      font-size: 15px;
      color: #ffffff;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #F4682A;
    }
  }

</style>

<template>
  <section class="id-inquiry">
    <router-view></router-view>
    <div class="form name">
      <span class="form-label">姓名</span><input class="form-input-text" type="text" :placeholder="namePlaceholder" v-model="username">
    </div>
    <div class="form id-number">
      <span class="form-label">身份证号</span><input class="form-input-text" type="text" :placeholder="idNumPlaceholder" v-model="idNum">
    </div>
		<div class="hint">{{ hint }}</div>
		<div @click="handleInquiry" class='inquiry-btn'>
			<span>查询</span><span class="restnum">（今天剩余{{ restNum }}次）</span>
		</div>
  </section>
  
</template>

<script>

  export default {
    name: 'id-inquiry',
    data() {
      return {
        username: '',
      	namePlaceholder: '请填写姓名',
      	idNum: '',
      	idNumPlaceholder: '请填写18为身份证号',
      	hint: '身份证查询每天都会限制查询次数，请注意您剩余的查询次数，及填写资料的准确性。',
      	restNum: 23
      }
    },
    methods: {
      // 点击了查询按钮
      handleInquiry: function () {
        alert('点击了查询按钮')
      }
    }
  }
</script>