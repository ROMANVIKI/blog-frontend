// import React, { useRef, useState } from "react";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";
//
// const ImageResizer = ({ onImageSubmit }) => {
//   const [image, setImage] = useState(null);
//   const [cropData, setCropData] = useState("#");
//   const cropperRef = useRef(null);
//
//   const onImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//
//   const handleSelectImage = () => {
//     if (cropperRef.current && cropperRef.current.cropper) {
//       cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
//         const file = new File([blob], `croppedImage.png`, {
//           type: "image/png",
//         });
//         const objectURL = URL.createObjectURL(file);
//         onImageSubmit(file);
//       });
//     }
//   };
//
//   const getCropData = () => {
//     if (typeof cropperRef.current?.cropper !== "undefined") {
//       setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
//     }
//   };
//
//   return (
//     <div className="flex flex-col w-full items-center p-4 bg-gray-100 ">
//       <div className="mb-4 p-4 border border-gray-300 bg-white shadow-md rounded-md">
//         <input
//           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           type="file"
//           accept="image/*"
//           onChange={onImageChange}
//         />
//       </div>
//       {image && (
//         <div className="w-full max-w-lg bg-white p-4 rounded-md shadow-md">
//           <div className="mb-4">
//             <Cropper
//               ref={cropperRef}
//               src={image}
//               style={{ height: 400, width: "100%" }}
//               aspectRatio={1}
//               guides={false}
//               viewMode={1}
//               scalable={true}
//               cropBoxMovable={false}
//               cropBoxResizable={false}
//               dragMode="move"
//             />
//           </div>
//           <button
//             onClick={getCropData}
//             className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
//           >
//             Get Crop Data
//           </button>
//           <div className="mt-4">
//             <h2 className="text-lg text-center font-semibold mb-2">
//               Cropped Image
//             </h2>
//             <div className="flex justify-center">
//               <img
//                 src={cropData}
//                 alt="cropped"
//                 className="max-w-full  rounded-full border border-gray-300 shadow-sm"
//               />
//             </div>
//             <div className=" mt-4">
//               <button
//                 className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
//                 onClick={handleSelectImage}
//               >
//                 Select This Image
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default ImageResizer;
"use client";
import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageResizer = ({ onImageSubmit }) => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = () => {
    if (!cropperRef.current || !cropperRef.current.cropper) {
      console.error("Cropper instance is not ready.");
      return;
    }

    const canvas = cropperRef.current.cropper.getCroppedCanvas();

    if (!canvas) {
      alert("Failed to get cropped canvas.");
      return;
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          alert("Failed to create blog from canvas");
          return;
        }

        const file = new File([blob], `croppedImage.png`, {
          type: "image/png",
        });

        const objectURL = URL.createObjectURL(file);

        onImageSubmit(file);

        URL.revokeObjectURL(objectURL);
      },
      "image/png",
      1, // Quality (1 = highest)
    );
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="flex flex-col w-full items-center p-4 bg-gray-100 ">
      <div className="mb-4 p-4 border border-gray-300 bg-white shadow-md rounded-md">
        <input
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>
      {image && (
        <div className="w-full max-w-lg bg-white p-4 rounded-md shadow-md">
          <div className="mb-4">
            <Cropper
              ref={cropperRef}
              src={image}
              style={{ height: 400, width: "100%" }}
              aspectRatio={1}
              guides={false}
              viewMode={1}
              scalable={true}
              cropBoxMovable={false}
              cropBoxResizable={false}
              dragMode="move"
            />
          </div>
          <button
            onClick={getCropData}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
          >
            Get Crop Data
          </button>
          <div className="mt-4">
            <h2 className="text-lg text-center font-semibold mb-2">
              Cropped Image
            </h2>
            <div className="flex justify-center">
              <img
                src={cropData}
                alt="cropped"
                className="max-w-full rounded-full border border-gray-300 shadow-sm"
              />
            </div>
            <div className="mt-4">
              <button
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                onClick={handleSelectImage}
              >
                Select This Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
