/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

SET FOREIGN_KEY_CHECKS = 1;


insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7ckQkEDEeqhL0xyQNpe4I","4c85d649-953d-48b5-8a4a-18240fc8f9e5","c2685b4318f0abe76b3dd1ce528fa4138b3750e3","mbDmmwiry9yl3XomBkXBjg==",'{"openId":"o1WdL5I7ckQkEDEeqhL0xyQNpe4I","nickName":"情绪","gender":1,"language":"zh_CN",
"city":"Zhengzhou","province":"Henan","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1582896717,"appid":"wx605a1a15663d72b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7ckQkEDEeqhK0xyQNpe4I","4c85d649-953d-48b5-9a4a-18240fc8f9e5","c2685b4318f0abe76b3dd1ce528fa4238b3750e3","mbDmmwiry9yl4XomBkXBjg==",'{"openId":"o1WdL5I7ckQkEDEeqhK0xyQNpe4I","nickName":"尽在不言中","gender":1,"language":"zh_CN",
"city":"Zhoukou","province":"Henan","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1582896727,"appid":"wx602a1a15663d72b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7ckQkEDEaqhK0xyQNpe4I","4c85d649-953d-48b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce528fa4238b3750e3","mbDmmwiry9yl4XomBkXQjg==",'{"openId":"o1WdL5I7ckQkEDEaqhK0xyQNpe4I","nickName":"只言片语","gender":1,"language":"zh_CN",
"city":"Xian","province":"Shanxi","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572896727,"appid":"wx602a1a15663d73b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7cjQkEDEaqhK0xyQNpe4I","4c85d649-953d-47b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce527fa4238b3750e3","mbDnmwiry9yl4XomBkXQjg==",'{"openId":"o1WdL5I7cjQkEDEaqhK0xyQNpe4I","nickName":"拒绝想象","gender":1,"language":"zh_CN",
"city":"Beijing","province":"Hebei","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572896717,"appid":"wx602a1a25663d73b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7cjQkEBEaqhK0xyQNpe4I","4c85d649-953d-48b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce527fa4238b3750d3","mbDnnwiry9yl4XomBkXQjg==",'{"openId":"o1WdL5I7cjQkEBEaqhK0xyQNpe4I","nickName":"酒不醉人人自醉","gender":1,"language":"zh_CN",
"city":"Qingdao","province":"Shandong","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572896727,"appid":"wx605a1a25663d73b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7cjQkEBEaohK0xyQNpe4I","4c75d649-953d-48b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce527fa4238b3740d3","mbDnnwiry9yl4XnmBkXQjg==",'{"openId":"o1WdL5I7cjQkEBEaohK0xyQNpe4I","nickName":"夜思晨","gender":1,"language":"zh_CN",
"city":"Taizhou","province":"Zhejiang","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572816727,"appid":"wx605a1a25653d73b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7djQkEBEaohK0xyQNpe4I","4c75d649-953d-48b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce527fa4238b3740d3","mbDnnwiry9yl4XnmBkXQjg==",'{"openId":"o1WdL5I7djQkEBEaohK0xyQNpe4I","nickName":"尘埃未定","gender":1,"language":"zh_CN",
"city":"Xinyang","province":"Henan","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572816727,"appid":"wx605a1a25653d73b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7djQkEBEadhK0xyQNpe4I","4c75d649-953d-48b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce527fa4238b3740d3","mbDnnwiry9yl4XnmBkXQjg==",'{"openId":"o1WdL5I7djQkEBEadhK0xyQNpe4I","nickName":"旧梦","gender":1,"language":"zh_CN",
"city":"Chuzhou","province":"Anhui","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572816727,"appid":"wx605a1a25653d73b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL5I7djQkEBEadgK0xyQNpe4I","4c75d649-953d-48b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce527fa4238b3740d3","mbDnnwiry9yl4XnmBkXQjg==",'{"openId":"o1WdL5I7djQkEBEadgK0xyQNpe4I","nickName":"忘了我也不错","gender":1,"language":"zh_CN",
"city":"Hezhe","province":"Shandong","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572816727,"appid":"wx605a1a25653d73b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL8I7djQkEBEadgK0xyQNpe4I","4c75d649-953d-48b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce527fa4238b3740d3","mbDnnwiry9yl4XnmBkXQjg==",'{"openId":"o1WdL8I7djQkEBEadgK0xyQNpe4I","nickName":"空白悲伤","gender":1,"language":"zh_CN",
"city":"Changsha","province":"Hunan","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572816727,"appid":"wx605a1a25653d73b3"}}');

insert into cSessionInfo(open_id,uuid,skey,session_key,user_info) values("o1WdL8I7djQkEBEbdgK0xyQNpe4I","4c75d649-953d-48b5-9a4a-18250fc8f9e5","c2685b4318f1abe76b3dd1ce527fa4238b3740d3","mbDnnwiry9yl4XnmBkXQjg==",'{"openId":"o1WdL8I7djQkEBEbdgK0xyQNpe4I","nickName":"南巷清风","gender":1,"language":"zh_CN",
"city":"Xuchang","province":"Henan","country":"China",
"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeATGnNBnFjRtsEYbohVINhbhQsD4CM0rLY0y88HlASgEyqODbX0vh1byBIKRygMafKGMEHZsvYQ/132",
"watermark":{"timestamp":1572816727,"appid":"wx605a1a25653d73b3"}}');