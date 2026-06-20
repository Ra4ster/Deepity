cmake_minimum_required(VERSION 4.3.0)
project(deepity CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

find_package(OpenMP REQUIRED)
find_package(BLAS REQUIRED)

find_path(CBLAS_INCLUDE_DIR
    cblas.h
    PATH_SUFFIXES openblas
    REQUIRED
)

add_executable(Deepity
    tests/tNetwork.cpp
    src/PCNLayer.cpp
    src/PCNNetwork.cpp
)

target_include_directories(Deepity PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/includes
    ${CBLAS_INCLUDE_DIR}
)

target_link_libraries(Deepity PRIVATE
    ${BLAS_LIBRARIES}
    OpenMP::OpenMP_CXX
)

# Build-type-specific settings
if(MSVC)

    target_compile_options(Deepity PRIVATE
        $<$<CONFIG:Release>:/O2 /arch:AVX2>
        $<$<CONFIG:RelWithDebInfo>:/O2 /Zi /arch:AVX2>
        $<$<CONFIG:Debug>:/Od /Zi>
    )

else()

    target_compile_options(Deepity PRIVATE
        $<$<CONFIG:Release>:-O3 -march=native -ffast-math>
        $<$<CONFIG:RelWithDebInfo>:-O3 -g -march=native>
        $<$<CONFIG:Debug>:-O0 -g3 -Wall -Wextra -Wpedantic>
        $<$<CONFIG:Debug>:-fsanitize=address,undefined>
    )

    target_link_options(Deepity PRIVATE
        $<$<CONFIG:Debug>:-fsanitize=address,undefined>
    )

endif()

target_compile_definitions(Deepity PRIVATE
    $<$<CONFIG:Debug>:_DEBUG>
)

set_target_properties(Deepity PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin
)