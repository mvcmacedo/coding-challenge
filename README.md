# Coding Challenge

Node.js CLI to store key | value data.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install project dependencies. For [node](https://nodejs.org/en/), you can use the version in the `.nvmrc` file.

```bash
npm i
```

## Running locally

On the root path, run:

```bash
npm install -g .
```

With `friendbuy` cli installed, you can run the commands like the examples bellow:

```bash
# to see all commands and options
friendbuy --help

# to get a variable value
friendbuy get -n <name>

# to set a new key | value data
friendbuy set -n <name> -v <value>

# to unset a variable
friendbuy unset -n <name>

# to find number of variables with a value
friendbuy numequalto -v <value>

# start a new transaction block
friendbuy begin

# rollback last transaction block
friendbuy rollback

# apply changes on all blocks
friendbuy commit

# end program
friendbuy end
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
