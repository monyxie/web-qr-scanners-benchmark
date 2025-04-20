#!/bin/sh

set -e
set -x

OPENCV_COMMIT="4.11.0"
OPENCV_CONTRIB_COMMIT="4.11.0"

pushd "$(dirname "$0")"

if ! [ -d "opencv" ]; then
  git clone "https://github.com/opencv/opencv.git"
fi

pushd opencv
git fetch
git reset --hard
git checkout "$OPENCV_COMMIT"
popd

if ! [ -d "opencv_contrib" ]; then
  git clone "https://github.com/opencv/opencv_contrib.git"
fi

pushd opencv_contrib
git fetch
git reset --hard
git checkout "$OPENCV_CONTRIB_COMMIT"
git apply ../opencv_contrib.patch
popd

docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) emscripten/emsdk:2.0.10 emcmake python3 /src/opencv/platforms/js/build_js.py build_wasm \
            --build_wasm \
            --disable_single_file \
            --cmake_option='-DCMAKE_MAKE_PROGRAM=make' \
            --cmake_option='-DBUILD_LIST=objdetect,wechat_qrcode,js' \
            --cmake_option='-DOPENCV_EXTRA_MODULES_PATH=/src/opencv_contrib/modules' \
            --build_flags='-sDYNAMIC_EXECUTION=0' \
            --config=opencv_js.config.py
