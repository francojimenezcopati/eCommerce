class OrderProductAlreadyExists(Exception):
    def __init__(self) -> None:
        self.message = "An OrderProduct object already exists with that order and that product"
        super().__init__(self.message)