steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            profile_picture VARCHAR(1000),
            display_name VARCHAR(100),
            header_image VARCHAR(1000),
            first_name  VARCHAR(100) DEFAULT NULL,
            last_name  VARCHAR(100) DEFAULT NULL,
            category  VARCHAR(100) DEFAULT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE connections(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            user_id INT REFERENCES users (id),
            following_id INT,
            following BOOLEAN DEFAULT false
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE connections;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE image_carousel(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            user_id INT REFERENCES users (id),
            image_href VARCHAR(1000) DEFAULT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE image_carousel;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE socials(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            user_id INT REFERENCES users (id),
            link VARCHAR(1000) DEFAULT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE socials;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE posts (
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users (id),
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
            post_id INT NOT NULL REFERENCES posts (id),
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
            post_id INT NOT NULL REFERENCES posts (id),
            user_id INT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """
    ]
]
