import json
from datetime import date, datetime


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


class CleanJson(object):
    """
    https://www.secopshub.com/t/python-heres-a-class-to-clean-json-data/833
    """

    def __init__(self, data):
        try:
            # json_data = json.dumps(data, default=self.json_serial)
            self.decoded_dict = json.loads(data, object_hook=self.decode_dict)
        except Exception as e:
            json_data = json.dumps(data, default=self.json_serial)
            self.decoded_list = json.loads(json_data, object_hook=self.decode_dict)

    def get(self):
        if self.decoded_dict:
            return self.decoded_dict
        elif self.decoded_list:
            return self.decoded_list

    def json_serial(self, obj):
        """JSON serializer for objects not serializable by default json code"""
        if isinstance(obj, date) or isinstance(obj, datetime):
            return obj.isoformat()
        raise TypeError("Type %s not serializable" % type(obj))

    def decode_list(self, data):
        rv = []
        for item in data:
            if isinstance(item, str):
                item = item.encode("utf-8")
            elif isinstance(item, list):
                item = self.decode_list(item)
            elif isinstance(item, dict):
                item = self.decode_dict(item)
            rv.append(item)
        return rv

    def decode_dict(self, data):
        rv = {}
        for key, value in data.iteritems():
            if isinstance(key, str):
                key = key.encode("utf-8")
            if isinstance(value, str):
                value = value.encode("utf-8")
            elif isinstance(value, list):
                value = self.decode_list(value)
            elif isinstance(value, dict):
                value = self.decode_dict(value)
            rv[key] = value
        return rv
