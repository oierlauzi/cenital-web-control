const ackChar = '#';
const escapeChar = '\\';
const separatorChar = ' ';

function isEscaped(token, pos) {
  let cnt = 0;

  //Count successive iterations of the backslash
  while(pos > 0) {
    --pos;
    if(token.charAt(pos) === escapeChar) {
      ++cnt;
    } else {
      break;
    }
  }

  //Odd amount of backslashes are scaped
  return (cnt % 2) !== 0;
}



function makeAck(ackId) {
  return ackChar + ackId;
}

function checkSuccess(token) {
  return token === 'OK';
}

function serialize(tokens) {
  let result = null;

  //Sanitize spaces and backslashes
  tokens = tokens.map(token => {
    token = token.replace(escapeChar, escapeChar + escapeChar);
    token = token.replace(separatorChar, escapeChar + separatorChar);
    return token;
  });

  //Serialize the tokens
  tokens.forEach(token => {
    if(result) {
      result += separatorChar + token;
    } else {
      result = token;
    }
  });

  return result;
}

function tokenize(msg) {
  let result = [];

  let position = 0;
  while(msg.length > 0) {
    //Find the next instance of the separator
    position = msg.indexOf(separatorChar, position);

    if(position >= 0) {
      if(isEscaped(msg, position)) {
        //This separator is escaped, search for the next
        ++position;
      } else {
        //Split at this position
        //Only append if not empty
        if(position > 0) {
          result.push(msg.slice(0, position));
        }

        //Pop the characters. Ignore the separator
        msg = msg.slice(position + 1);
        position = 0; //Start over
      }
    } else {
      //No separators were found, add the whole string
      result.push(msg);
      msg = "";
    }
  }

  //Un-sanitize spaces and backslashes
  result = result.map(token => {
    token = token.replace(escapeChar + escapeChar, escapeChar);
    token = token.replace(escapeChar + separatorChar, separatorChar);
    return token;
  });

  return result;
}



function parseBoolean(token) {
  let result = undefined;

  if(token === 'true') {
    result = true;
  } else if(token === 'false') {
    result = false;
  }

  return result;
}

function generateBoolean(x) {
  return x.toString();
}

function parseInteger(token) {
  let result = parseInt(token, 10);

  if(isNaN(result)) {
    result = undefined;
  }

  return result;
}

function generateInteger(x) {
  return Math.trunc(x).toString();
}

function parseNumber(token) {
  let result = parseFloat(token, 10);

  if(isNaN(result)) {
    result = undefined;
  }

  return result;
}

function generateNumber(x) {
  return x.toString();
}

function parseVector(token, separator, length, parser) {
  let result = undefined;
  const components = token.split(separator);

  if(components.length === length) {
    result = components.map(value => parser(value));

    //Check if all the components were successfully 
    if(result.includes(undefined)) {
      result = undefined;
    }
  }

  return result;
}

function generateVector(x, separator, generator) {
  let result = "";

  for(let i = 0; i < x.length; ++i) {
    if(i !== 0) {
      result += separator;
    }

    result += generator(x[i]);
  }

  return result;
}

function parseVector2b(token) {
  return parseVector(token, ',', 2, parseBoolean);
}

function parseVector2i(token) {
  return parseVector(token, ',', 2, parseInteger);
}

function parseVector2f(token) {
  return parseVector(token, ',', 2, parseNumber);
}

function parseVector3b(token) {
  return parseVector(token, ',', 3, parseBoolean);
}

function parseVector3i(token) {
  return parseVector(token, ',', 3, parseInteger);
}

function parseVector3f(token) {
  return parseVector(token, ',', 3, parseNumber);
}

function parseVector4b(token) {
  return parseVector(token, ',', 4, parseBoolean);
}

function parseVector4i(token) {
  return parseVector(token, ',', 4, parseInteger);
}

function parseVector4f(token) {
  return parseVector(token, ',', 4, parseNumber);
}

function parseResolution(token) {
  let result = undefined;

  const components = parseVector(token, 'x', 2, parseInteger);
  if(components) {
    result = {
      width: components[0],
      height: components[1]
    };
  }

  return result;
}

function generateResolution(x) {
  const components = [x.width, x.height];
  return generateVector(components, 'x', generateInteger);
}

function parseRational(token) {
  let result = undefined;

  const components = parseVector(token, '/', 2, parseInteger);
  if(components) {
    result = {
      num: components[0],
      den: components[1]
    };
  }

  return result;
}

function generateRational(x) {
  const components = [x.num, x.den];
  return generateVector(components, '/', generateInteger);
}


export default {
  makeAck,
  checkSuccess,
  serialize,
  tokenize,
  parseBoolean,
  generateBoolean,
  parseInteger,
  generateInteger,
  parseNumber,
  generateNumber,
  parseVector,
  parseVector2b,
  parseVector2i,
  parseVector2f,
  parseVector3b,
  parseVector3i,
  parseVector3f,
  parseVector4b,
  parseVector4i,
  parseVector4f,
  generateVector,
  parseResolution,
  generateResolution,
  parseRational,
  generateRational
};