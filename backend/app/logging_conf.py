import logging, sys

def setup_logging():
    root = logging.getLogger()
    handler = logging.StreamHandler(sys.stdout)
    fmt = logging.Formatter("%(asctime)s - %(levelname)s - %(name)s - %(message)s")
    handler.setFormatter(fmt)
    root.setLevel(logging.INFO)
    if not root.handlers:
        root.addHandler(handler)
