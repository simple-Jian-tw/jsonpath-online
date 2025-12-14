export const DEFAULT_JSON_TEXT = `{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95,
        "isbn": "0-553-21311-3"
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99,
        "isbn": "0-553-21311-4"
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "price": 8.99,
        "isbn": "0-553-21311-5"
      }
    ],
    "bicycle": { "color": "red", "price": 19.95 }
  }
}`;

export const DEFAULT_PATH = "$.store.book[*].title";

