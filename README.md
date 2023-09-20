# Contact List Parser

This is a parser for Outlook or Google contact lists exported as CSV files.

## Installation

To use this parser in your project, you can install it via npm:

```bash
npm install contacts-parser
```

## Usage

```
import { parseContacts } from "contacts-parser";

...

export const editContacts = async (
  req: Request,
  res: Response,
) => {
  try {
    const files: any = req?.files //using Multer as request middleware
    if (isNullOrEmpty(files) || isNullOrEmpty(files['contacts'])) {
      res.sendStatus(400)
      return;
    }

    const file = files['contacts'][0];
    parseContacts(file.buffer, '54')
      .then((outputFile) => {
        const base64 = Buffer.from(outputFile).toString('base64');
        res.status(200).json({ data: base64 });
      })
      .catch((error) => {
        res.status(500).send({ error: error?.message });
      });
  } catch (err: any) {
    logger.fatal(`parseContacts error: ${err}`)
    throw err;
  }
};  
```

## Testing

This package uses the UVU testing framework. To run the tests, use the following command:

```bash
npm test
```

## Contributing

If you find a bug or want to contribute to the code or documentation, you can fork the repository and make changes for a later review and possible project integration.

## License

This project is licensed under [MIT](https://choosealicense.com/licenses/mit/).