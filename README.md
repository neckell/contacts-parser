# Contact List Parser

This is a parser for Outlook or Google contact lists exported as CSV files.

## Installation

To use this parser in your project, you can install it via npm:

```bash
npm install google-contacts-parser
```

## Usage

```
import parseContacts from "google-contacts-parser";
...
  // assuming file a buffer
  parseContacts(buffer)
    .then((outputPath) => {
      res.status(200).send({ message: 'File uploaded and parsed successfully.', file: outputPath });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
```

## Function

WIP

## Testing

This package uses the UVU testing framework. To run the tests, use the following command:

```bash
npm test
```

## Contributing

If you find a bug or want to contribute to the code or documentation, you can fork the repository and make changes for a later review and possible project integration.

## License

This project is licensed under [MIT](https://choosealicense.com/licenses/mit/).