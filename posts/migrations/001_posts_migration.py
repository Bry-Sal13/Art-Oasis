steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE posts (
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            user_id INT NOT NULL,
            text VARCHAR(600) DEFAULT NULL,
            image VARCHAR(1000) DEFAULT NULL,
            created TIMESTAMP DEFAULT NOW()
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
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            post_id INT NOT NULL,
            user_id INT NOT NULL,
            text VARCHAR(600) NOT NULL
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
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            post_id INT NOT NULL,
            user_id INT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """
    ]
]
