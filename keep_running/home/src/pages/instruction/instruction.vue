<template>
  <div class="instruction">
    <div class="title">
      <img class="img" :src="src">
      <p class="content content-title">
      Keep Running是一款监督并激励运动的神器，将分数作为奖励惩罚手段，提升对运动的关注和强化。</p>
      <p class="content content-title">将是否完成运动计划作为标准，完成运动加分，未完成运动减分。</p>
    </div>
    <p class="little-tip">1、给大家分享一下我一周的记录：</p> 
    <p class="content tip"><label class="point">◉</label> 周一：运动计划是慢跑六公里，圆满完成计划，加5分，目前5分；</p>
    <p class="content tip"><label class="point">◉</label> 周二：运动计划是跳绳200下，未全部完成，减3分，目前2分；</p>
    <p class="content tip"><label class="point">◉</label> 周三：运动计划是慢跑7公里，圆满完成计划，加5分，目前7分；</p>
    <p class="content tip"><label class="point">◉</label> 周四：Hit减脂运动未坚持完成，扣4分，目前3分；</p>
    <p class="content tip"><label class="point">◉</label> 周五：有氧运动+无氧运动全部完成，奖励自己5分，目前8分；</p>
    <p class="content tip"><label class="point">◉</label> 周六：不仅完成了今日运动计划，也忍住了没有吃外卖，必须表扬自己，加5分，目前13分；</p>
    <p class="content tip"><label class="point">◉</label> 周日：晚饭没有忍住，还是吃了外卖，而且运动计划未完成，罪恶罪恶，减10分，目前3分；</p>
    <p class="content prompts">加减多少分没有具体标准，主要看结果给自己带来的影响，一般控制在1-10分之间。</p>
    <p class="little-tip">2、用什么动力来督促自己坚持记录呢？</p>
    <p class="content prompts">（1）设置相应的奖励</p>
    <p class="content tip"><label class="point">◉</label> 心态的奖励。</br>比如分数越多就会越幸运；凑足3个100分，说不定就会瘦很多等等。这种心理暗示对生活还是很有积极意义的~</p>
    <p class="content tip"><label class="point">◉</label> 物质的奖励。</br>比如凑足300分，奖励自己一顿海底捞；够了500分，奖励自己旅游基金1000元等。虽然都是从自己身上薅下的肉，但是生活更有仪式感了~</p>
    <p class="content prompts">（2）减小记录的阻力</p>
    <p class="content tip">将小程序放在微信浮窗里，或者添加到桌面，减小打开程序的步骤，从而减小自己记录的阻力。</p>
    <img class="index-img" :src="src1">
    <p class="little-tip">3、小程序使用介绍</p>
    <p class="content prompts">（1）首页</p>
    <p class="content tip"><label class="point">◉</label> 清零功能：会将当前分数设为0，历史记录不会被清空。</p>
    <p class="content tip"><label class="point">◉</label> 撤销功能：撤销上一步的操作。</p>
    <p class="content prompts">（2）记录页面</p>
    <p class="content tip"><label class="point">◉</label> 添加备注：备注默认为空，可以点击添加备注。</p>
    <p class="content tip"><label class="point">◉</label> 修改备注：备注添加完成后，可以修改。</p>
    <p class="content prompts">（3）文章页面</p>
    <p class="content tip"><label class="point">◉</label> 查看文章：可以查看文章的详情，详细了解关于运动的文章~</p>
    <p class="content tip"><label class="point">◉</label> 收藏文章：对于比较感兴趣的文章，可以进行收藏留待往后查看。</p>
    <p class="content prompts">（4）我的页面</p>
    <p class="content tip"><label class="point">◉</label> 清空记录：清空所有的历史记录，清空后记录不能恢复，谨慎操作~</p>
    <p class="content tip"><label class="point">◉</label> 意见反馈：对于小程序的建议、问题反馈、合作信息等，可以通过这个页面提交。</p>
    </div>
</template>

<script>
export default {
    data () {
    return {
      src: "../../static/images/littleTip-huang.jpg",
      src1: "../../static/images/share.png"
    }
  }
}
</script>

<style lang='scss'>
.instruction {
  .title {
    background:#feb500;
    border-radius: 16rpx;
    font-size: 16px;
    .img {
      width:100%;
      height:120px;
    }
    .content-title {
      padding:4px 20px 10px 20px;
    }
  }
  .content {
    padding:4px 15px;
    font-size: 16px;
    font-weight:bold;
  }
  .little-tip {
    padding:15px 15px 3px 15px;
    font-size: 15px;
    font-weight:bold;
    color: #EA5149;
  }
  .tip {
    font-size: 15px;
    font-weight:normal;
    .point{
      color: #feb600;
    }
  }
  .prompts {
    font-size: 15px;
  }
  .index-img {
    display:block;
    margin:10px auto;
    height:560px;
    border-radius: 10px;
    margin-bottom:30px;
  }
}
</style>
