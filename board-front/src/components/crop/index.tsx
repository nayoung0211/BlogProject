import React, { useCallback, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./style.css"; // style.css가 같은 폴더 안에 있다고 가정

interface Props {
  image: string; // 여기서 src -> image로 변경
  onCancel: () => void;
  onComplete: (blob: Blob) => void;
}

const CropImageModal: React.FC<Props> = ({ image, onCancel, onComplete }) => {
  // Crop 상태에는 aspect 제거
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });

  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  // 크롭 완료 시 잘린 영역 픽셀 저장
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Crop | null>(null);

  const onCropComplete = useCallback((crop: Crop) => {
    setCroppedAreaPixels(crop);
  }, []);

  // Canvas로 실제 Blob 만들기
  const getCroppedImg = useCallback(async (): Promise<Blob | null> => {
    if (!imageRef || !croppedAreaPixels) return null;

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;

    const { x = 0, y = 0, width = 0, height = 0 } = croppedAreaPixels;

    canvas.width = width * scaleX;
    canvas.height = height * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(
        imageRef,
        x * scaleX,
        y * scaleY,
        width * scaleX,
        height * scaleY,
        0,
        0,
        width * scaleX,
        height * scaleY
    );

    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/png");
    });
  }, [imageRef, croppedAreaPixels]);

  const handleComplete = async () => {
    const blob = await getCroppedImg();
    if (blob) onComplete(blob);
  };

  return (
      <div className="crop-modal-backdrop">
        <div className="crop-modal">
          <ReactCrop
              crop={crop}
              onChange={setCrop}
              onComplete={onCropComplete}
              aspect={1} // 정사각형 강제
          >
            <img
                src={image}
                alt="crop-target"
                onLoad={(e) => setImageRef(e.currentTarget)}
            />
          </ReactCrop>

          <div className="crop-modal-buttons">
            <button onClick={onCancel}>취소</button>
            <button onClick={handleComplete}>완료</button>
          </div>
        </div>
      </div>
  );
};

export default CropImageModal;
