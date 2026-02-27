self.onmessage = function (e) {
  const code = e.data;

  let output = "";

  const originalLog = console.log;

  console.log = function (...args) {
    output += args.join(" ") + "\n";
  };

  try {
    new Function(code)();
    self.postMessage({ output });
  } catch (err) {
    self.postMessage({ output: err.message, error: true });
  }

  console.log = originalLog;
};