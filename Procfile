web: gunicorn -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:$PORT app:app
uvicorn app:app --host 0.0.0.0 --port 4000