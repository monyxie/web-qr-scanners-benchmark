# Classes and methods whitelist
# Original version at opencv/platforms/js/opencv_js.config.py

# Classes and methods whitelist

core = { '': [] }


objdetect = {'': ['groupRectangles', 'getPredefinedDictionary', 'extendDictionary',
                  'drawDetectedMarkers', 'generateImageMarker', 'drawDetectedCornersCharuco',
                  'drawDetectedDiamonds'],
             'HOGDescriptor': ['load', 'HOGDescriptor', 'getDefaultPeopleDetector', 'getDaimlerPeopleDetector', 'setSVMDetector', 'detectMultiScale'],
             'CascadeClassifier': ['load', 'detectMultiScale2', 'CascadeClassifier', 'detectMultiScale3', 'empty', 'detectMultiScale'],
             'GraphicalCodeDetector': ['decode', 'detect', 'detectAndDecode', 'detectMulti', 'decodeMulti', 'detectAndDecodeMulti'],
             'QRCodeDetector': ['QRCodeDetector', 'decode', 'detect', 'detectAndDecode', 'detectMulti', 'decodeMulti', 'detectAndDecodeMulti', 'decodeCurved', 'detectAndDecodeCurved', 'setEpsX', 'setEpsY'],
             'aruco_PredefinedDictionaryType': [],
             'aruco_Dictionary': ['Dictionary', 'getDistanceToId', 'generateImageMarker', 'getByteListFromBits', 'getBitsFromByteList'],
             'aruco_Board': ['Board', 'matchImagePoints', 'generateImage'],
             'aruco_GridBoard': ['GridBoard', 'generateImage', 'getGridSize', 'getMarkerLength', 'getMarkerSeparation', 'matchImagePoints'],
             'aruco_CharucoParameters': ['CharucoParameters'],
             'aruco_CharucoBoard': ['CharucoBoard', 'generateImage', 'getChessboardCorners', 'getNearestMarkerCorners', 'checkCharucoCornersCollinear', 'matchImagePoints', 'getLegacyPattern', 'setLegacyPattern'],
             'aruco_DetectorParameters': ['DetectorParameters'],
             'aruco_RefineParameters': ['RefineParameters'],
             'aruco_ArucoDetector': ['ArucoDetector', 'detectMarkers', 'refineDetectedMarkers', 'setDictionary', 'setDetectorParameters', 'setRefineParameters'],
             'aruco_CharucoDetector': ['CharucoDetector', 'setBoard', 'setCharucoParameters', 'setDetectorParameters', 'setRefineParameters', 'detectBoard', 'detectDiamonds'],
             'QRCodeDetectorAruco_Params': ['Params'],
             'QRCodeDetectorAruco': ['QRCodeDetectorAruco', 'decode', 'detect', 'detectAndDecode', 'detectMulti', 'decodeMulti', 'detectAndDecodeMulti', 'setDetectorParameters', 'setArucoParameters'],
             'barcode_BarcodeDetector': ['BarcodeDetector', 'decode', 'detect', 'detectAndDecode', 'detectMulti', 'decodeMulti', 'detectAndDecodeMulti', 'decodeWithType', 'detectAndDecodeWithType'],
             'FaceDetectorYN': ['setInputSize', 'getInputSize', 'setScoreThreshold', 'getScoreThreshold', 'setNMSThreshold', 'getNMSThreshold',
                                'setTopK', 'getTopK', 'detect', 'create'],
}


wechat_qrcode = {
        'wechat_qrcode_WeChatQRCode': [
                'WeChatQRCode',
                'detectAndDecode',
        ]
}

white_list = makeWhiteList([core, objdetect, wechat_qrcode])
