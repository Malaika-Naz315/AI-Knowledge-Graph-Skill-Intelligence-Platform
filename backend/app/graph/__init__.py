def __init__(self):
    self.connection = Neo4jConnection()
    self.driver = self.connection.driver
    self.database = "aikg"