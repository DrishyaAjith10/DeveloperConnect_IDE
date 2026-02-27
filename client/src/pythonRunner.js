import { loadPyodide } from "pyodide";

let pyodide = null;

export const initPyodide = async () => {
  if (!pyodide) {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/",
    });
  }
  return pyodide;
};

export const runPython = async (code) => {
  const py = await initPyodide();

  try {
    let output = "";

    py.setStdout({
      batched: (msg) => {
        output += msg + "\n";
      },
    });

    await py.runPythonAsync(code);
    return output || "Code executed successfully.";
  } catch (err) {
    return err.message;
  }
};