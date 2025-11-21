import React, { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface Props {
  image: string; // 미리보기용 base64 이미지
  onCancel: () => void;
  onComplete: (croppedImage: Blob) => void;
}

const CropImageModal: React.FC<Props> = ({ image, onCancel, onComplete }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = url;
      });

  const getCroppedImg = async (): Promise<Blob> => {
    if (!croppedAreaPixels) throw new Error("No crop area!");

    const img = await createImage(image);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const { width, height, x, y } = croppedAreaPixels;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/png");
    });
  };

  const onConfirm = async () => {
    const croppedBlob = await getCroppedImg();
    onComplete(croppedBlob);
  };

  return (
      <div className="crop-modal">
      <div className="crop-container">
      <Cropper
          image={image}
  crop={crop}
  zoom={zoom}
  aspect={1} // ★ 정사각형 고정
  onCropChange={setCrop}
  onCropComplete={onCropComplete}
  onZoomChange={setZoom}
  />
  </div>

  <div className="crop-button-box">
  <button onClick={onCancel}>취소</button>
      <button onClick={onConfirm}>완료</button>
      </div>
      </div>
);
};

export default CropImageModal;
