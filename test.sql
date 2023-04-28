CREATE TABLE Permission (
    PermissionID INTEGER PRIMARY KEY,
    Role VARCHAR(50),
    PermissionList TEXT
);

INSERT INTO
    Permission
VALUES
    (0, 'Student', 'create,save,edit,reply');

INSERT INTO
    Permission
VALUES
    (1, 'Professor', 'create,save,delete,reply,edit');

INSERT INTO
    Permission
VALUES
    (2, 'TA', 'create,save,edit,reply');

CREATE TABLE Classes (
    classId uuid DEFAULT uuid_generate_v4() NOT NULL,
    ClassTitle Varchar(255),
    Description TEXT,
    QtyOfTopics integer NOT NULL,
    classcode character varying(15) NOT NULL,
    PRIMARY KEY (classId),
    CHECK(QtyOfTopics >= 0)
);

CREATE TYPE role_enum AS ENUM ('Professor', 'TA', 'Student');

CREATE TABLE Users (
    Role role_enum,
    Username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
    email VARCHAR(50),
    PermissionID INTEGER REFERENCES Permission
);

CREATE TABLE MemberOf(
    Username VARCHAR(50) REFERENCES Users,
    ClassID uuid REFERENCES Classes,
    CONSTRAINT member_pk PRIMARY KEY (Username, ClassID)
);

CREATE TABLE Topics (
    topicID uuid DEFAULT uuid_generate_v4() NOT NULL,
    Username uuid REFERENCES users,
    ClassID uuid REFERENCES Classes,
    Title VARCHAR(255),
    Description TEXT,
    QtyOfPosts INTEGER DEFAULT 0,
    PRIMARY KEY (topicID),
    CHECK(QtyOfPosts >= 0)
);

CREATE TABLE Contains(
    ClassID uuid REFERENCES Classes,
    TopicID uuid REFERENCES Topics,
    CONSTRAINT contain_pk PRIMARY KEY (ClassID, TopicID)
);

CREATE TYPE post_type AS ENUM ('unanswered', 'discussion', 'answered');

CREATE TABLE Posts (
    postId uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    ClassID uuid REFERENCES Classes,
    topicId uuid REFERENCES Topics,
    Title VARCHAR(255),
    Description TEXT,
    Username VARCHAR(50) REFERENCES Users,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TotalVote INTEGER DEFAULT 0,
    postType post_type
);

CREATE TABLE Comments(
    commentId uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    postId uuid REFERENCES Posts NOT NULL,
    Username VARCHAR(50) REFERENCES Users NOT NULL,
    content Text NOT NULL,
    TotalVote INTEGER,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Tag VARCHAR(50)
);

CREATE VIEW PostDetails AS
SELECT
    p.TicketID,
    c.ClassTitle,
    t.Title AS TopicTitle,
    p.Title,
    p.Description,
    u.Username,
    p.DateCreated,
    p.TotalVote,
    p.ActivityTag
FROM
    Posts p
    JOIN Topics t ON p.TopicID = t.TopicID
    JOIN Classes c ON p.ClassID = c.ClassID
    JOIN Users u ON p.Username = u.Username;

CREATE VIEW PostDetails AS
SELECT
    p.TicketID,
    c.ClassTitle,
    t.Title AS TopicTitle,
    p.Title,
    p.Description,
    u.Username,
    p.DateCreated,
    p.TotalVote,
    p.ActivityTag
FROM
    Posts p
    JOIN Topics t ON p.TopicID = t.TopicID
    JOIN Classes c ON p.ClassID = c.ClassID
    JOIN Users u ON p.Username = u.Username;

CREATE OR REPLACE FUNCTION InsertPost(
    p_class_id INTEGER,
    p_topic_id INTEGER,
    p_title VARCHAR(255),
    p_description VARCHAR(255),
    p_username VARCHAR(255),
    p_post_type VARCHAR(255)
) RETURNS VOID AS $ $ BEGIN
-- Insert the new post into the Posts table
INSERT INTO Posts (
        classid,
        topicid,
        title,
        description,
        username,
        postType )
VALUES (
        p_class_id,
        p_topic_id,
        p_title,
        p_description,
        p_username,
        p_post_type );

-- Update the QtyOfPosts column in the Topics table
UPDATE Topics SET QtyOfPosts = QtyOfPosts + 1 WHERE TopicID = p_topic_id;

END;

$ $ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION InsertTopic(
    p_class_id uuid,
    p_topic_title VARCHAR(255),
    p_topic_description TEXT,
    p_username VARCHAR(50)
) RETURNS uuid AS $ $
DECLARE inserted_id uuid;
BEGIN 
-- Insert the new topic into the Topics table
INSERT INTO topics (classid, title, description, username)
VALUES(
        p_class_id,
        p_topic_title,
        p_topic_description,
        p_username
    ) 
    RETURNING topicId INTO inserted_id;

-- Update the QtyOfTopics column in the Classes table
UPDATE classes SET qtyoftopics = qtyoftopics + 1 WHERE  classid = p_class_id;

RETURN inserted_id;

END;

$ $ LANGUAGE plpgsql;