<style lang="less" scoped>

  .inquiry-result {
    background-color: #F2F2F2;
    
    height: 100%;
    .banner-wrapper {
			background-color: inherit;
			height: 192px;
			display: flex;
			flex-direction: column;
			align-items: center;
      justify-content: center;
      .banner-pic {
        width: 90px;
      }
      .slogan {
        font-size: 17px;
        color: #4A4A4A;
      }
    }
    .data-wrapper {
      background: #ffffff;
      .data-list {
        display: flex;
        flex-direction: column;
        .data-list-item {
          flex: 1;
          padding: 10px 24px;
          display: flex;
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 13px;
          border-bottom: 1px solid #f9f9f9;
          .list-item-title {
            flex: 0 0 80px;
          }
          .content {
            flex: 1;
            text-align: right;
             .person-photo {
              // display: block;
              float: right;
              text-align: right;
              width: 60px;
              height: 74px;
            }
          }
        }
      }
    }
    .uncheck-hint {
      .hint-list {
        font-size: 11px;
        color: #9B9B9B;
        line-height: 2;
        padding: 2px 20px;
      }
      .hint-item {
        -webkit-margin-start: 0;
      }
    }
  }
</style>

<template>
  <section class="inquiry-result">
		<div class="banner-wrapper">
			<img class="banner-pic" v-show="checkResult === 0" src="../assets/image/InquirySame.png"/>
			<img class="banner-pic" v-show="checkResult === 1" src="../assets/image/InquiryDiff.png"/>
			<img class="banner-pic" v-show="checkResult === 2" src="../assets/image/InquiryUncheck.png"/>
			<p class="slogan">{{ checkSlogan[checkResult] }}</p>
		</div>
		<div class="data-wrapper">
			<ul class="data-list">
				<li v-show="checkResult === 0" class="data-list-item">
					<span class="list-item-title">照片</span>
          <div class="content">
            <img :src="photo" class="person-photo"/>
          </div>
				</li>
				<li class="data-list-item">
					<span class="list-item-title">姓名</span><span class="content">{{ name }}</span>
				</li>
				<li class="data-list-item">
					<span class="list-item-title">身份证号</span><span class="content">{{ idNum }}</span>
				</li>
				<li v-show="checkResult === 0" class="data-list-item">
					<span class="list-item-title">性别</span><span class="content">{{ gender[0] }}</span>
				</li>
				<li v-show="checkResult === 0" class="data-list-item">
					<span class="list-item-title">出生日期</span><span class="content">{{ birthday }}</span>
				</li>
				<li v-show="checkResult === 0" class="data-list-item">
					<span class="list-item-title">户籍</span><span class="content">{{ residence }}</span>
				</li>
			</ul>
		</div>
		<div v-show="checkResult === 2" class="uncheck-hint">
			<dl class="hint-list">
				<dt class="hint-title">
					{{ hintTitle }}
				</dt>
				<dd :key='index' class="hint-item" v-for="(item, index) of hintContent">
					<span>（{{ index + 1 }}）</span><span>{{ item }}</span>
				</dd>
			</dl>
		</div>
  </section>
</template>

<script>
export default {
  name: 'inquiry-result',
  data() {
    return {
      checkResult: 0, // 0-same,1-diff,2-uncheck
      checkSlogan: ['资料与查询结果一致', '根据您提交的资料，无法找到相关结果', '无法验证您的提交资料'],
      name: '邓巨斌',
      idNum: '10929803909209010',
      photo: '',
      gender: ['男', '女'],
      birthday: '1990-02-04',
      residence: '湖北省咸宁市通城县',
      hintTitle: '无法验证代表库中无此号，查询中心因特殊原因，导致数据无法核验，可能原因包括但不限于：',
      hintContent: [
        '现役或刚退役的军人',
        '刚上大学或刚毕业的大学生',
        '正在迁移户口或者近期迁移户口',
        '工作调动导致户口有迁移',
        '发生更名导致户口有变动',
        '地方向中心上传时数据缺失'
      ]
    }
  },
  methods: {

  }
}
</script>

