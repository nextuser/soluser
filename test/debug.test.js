const prevLine  = require('../src/utils/debug.js').prevLine;
function test_prevLine() {
    const [file,lineNumber] = prevLine();
    console.log("file:",file,"lineNumber:",lineNumber);
}

test_prevLine();