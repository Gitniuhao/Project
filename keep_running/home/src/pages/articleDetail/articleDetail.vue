<template>
	<div>
		<div class="articleDetail">
			<div class="title">
				<p>dhcbshdcbsdgdgdgdgdggzrs,hdfbsksbkk</p>
			</div>
			<div>
				<label class="author">牛皓</label>
				<label class="date">2020-2-28</label>
				<label class="view">
					<img src="/static/images/view.png" alt="">
				<span>16人看过</span>				
			</label>
			</div>
			<div class="content">
				bahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKb
				bahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKbbahabhaaaaaaaaaaaaaaabbabscbsajchajB>AJKb
			</div>
			<div class="collection_share">
				<img src="/static/images/shared.png" alt="">				
				<img src="/static/images/collection-none.png" alt="">				
			</div>			
		</div>
	</div>
</template>

<script>
	export default{

	}
</script>

<style lang="scss">
.articleDetail{
	display:flex;
	flex-direction:column;
	padding:10px 10px;
	.title{
		font-size:24px;
		font-weight:bold;
		white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
        margin-top:10px; 
	}
	.author{
		font-size:16px;
		color:gray;
		opcity:0.3;
		margin-right:10px;
	}
	.date{
		font-size:16px;
		color:gray;
		opcity:0.3;
	}
	.content{
		text-indent:2em;
		font-size:18px;
		white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
        margin-top:20px;
	}
	.share{
		position:relative;
		margin-top:20px;
		img{
			width: 40px;
			height: 40px;
			margin-right:20px;
			float:right;
		}
	}
	.view{
		float:right;
		img{
			width: 20px;
			height: 20px;
			vertical-align: middle;
		}
		span{
			font-size:16px;
		}
	}
}
</style>
