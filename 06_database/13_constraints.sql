# CONSTRAINTS(제약 조건)

# NOT NULL
-- NULL값을 허용하지 않음

CREATE TABLE IF NOT EXISTS user_notnull (
    user_no INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    user_pwd VARCHAR(255) NOT NULL,
    gender VARCHAR(3),
    unique(USER_ID)
) ENGINE=INNODB;

INSERT INTO user_notnull VALUES(1, 'user01', 'pass01', '남');

SELECT * FROM user_notnull;

INSERT INTO user_notnull VALUES(2, 'user02', NULL, '여');
INSERT INTO user_notnull VALUES(1, 'user01', 'pass01', NULL);

# UNIQUE
-- 중복값을 허용하지 않는 제약조건

CREATE TABLE IF NOT EXISTS user_unique (
    user_no INT,
    user_id VARCHAR(255),
    user_pwd VARCHAR(255) NOT NULL,
    gender VARCHAR(3),
    UNIQUE(user_id) -- 테이블 레벨에서 user_id 중복 방지
) ENGINE=INNODB;

INSERT INTO user_unique VALUES(1, 'user01', 'pass01', '남');

INSERT INTO user_unique VALUES(1, 'user02', 'pass02', '여');

INSERT INTO user_unique VALUES(3, 'user03', 'pass01', '남');

SELECT * FROM user_unique;

CREATE TABLE IF NOT EXISTS user_primarykey (
    user_no INT,
    user_id VARCHAR(255),
    user_pwd VARCHAR(255) NOT NULL,
    gender VARCHAR(3),
    UNIQUE(user_id) -- 테이블 레벨에서 user_id 중복 방지
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS user_grade (
    grade_code INT PRIMARY KEY,
    grade_name VARCHAR(255) NOT NULL
) ENGINE=INNODB;

INSERT INTO user_grade VALUES
(10, '일반회원'),
(20, '우수회원'),
(30, '특별회원');

CREATE TABLE IF NOT EXISTS user_foreignkey1 (
    user_no INT PRIMARY KEY,
    grade_code INT,
    FOREIGN KEY (grade_code) REFERENCES user_grade(grade_code)
) ENGINE=INNODB;
INSERT INTO user_foreignkey1 VALUES (1, 10);
INSERT INTO user_foreignkey1 VALUES (2, 20);

SELECT * FROM user_foreignkey1;

# ON UPDATE / ON DELETE 옵션
# 그냥 참조사항
-- SET NULL : 부모(user_grader)가 바뀌거나 사라지면, 해당 값을 NULL로 바꾼다
-- CASCADE : 부모가 바뀌면 자식도 따라 바뀌고, 부모가 사라지면 자식도 함께 사라진다

CREATE TABLE IF NOT EXISTS user_foreignkey2 (
    user_no INT PRIMARY KEY,
    grade_code INT,
    FOREIGN KEY (grade_code) REFERENCES user_grade(grade_code)
        ON UPDATE SET NULL
        ON DELETE SET NULL
) ENGINE=INNODB;

INSERT INTO user_foreignkey2 VALUES (1, 10), (2, 20), (3, 30);

SELECT * FROM user_foreignkey2;

DROP TABLE IF EXISTS user_foreignkey1;

-- 부모 테이블의 grade_code 수정
UPDATE user_grade
SET grade_code = 40
WHERE grade_code = 10;

SELECT * FROM user_grade;
SELECT * FROM user_foreignkey2;

SHOW TABLES;

CREATE TABLE IF NOT EXISTS user_foreignkey2 (
    user_no INT PRIMARY KEY,
    grade_code INT,
    FOREIGN KEY (grade_code)
        REFERENCES user_grade(grade_code)
        ON UPDATE SET NULL
        ON DELETE SET NULL
) ENGINE=INNODB;

# CHECK
-- 들어올 수 있는 값의 범위나 조건을 직접 지정

CREATE TABLE IF NOT EXISTS user_check (
    user_no INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    gender VARCHAR(3), CHECK (gender In ('남','여')),
    age INT CHECK (AGE >= 19)
) ENGINE=INNODB;

INSERT INTO user_check VALUES(NULL, '홍길동', '남', 25);

# DEFAULT
-- INSERT시 특정 컬럼에 값을 주지 않으면, 자동으로 채워질 기본값을 지정한다

CREATE TABLE IF NOT EXISTS tbl_country (
    country_code INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(255) DEFAULT '한국',
    add_day DATE DEFAULT (CURRENT_DATE),
    add_time TIME DEFAULT (CURRENT_TIME)
) ENGINE=INNODB;

INSERT INTO tbl_country VALUES (NULL, DEFAULT, DEFAULT, DEFAULT);

DROP TABLE IF EXISTS user_country

