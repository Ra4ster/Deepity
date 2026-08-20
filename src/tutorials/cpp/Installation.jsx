import TutorialLayout, { TerminalBlock, CodeBlock } from "../TutorialLayout";

const menuItems = [
  "Prerequisites",
  "Building with CMake",
  "Linking to Your Project",
];

export default function InstallationCpp() {
  return (
    <TutorialLayout
      title="Deepity C++ Integration"
      description="Compile the core Deepity engine from source and link it to your high-performance C++ applications."
      menuItems={menuItems}
      language="cpp"
    >
      <h2 id="Prerequisites" className="mt-5 mb-3">
        Prerequisites
      </h2>
      <p>
        The Deepity C++ backend is designed to be lean, but it relies on a few
        core tools for compilation and optimized matrix mathematics.
      </p>
      <ul>
        <li>
          <strong>C++17 Compiler:</strong> GCC 7+, Clang 5+, or MSVC 2017+.
        </li>
        <li>
          <strong>CMake:</strong> Version 3.15 or higher.
        </li>
        <li>
          <strong>BLAS / CBLAS:</strong> Required for the{" "}
          <code>cblas_sgemm</code> optimizations utilized in{" "}
          <code>DiscriminativePCLayer</code> for fast spatial and dense gradient
          accumulations. OpenBLAS, Intel MKL, or Apple Accelerate are highly
          recommended.
        </li>
      </ul>

      <h2 id="BuildingwithCMake" className="mt-5 mb-3">
        Building with CMake
      </h2>
      <p>
        Deepity uses CMake as its primary build system. To compile the library
        as a static or shared object, run the following commands from the root
        of the repository:
      </p>
      <TerminalBlock command="mkdir build && cd build" />
      <TerminalBlock command="cmake .. -DCMAKE_BUILD_TYPE=Release" />
      <TerminalBlock command="cmake --build . --config Release -j 4" />

      <p>
        This will generate the compiled library files (e.g.,{" "}
        <code>libdeepity.a</code> or <code>deepity.lib</code>) in your build
        directory.
      </p>

      <h2 id="LinkingtoYourProject" className="mt-5 mb-3">
        Linking to Your Project
      </h2>
      <p>
        To use Deepity in your own C++ projects, you need to include the Deepity
        headers and link against the compiled library and your system's BLAS
        implementation.
      </p>
      <p>
        Here is an example <code>CMakeLists.txt</code> configuration for an
        application consuming Deepity:
      </p>

      <CodeBlock
        language="cmake"
        code={`cmake_minimum_required(VERSION 3.15)
project(DeepityApp)

set(CMAKE_CXX_STANDARD 17)

# Add your executable
add_executable(my_app main.cpp)

# Point CMake to the Deepity include directory
target_include_directories(my_app PRIVATE \${CMAKE_SOURCE_DIR}/path/to/deepity/include)

# Find CBLAS (e.g., OpenBLAS)
find_package(BLAS REQUIRED)

# Link Deepity and BLAS to your executable
target_link_libraries(my_app PRIVATE 
    \${CMAKE_SOURCE_DIR}/path/to/deepity/build/libdeepity.a 
    \${BLAS_LIBRARIES}
)`}
      />
      <p className="mt-3">
        Once linked, you can include headers like{" "}
        <code>&lt;DiscriminativePCNetwork.h&gt;</code> and instantiate the{" "}
        <code>MemoryArena</code> directly in your code.
      </p>
    </TutorialLayout>
  );
}
