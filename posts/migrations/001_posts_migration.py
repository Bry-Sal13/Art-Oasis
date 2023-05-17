steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE posts (
            id SERIAL NOT NULL UNIQUE,
            user_id INT NOT NULL,
            text VARCHAR(600) DEFAULT "",
            image VARCHAR(1000) DEFAULT "",
            created DATETIME DEFAULT getdate(),
            PRIMARY KEY(id)
            CONSTRAINT fk_user_id
                FOREIGN KEY(user_id)
                REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE posts;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments(
            id SERIAL NOT NULL UNIQUE,
            post_id INT NOT NULL,
            text VARCHAR(600) NOT NULL,
            PRIMARY KEY(id)
            CONSTRAINT fk_post_id
                FOREIGN KEY(post_id)
                REFERENCES posts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE likes(
            id SERIAL NOT NULL UNIQUE,
            post_id INT NOT NULL,
            user_id INT NOT NULL,
            PRIMARY KEY(id)
            CONSTRAINT fk_post_id
                FOREIGN KEY(post_id)
                REFERENCES posts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """
    ]
]
