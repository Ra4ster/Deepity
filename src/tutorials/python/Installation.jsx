import TutorialLayout, { TerminalBlock, CodeBlock } from "../TutorialLayout";

const menuItems = ["Requirements", "Quick Install", "Building from Source"];

export default function InstallationPython() {
  return (
    <TutorialLayout
      title="Installing pydeepity"
      description="Get the Python wrapper for Deepity up and running in your local environment."
      menuItems={menuItems}
      language="python"
    >
      <h2 id="Requirements" className="mt-5 mb-3">
        Requirements
      </h2>
      <p>
        Before installing <code>pydeepity</code>, ensure your system meets the
        following requirements:
      </p>
      <ul>
        <li>
          <strong>Python:</strong> Version 3.8 or higher.
        </li>
        <li>
          <strong>NumPy:</strong> Required for array handling and data loading.
        </li>
        <li>
          <strong>C++ Compiler:</strong> (If building from source) A compiler
          supporting C++17 (e.g., GCC, Clang, or MSVC).
        </li>
      </ul>

      <h2 id="QuickInstall" className="mt-5 mb-3">
        Quick Install (Recommended)
      </h2>
      <p>
        If pre-compiled wheels are available for your operating system, the
        easiest way to install the library is directly via pip. This will
        automatically download and install the optimized C++ backend alongside
        the Python bindings.
      </p>
      <TerminalBlock command="pip install pydeepity" />

      <h2 id="BuildingfromSource" className="mt-5 mb-3">
        Building from Source
      </h2>
      <p>
        If you are modifying the core C++ engine or need to compile the library
        for a specific hardware architecture (such as compiling with specific
        BLAS optimizations), you can build the package from source.
      </p>
      <p>First, clone the Deepity repository:</p>
      <TerminalBlock command="git clone https://github.com/yourusername/deepity.git && cd deepity" />

      <p>
        Next, use pip to install the package locally. This will trigger the
        underlying CMake build system to compile the C++ extensions before
        wrapping them into a Python module.
      </p>
      <TerminalBlock command="pip install -e ." />

      <p>
        To verify the installation was successful, try importing the library in
        your Python interpreter:
      </p>
      <CodeBlock
        language="python"
        code={`import pydeepity
from pydeepity import SequentialPCN

print("pydeepity installed successfully!")`}
      />
    </TutorialLayout>
  );
}
