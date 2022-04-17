-- 1、查询student表当中的所有数据
-- SELECT * FROM student;

-- 2、查询student表当中所有记录的sname、ssex、class列
-- SELECT sname, ssex, class FROM student;

-- 3、查询教师所有单位，即不重复的depart列
-- distinct 排除重复
-- SELECT DISTINCT depart FROM teacher;

-- 4、查询score表当中成绩在60到80之间的记录
-- SELECT * FROM score WHERE degree BETWEEN 60 AND 80;
-- SELECT * FROM score WHERE degree > 60 AND degree < 80;

-- 5、查询score表当中成绩为85、86或88的记录
-- SELECT * FROM score WHERE degree IN (85, 86, 88);
-- SELECT * FROM score WHERE degree = 85 OR degree = 86 OR degree = 88;

-- 6、查询student表当中95031班或性别为女的同学记录
-- SELECT * FROM student WHERE class = '95031' OR ssex = '女';

-- 7、以class降序查询student表中的所有记录
-- desc降序，默认为asc升序
-- SELECT * FROM student ORDER BY class DESC;

-- 8、以cno升序、以degree降序查询score表中的所有记录
-- SELECT * FROM score ORDER BY cno ASC, degree DESC;

-- 9、查询95031班的学生人数
-- SELECT COUNT(*) FROM student WHERE class = '95031';

-- 10、查询score表当中的最高分学生学号和课程号76
-- 子查询
-- SELECT sno, cno FROM score WHERE degree = (SELECT max(degree) FROM score);

-- 11、查询每门课的平均成绩
-- avg 平均
-- group by 分组
-- SELECT AVG(degree) FROM score GROUP BY cno;

-- 12、查询score表中至少有两名学生选修的并且以3开头的课程的平均分数
-- like模糊查询，%为通配符
-- SELECT cno, AVG(degree), COUNT(*) FROM score GROUP BY cno HAVING COUNT(cno)>=2 AND cno LIKE '3%';

-- 13、查询分数大于70小于90的sno列和degree列
-- 方式一
-- SELECT sno, degree FROM score WHERE degree >= 70 AND degree <= 90;
-- 方式二
-- SELECT sno, degree FROM score WHERE degree BETWEEN 70 AND 90;

-- 14、多表查询：查询所有学生的sname、cno、degree列
-- SELECT sname, cno, degree FROM student, score
-- WHERE student.sno=score.sno;

-- 15、查询所有学生的cno、cname、degree列
-- SELECT sno, cname, degree FROM course, score
-- WHERE course.cno=score.cno;

-- 16、查询所有学生的sname、cname、degree列
-- sname -> student
-- cname -> course
-- degree -> score
-- student表当中有sno，course表当中有cno，score表当中既有sno也有cno
-- SELECT sname, cname, degree, student.sno, course.cno FROM student, course, score
-- WHERE student.sno=score.sno AND course.cno=score.cno;

-- 17、查询950031班学生每门课的平均分
-- SELECT cno, avg(degree) FROM score WHERE sno IN (SELECT sno FROM student WHERE class='95031') GROUP BY cno;

-- 18、查询选修3-105课程的成绩高于109号同学3-105成绩的所有同学记录
-- SELECT * FROM score WHERE degree > (SELECT degree FROM score WHERE sno='109' AND cno='3-105') AND cno='3-105';

-- 19、查询成绩高于学号为109，课程号为3-105的成绩的所有记录
-- SELECT * FROM score WHERE degree > (SELECT degree FROM score WHERE sno='109' AND cno='3-105');

-- 20、查询学号为108、101的同学同年出生的所有学生的sno、sname和sbirthday列
-- YEAR函数用来查询日期字段的年份，MONTH查询月份，DAY查询日
-- SELECT YEAR(sbirthday), MONTH(sbirthday), DAY(sbirthday) FROM student;
-- SELECT * FROM student WHERE YEAR(sbirthday) IN (SELECT YEAR(sbirthday) FROM student WHERE sno IN (108, 109));

-- 21、查询张旭教师任课的学生的成绩
-- 多层嵌套子查询
-- 最外层需要用in，因为该老师可能教授了多门课程
-- SELECT AVG(degree) FROM score WHERE cno IN (SELECT cno FROM course WHERE tno=(SELECT tno FROM teacher WHERE tname='张旭'));

-- 22、查询选修某课程的同学人数多于5人的教师姓名
-- SELECT tname FROM teacher WHERE tno IN (SELECT tno FROM course WHERE cno=(SELECT cno FROM score GROUP BY cno HAVING COUNT(*)>=5));

-- 23、查询95033班和95031班全体学生的记录
-- IN 表示或者关系
-- SELECT * FROM student WHERE class IN ('95033', '95031');

-- 24、查询存在有85分以上成绩的课程
-- SELECT DISTINCT cno FROM score WHERE degree > 85;

-- 25、查询出计算机系教师所教课程的成绩表
-- SELECT tno FROM teacher WHERE depart='计算机系';
-- SELECT cno FROM course WHERE tno IN (SELECT tno FROM teacher WHERE depart='计算机系');
-- SELECT * FROM score WHERE cno IN (SELECT cno FROM course WHERE tno IN (SELECT tno FROM teacher WHERE depart='计算机系'));

-- 26、查询计算机系与电子工程系不同职称的教师的tname和prof
-- 即查询一个系当中，拥有独有职称的教师，计算机系的副教授，电子工程系当中没有
-- UNION 求并集
-- SELECT * FROM teacher WHERE depart='计算机系' AND prof NOT IN (SELECT prof FROM teacher WHERE depart='电子工程系')
-- UNION
-- SELECT * FROM teacher WHERE depart='电子工程系' AND prof NOT IN (SELECT prof FROM teacher WHERE depart='计算机系');

-- 27、查询选修编号为3-105课程且成绩至少高于选修编号为3-245的同学的cno、sno和degree，并且按照degree由高到低排序
-- SELECT * FROM score WHERE cno='3-105' AND degree > ANY(SELECT degree FROM score WHERE cno='3-245') ORDER BY degree DESC;

-- 28、查询选修编号为3-105课程且成绩高于选修编号为3-245的同学的cno、sno和degree，并且按照degree由高到低排序
-- ANY 表示至少一个
-- ALL 表示全部
-- SELECT * FROM score WHERE cno='3-105';
-- SELECT * FROM score WHERE cno='3-245';
-- SELECT * FROM score WHERE cno='3-105' AND degree > ALL(SELECT degree FROM score WHERE cno='3-245') ORDER BY degree DESC;

-- 29、查询所有教师和学生的name、sex和birthday
-- AS 别名
-- SELECT tname AS name, tsex AS sex, tbirthday AS birthday FROM teacher
-- UNION
-- SELECT sname, ssex, sbirthday FROM student;

-- 30、查询所有女教师和女同学的name、sex和birthday
-- SELECT tname AS name, tsex AS sex, tbirthday AS birthday FROM teacher WHERE tsex='女'
-- UNION
-- SELECT sname, ssex, sbirthday FROM student WHERE ssex='女';

-- 31、查询成绩比课程平均成绩低的同学的成绩表
-- SELECT * FROM score a WHERE degree < (SELECT AVG(degree) FROM score b WHERE a.cno=b.cno);

-- 32、查询所有任教教师的tname和depart
-- SELECT * FROM teacher;
-- SELECT tno FROM course;
-- SELECT tname, depart FROM teacher WHERE tno IN (SELECT DISTINCT tno FROM course);

-- 33、查询至少有两名男生的班号
-- SELECT class FROM student WHERE ssex='男' GROUP BY class HAVING COUNT(*)>=2;

-- 34、查询student表当中不姓王的同学的记录
-- SELECT * FROM student WHERE sname NOT LIKE '王%';

-- 35、查询student表当中每个学生的姓名和年龄
-- 年龄 = 当前年份 - 出生年份
-- SELECT YEAR(NOW());
-- SELECT YEAR(sbirthday) FROM student;
-- SELECT sname, YEAR(NOW())-YEAR(sbirthday) as age FROM student;

-- 36、查询student表中最大和最小的sbirthday日期值
-- SELECT sbirthday FROM student ORDER BY sbirthday;
-- SELECT MAX(sbirthday) as '最大', MIN(sbirthday) as '最小' FROM student;

-- 37、以班号和年龄从大到小的顺序查询student表中的记录
-- SELECT * FROM student ORDER BY class  DESC, sbirthday;

-- 38、查询男教师及其所上的课程
-- SELECT tno FROM teacher WHERE tsex='男';
-- SELECT * FROM course WHERE tno IN (SELECT tno FROM teacher WHERE tsex='男');

-- 39、查询最高分同学的sno、cno和degree
-- SELECT MAX(degree) FROM score;
-- SELECT sno, cno, degree FROM score WHERE degree=(SELECT MAX(degree) FROM score);

-- 40、查询和李军同性别的所有同学的sname
-- SELECT * FROM student WHERE sname='李军';
-- SELECT sname FROM student WHERE ssex=(SELECT ssex FROM student WHERE sname='李军');

-- 41、查询和李军同性别并且同班的同学sname
-- SELECT ssex FROM student WHERE sname='李军';
-- SELECT class FROM student WHERE sname='李军';
-- SELECT * FROM student WHERE ssex=(SELECT ssex FROM student WHERE sname='李军') AND class=(SELECT class FROM student WHERE sname='李军');

-- 42、查询所有选修计算机导论课程的男同学的成绩表
-- SELECT cno FROM course WHERE cname='计算机导论';
-- SELECT sno FROM score WHERE cno=(SELECT cno FROM course WHERE cname='计算机导论');
-- SELECT * FROM student WHERE sno IN (SELECT sno FROM score WHERE cno=(SELECT cno FROM course WHERE cname='计算机导论')) AND ssex='男';

-- 43、查询所有同学的sno、cno和grade列
-- SELECT sno, cno, grade FROM score, grade WHERE degree BETWEEN low AND upp;

-- #######################################################################################

-- SQL的四种连接
-- 1 内连接（inner join或join）
-- 2 外连接
	-- 2.1 左连接（left join 或者 left outer join）
	-- 2.2 右连接（right join 或者 right outer join）
	-- 2.3 完全外连接（full join 或者 full outer join）
	
-- person 表
-- id、name、cardID

-- card 表
-- id、name

-- 1 内连接：即两张表中的数据通过某个字段相对应，查询出相关的记录
-- SELECT * FROM person INNER JOIN card ON person.cardID=card.id;

-- 2 左外连接：把左边表里面的所有数据取出来，而右边表中的数据，如果有相等的，就显示出来，如果没有，就会显示null
-- SELECT * FROM person LEFT JOIN card ON person.cardID=card.id;

-- 3、右外连接：把右边表中的所有数据取出来，而左边表中的数据，如果有相等的，就显示出来，如果没有，就显示null
-- SELECT * FROM person RIGHT JOIN card ON person.cardID=card.id;

-- 4、完全外连接
-- SELECT * FROM person FULL JOIN card ON person.cardID=card.id;
-- MySql不支持完全外连接，需要使用 UNION
-- SELECT * FROM person LEFT JOIN card ON person.cardID=card.id
-- UNION
-- SELECT * FROM person RIGHT JOIN card ON person.cardID=card.id;


-- #######################################################################################

-- MySql事务
-- 事务其实是一个最小的不可分割的工作单元，事务能够保证一个业务的完整性
-- 比如银行转账：a用户向b用户转账100元
-- a -> -100
-- UPDATE user SET money=money-100 WHERE name='a';
-- b -> +100
-- UPDATE user SET money=money+100 WHERE name='b';
-- 实际的程序当中，如果只有一条语句执行成功了，而另外一条语句没有执行成功，就会出现数据的不一致
-- 多条sql语句，可能有同时成功的要求，要么就同时失效

-- mysql当中是默认开启事务的
-- 查看mysql事务：SELECT @@autocommit;
-- 默认开启事务的作用：当执行一个sql语句时，效果会立即体现出来，且不能回滚
-- 回滚语句：ROLLBACK
-- 设置mysql关闭事务时，可以进行回滚，设置关闭事务：SET autocommit=0;
-- 设置了mysql事务关闭之后，插入的数据只是在虚拟表当中，需要进行提交，提交语句：commit;
-- 提交过后，不能再使用ROLLBACK;

-- 自动提交（默认）：SET autocommit=1;
-- 手动提交：
	-- SET autocommit=1;
	-- INSERT 语句，插入到虚拟表当中
	-- 在 COMMIT 之前，可以使用 ROLLBACK 来回滚，放弃插入
	-- COMMIT; 手动进行提交
	-- COMMIT 之后不能再回滚

-- 手动开启事务
-- BEGIN; 或 START TRANSACTION; 都可以手动开启一个事务
-- 如果第一个事务既没有回滚，也没有提交，直接开启了第二个事务，则第一个事务会被隐式提交

-- 事务的四大特征（ACID）
-- A 原子性：事务是最小的单位，不能被分割
-- C 一致性：事务要求，同一事务中的sql语句，必须保证同时成功或者同时失败
-- I 隔离性：事务1和事务2之间是具有隔离性的
-- D 持久性：事务一旦结束（COMMIT），就不可以返回

-- 事务开启：
	-- 1 修改默认提交：SET autocommit=0;
	-- 2 BEGIN;
	-- 3 START TRANSACTION;
-- 事务手动提交：
	-- COMMIT;
-- 事务手动回滚：
	-- ROLLBACK;
	
	
-- 事务的隔离性
	-- 1 READ UNCOMMITTED    读未提交的
	-- 2 READ COMMITTED      读已经提交的
	-- 3 REPEATABLE READ     可以重复读
	-- 4 SERIALIZABLE        串行化
    -- 性能：1 > 2 > 3 > 4
    -- 隔离级别：4 > 3 > 2 > 1
    -- 默认级别：REPEATABLE READ

-- 查看隔离级别
	-- mysql 8.0：SELECT @@GLOBAL.TRANSACTION_ISOLATION;
	-- mysql 5.x: 
		-- 系统级别：SELECT @@GLOBAL.tx_ISOLATION;
		-- 会话级别：SELECT @@tx_ISOLATION;
-- 修改隔离级别：
	-- 修改系统隔离级别：SET GLOBAL TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	-- 修改会话级别级别：SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

 
-- 1 READ UNCOMMITTED
	-- 如果有事务a和事务b，a事务对数据进行操作，a事务没有被提交，但是b可以看见a操作的结果
	-- 小明去淘宝店买鞋子，转账800元到淘宝店，小明转账之后，淘宝店可以查到到转账已经到账
	-- 但是小明利用 ROLLBACK 进行了回滚，转账的钱又回到了小明的账户

	-- 如果两个不同的地方，都在进行操作，如果事务a开启之后，事务a的数据可以被其他事务读取到
	-- 这样就会出现脏读，即一个事务读取到了另外一个事务没有提交的数据
	-- SET GLOBAL TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	-- START TRANSACTION;
	-- UPDATE `user` SET money=money-800 WHERE name='小明';
	-- UPDATE `user` SET money=money+800 WHERE name='淘宝店';
	-- SELECT * FROM `user`;
	-- 
	-- ROLLBACK;

-- 2 READ COMMITTED
	-- SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;
	-- 1 小张：银行的会计
		-- START TRANSACTION;
		-- SELECT * FROM `user`;
	-- 2 小王：新增一个账号c，money为100
		-- START TRANSACTION;
		-- INSERT INTO `user` VALUES (5, 'c', 100);
		-- COMMIT;
	-- 3 小张：
		-- SELECT AVG(money) FROM `user`;
	-- 读取同一张表的数据，发现前后不一致

-- 3 REPEATABLE READ
	-- 幻读
	-- 事务a和事务b同时操作同一张表，事务a提交的数据，不能被事务b读取到，可以造成幻读
	-- SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ;
	
	-- 员工一：
		-- START TRANSACTION;
		-- INSERT INTO `user` VALUES (6, 'd', 1000);
		-- COMMIT;
	
	-- 员工二：
		-- 员工二查询不到员工一插入的数据，员工二插入数据时就会报错
		-- START TRANSACTION;
		-- SELECT * FROM `user`;
		-- INSERT INTO `user` VALUES (6, 'd', 1000);

-- 4 SERIALIZABLE（串行化）
    -- 串行化的问题是性能特差
	-- SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
	-- 东霓：
		-- START TRANSACTION;
		-- INSERT INTO `user` VALUES (7, '东霓', 1000);
		-- COMMIT;
	-- 西决：
		-- START TRANSACTION;
		-- SELECT * FROM `user`;
		-- 可以查的到另外一个员工插入的数据
		-- 但是执行下面的语句后，会卡住，是因为另外一个事务在操作user表
		-- 这边的事务只能进行排队状态，只有在另外一个事务 COMMIT 之后，并且没有超时，才能进行下去
		-- INSERT INTO `user` VALUES (8, '西决', 1000);