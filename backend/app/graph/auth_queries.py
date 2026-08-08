from app.graph.neo4j_driver import get_driver


class AuthQueries:


    @staticmethod
    def create_user(
        name,
        email,
        password_hash,
        role="HR"
    ):

        query = """
        CREATE (u:User {
            user_id: randomUUID(),
            name: $name,
            email: $email,
            password_hash: $password_hash,
            role: $role,
            created_at: datetime()
        })

        RETURN u
        """


        connection = get_driver()


        with connection.get_session() as session:

            result = session.run(
                query,
                name=name,
                email=email,
                password_hash=password_hash,
                role=role
            )


            record = result.single()


            if record:

                return dict(record["u"])


            return None



    @staticmethod
    def get_user_by_email(email):

        query = """
        MATCH (u:User)
        WHERE u.email = $email

        RETURN u
        """


        connection = get_driver()


        with connection.get_session() as session:

            result = session.run(
                query,
                email=email
            )


            record = result.single()


            if record:

                return dict(record["u"])


            return None



    @staticmethod
    def get_user_by_id(user_id):

        query = """
        MATCH (u:User)
        WHERE u.user_id = $user_id

        RETURN u
        """


        connection = get_driver()


        with connection.get_session() as session:

            result = session.run(
                query,
                user_id=user_id
            )


            record = result.single()


            if record:

                return dict(record["u"])


            return None



    @staticmethod
    def delete_user(email):

        query = """
        MATCH (u:User)
        WHERE u.email = $email

        DELETE u

        RETURN count(u) AS deleted
        """


        connection = get_driver()


        with connection.get_session() as session:

            result = session.run(
                query,
                email=email
            )


            record = result.single()


            return record["deleted"] if record else 0