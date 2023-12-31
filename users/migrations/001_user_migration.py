steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            profile_picture VARCHAR(2500) DEFAULT NULL,
            display_name VARCHAR(100) DEFAULT NULL,
            header_image VARCHAR(2500) DEFAULT NULL,
            first_name  VARCHAR(100) DEFAULT NULL,
            last_name  VARCHAR(100) DEFAULT NULL,
            password VARCHAR(128) NOT NULL,
            username VARCHAR(20) UNIQUE NOT NULL,
            category  VARCHAR(100) DEFAULT NULL,
            about VARCHAR(1250) DEFAULT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE connections(
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            following_id INT NOT NULL,
            UNIQUE (user_id , following_id ),
            CHECK (user_id <> following_id )
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE connections;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE image_carousel(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            user_id INT,
            image_href VARCHAR(2500) DEFAULT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE image_carousel;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE socials(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            user_id INT,
            link VARCHAR(2500) DEFAULT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE socials;
        """,
    ],
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
            username VARCHAR(20) NOT NULL,
            UNIQUE (username , post_id )
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """,
    ],
]
