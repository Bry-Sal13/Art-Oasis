steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE posts (
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            username VARCHAR(20) NOT NULL,
            text VARCHAR(600) DEFAULT NULL,
            image VARCHAR(2500) DEFAULT NULL,
            created TIMESTAMP DEFAULT NOW()
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE posts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            post_id INT NOT NULL,
            username VARCHAR(20) NOT NULL,
            text VARCHAR(600) NOT NULL,
            created TIMESTAMP DEFAULT NOW()
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE likes(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            post_id INT NOT NULL,
            username VARCHAR(20) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """,
    ],
]
