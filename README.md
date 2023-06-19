
# eslint-plugin-deprecated-classnames

The eslint rule checks the code for the use of deprecated class names from the defined list


## Installation

Install my-project with npm

```bash
  npm install eslint eslint-plugin-deprecated-classnames --save-dev
```
    
## Usage/Examples

```json
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ]
```

```json
  "rules": {
    "deprecated-classnames/deprecated-classnames": [
      "error",
      {
        "classnames": [
          { "name": "deprecated", "replacement": "actual" }
        ]
      }
    ]
  }
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## License

[MIT](https://choosealicense.com/licenses/mit/)

