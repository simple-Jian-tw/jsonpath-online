export const JMES_DEFAULT_JSON = `{
  "people": [
    {
      "name": "Alice",
      "age": 34,
      "active": true,
      "skills": ["aws", "python", "terraform"],
      "location": { "city": "Seattle", "country": "USA" },
      "projects": [
        { "name": "lambda-migration", "hours": 120 },
        { "name": "cost-optimizer", "hours": 80 }
      ]
    },
    {
      "name": "Bob",
      "age": 28,
      "active": false,
      "skills": ["node", "devops"],
      "location": { "city": "Dublin", "country": "Ireland" },
      "projects": [
        { "name": "ecs-upgrade", "hours": 60 },
        { "name": "security-review", "hours": 40 }
      ]
    },
    {
      "name": "Carol",
      "age": 41,
      "active": true,
      "skills": ["go", "k8s", "aws"],
      "location": { "city": "Berlin", "country": "Germany" },
      "projects": [
        { "name": "observability", "hours": 150 }
      ]
    }
  ]
}`;

export const JMES_DEFAULT_EXPR = "people[?age > `30`].name";

export const JMES_QUICK_EXAMPLES = [
  {
    title: "All names",
    expression: "people[*].name",
    description: "Basic projection of all names.",
  },
  {
    title: "Filter age > 30",
    expression: "people[?age > `30`].{Name: name, Age: age}",
    description: "Filter and rename keys.",
  },
  {
    title: "Active engineers",
    expression: "people[?active].name",
    description: "Truthy check for active flag.",
  },
  {
    title: "Flatten skills",
    expression: "people[*].skills[]",
    description: "Flat list of all skills.",
  },
  {
    title: "Sort by age",
    expression: "sort_by(people, &age)[].{name: name, age: age}",
    description: "Sort ascending by age.",
  },
  {
    title: "City list",
    expression: "people[*].location.city",
    description: "Nested projection for city values.",
  },
  {
    title: "Total hours",
    expression: "sum(people[*].projects[*].hours)",
    description: "Sum hours across nested projects.",
  },
  {
    title: "First project per person",
    expression: "people[*].projects[0].name",
    description: "Index into nested arrays.",
  },
  {
    title: "Name to skills map",
    expression: "map(&{name: name, skills: skills}, people)",
    description: "Use map to restructure.",
  },
  {
    title: "Group by active",
    expression: "{active: people[?active].name, inactive: people[?!active].name}",
    description: "Conditional grouping.",
  },
];
