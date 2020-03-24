--创建意见反馈表
drop table if exists `opinions`;

create table `opinions`(
	`id` int(11) not null auto_increment,
	`openid` varchar(100) not null,
	`src` longText default null,
	`wechat` varchar(100) default null,
	`opinion` text not null,
	`create_time` timestamp not null default current_timestamp,
	primary key(`id`)
)default charset=`utf8`;


--创建分数记录表

drop table if exists `records`;

create table `records`(
	`id` int(11) not null auto_increment,--必填项，且要自增
	`openid` varchar(100) not null,--不同微信的标识符
	`add` int(11) not null,--必填项，每一次的操作
	`mark` int(11) not null,--总分数
	`note` varchar(100) default null,--备注
	`create_time` timestamp not null default current_timestamp,--默认为当前时间拖
	primary key(`id`)
)default charset=`utf8`;--默认语法为utf8


--创建管理员表

drop table if exists `admins`;

create table `admins`(
	`id` int(11) not null auto_increment,
	`name` varchar(20) not null,
	`password` varchar(20) not null,
	`phone` varchar(20) not null,
	`email` varchar(20) not null,
	`isAdmin`  int(11) not null,--1表示true,0表示false
	`create_time` timestamp not null default current_timestamp,
	primary key(`id`)
)default charset=`utf8`;

--插入管理员数据
insert into admins(name,password,phone,email,isAdmin) values('admin','961124','17839142787','1942472006@qq.com','1');
insert into admins(name,password,phone,email,isAdmin) values('admin1','961124','17839142780','1942472516@qq.com','1');
insert into admins(name,password,phone,email,isAdmin) values('admin2','961124','17839142789','1943372006@qq.com','1');
insert into admins(name,password,phone,email,isAdmin) values('admin3','961124','17839142782','1842572006@qq.com','1');
insert into admins(name,password,phone,email,isAdmin) values('admin4','961124','17839142781','1942462996@qq.com','1');
insert into admins(name,password,phone,email,isAdmin) values('admin5','961124','17839142783','1946475006@qq.com','1');
insert into admins(name,password,phone,email,isAdmin) values('admin6','961124','17839142784','1742492806@qq.com','1');

--创建文章表

drop table if exists `articles`;

create table `articles`(
	`id` int(11) not null auto_increment,
	`openid` varchar(100) default null,
	`title` varchar(20) not null,
	`article_image` varchar(255) not null,
	`author` varchar(20) not null,
	`view`  int(11) not null,--数字
	`isShow`  int(11) not null,--0表示否，1表示是
	`isCollection` int(11) not null,--0表示否，1表示是
	`content` text not null,
	`create_time` timestamp not null default current_timestamp,
	primary key(`id`)
)default charset=`utf8`;



