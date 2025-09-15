import requests
import json

def fetch_all_books():
    all_books = []

    # 1) Subject API
    subjects = ["science", "fiction", "history", "fantasy", "biography"]
    for subject in subjects:
        url = f"https://openlibrary.org/subjects/{subject}.json?limit=20"
        res = requests.get(url).json()
        for work in res.get("works", []):
            all_books.append({
                "title": work.get("title"),
                "authors": [a["name"] for a in work.get("authors", [])],
                "cover_url": f"https://covers.openlibrary.org/b/id/{work['cover_id']}-L.jpg" if work.get("cover_id") else None,
                "genre": subject
            })

    # 2) Recent Changes
    url = "https://openlibrary.org/recentchanges.json?limit=50"
    res = requests.get(url).json()
    for item in res:
        work = item.get("data", {}).get("work")
        if work:
            all_books.append({
                "title": work.get("title"),
                "authors": work.get("authors"),
                "cover_url": f"https://covers.openlibrary.org/b/id/{work['cover_id']}-L.jpg" if work.get("cover_id") else None,
                "genre": work.get("subjects", [])
            })

    return all_books

books = fetch_all_books()
books_json = json.dumps(books, indent=4, ensure_ascii=False)
with open("all_books_with_genre.json", "w", encoding="utf-8") as f:
    f.write(books_json)
print(f"Total books fetched: {len(books)}")
