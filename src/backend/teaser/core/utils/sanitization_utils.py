def sanitize_str(input_str: str):
    output = input_str.strip()
    return output


def strip_xss(input_str: str):
    # TODO: Do I need to strip XSS?
    pass


def sanitize_foreign_key(foreign_key: int):
    if foreign_key < 0:
        raise ValueError("Invalid foreign key")
    return foreign_key


def sanitize_foreign_key_allow_values(foreign_key: int, allowed_values: list):
    if foreign_key in allowed_values:
        pass
    elif foreign_key < 0:
        raise ValueError("Invalid foreign key")
    return foreign_key
